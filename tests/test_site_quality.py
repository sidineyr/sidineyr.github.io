"""Static checks for the public home, aliases, metadata, and social assets."""
import json
import re
import struct
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.ids = []
        self.headings = []
        self.title = ''
        self.description = ''
        self.canonical = ''
        self.robots = ''
        self._inside_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag in ('h1', 'h2'):
            self.headings.append(tag)
        if tag == 'title':
            self._inside_title = True
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content', '')
        if tag == 'meta' and attrs.get('name') == 'robots':
            self.robots = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href', '')

    def handle_endtag(self, tag):
        if tag == 'title':
            self._inside_title = False

    def handle_data(self, data):
        if self._inside_title:
            self.title += data


class SiteQualityTests(unittest.TestCase):
    def test_home_metadata_hierarchy_and_static_projects(self):
        page = (ROOT / 'index.html').read_text(encoding='utf-8')
        document = Document()
        document.feed(page)
        self.assertLessEqual(len(document.title), 60)
        self.assertLessEqual(len(document.description), 155)
        self.assertEqual(document.headings[0], 'h1')
        self.assertIn('Projetos e recursos educacionais abertos', page)
        self.assertIn('class="skip-link" href="#conteudo"', page)
        self.assertIn('summary_large_image', page)
        self.assertIn('og:image:width" content="1200"', page)
        self.assertIn('og:image:height" content="630"', page)
        schemas = [
            json.loads(value)
            for value in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S)
        ]
        self.assertTrue(any(schema.get('@type') == 'Person' for schema in schemas))
        self.assertTrue(any(schema.get('@type') == 'WebSite' for schema in schemas))

        cards = {
            attrs['data-project']
            for tag, attrs in document.tags
            if tag == 'article' and 'data-project' in attrs
        }
        manifest = json.loads((ROOT / 'data/projetos.json').read_text(encoding='utf-8'))
        self.assertEqual(cards, {project['id'] for project in manifest})
        self.assertTrue(all(attrs.get('data-area') for tag, attrs in document.tags if tag == 'article' and 'data-project' in attrs))
        self.assertNotIn('Carregando', page)
        self.assertNotIn('Consultando contador', page)

    def test_indexable_pages_have_complete_unique_metadata_and_canonicals(self):
        pages = []
        for path in ROOT.rglob('*.html'):
            if any(part.startswith('.') for part in path.relative_to(ROOT).parts):
                continue
            if path.name == 'googlef4098dd53c5428d3.html':
                continue
            document = Document()
            document.feed(path.read_text(encoding='utf-8'))
            if 'noindex' in document.robots.lower():
                continue
            self.assertTrue(document.title, str(path.relative_to(ROOT)))
            self.assertLessEqual(len(document.title), 60, str(path.relative_to(ROOT)))
            self.assertTrue(document.description, str(path.relative_to(ROOT)))
            self.assertLessEqual(len(document.description), 155, str(path.relative_to(ROOT)))
            self.assertTrue(document.canonical, str(path.relative_to(ROOT)))
            pages.append((path, document))
        titles = [document.title for _, document in pages]
        canonicals = [document.canonical for _, document in pages]
        self.assertEqual(len(titles), len(set(titles)))
        self.assertEqual(len(canonicals), len(set(canonicals)))

    def test_indexable_subpages_have_breadcrumb_schema(self):
        for path in ROOT.rglob('*.html'):
            if any(part.startswith('.') for part in path.relative_to(ROOT).parts):
                continue
            page = path.read_text(encoding='utf-8')
            document = Document()
            document.feed(page)
            if document.robots and 'noindex' in document.robots.lower():
                continue
            if not document.canonical or document.canonical.endswith('://sidineyr.github.io/'):
                continue
            schemas = [
                json.loads(value)
                for value in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S)
            ]
            self.assertTrue(
                any(schema.get('@type') == 'BreadcrumbList' for schema in schemas),
                str(path.relative_to(ROOT)),
            )

    def test_social_image_manifest_and_favicon(self):
        image = (ROOT / 'assets/social-card.png').read_bytes()
        self.assertEqual(image[:8], b'\x89PNG\r\n\x1a\n')
        self.assertEqual(struct.unpack('>II', image[16:24]), (1200, 630))
        manifest = json.loads((ROOT / 'manifest.webmanifest').read_text(encoding='utf-8'))
        self.assertEqual(manifest['lang'], 'pt-BR')
        for icon in manifest['icons']:
            path = ROOT / icon['src'].lstrip('/')
            self.assertTrue(path.is_file())
        self.assertTrue((ROOT / 'favicon.svg').is_file())
        self.assertTrue((ROOT / 'favicon.ico').is_file())

    def test_legacy_redirects_are_noindex_and_keep_sitemap_valid(self):
        redirects = json.loads((ROOT / 'data/legacy-redirects.json').read_text(encoding='utf-8'))
        for source, target in redirects.items():
            path = ROOT / source.strip('/') / 'index.html'
            document = Document()
            document.feed(path.read_text(encoding='utf-8'))
            self.assertIn('noindex', document.robots)
            canonical_target = target.split('#', 1)[0]
            self.assertEqual(document.canonical, 'https://sidineyr.github.io' + canonical_target)

        sitemap = (ROOT / 'sitemap.xml').read_bytes()
        from xml.etree import ElementTree
        root = ElementTree.fromstring(sitemap)
        namespace = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = [node.text for node in root.findall('sm:url/sm:loc', namespace)]
        self.assertEqual(len(urls), len(set(urls)))
        self.assertIn('https://sidineyr.github.io/', urls)

    def test_blank_target_links_use_safe_rel_values(self):
        for path in ROOT.rglob('*.html'):
            if any(part.startswith('.') for part in path.relative_to(ROOT).parts):
                continue
            document = Document()
            document.feed(path.read_text(encoding='utf-8'))
            for tag, attrs in document.tags:
                if tag == 'a' and attrs.get('target', '').lower() == '_blank':
                    rel = set(attrs.get('rel', '').lower().split())
                    self.assertTrue({'noopener', 'noreferrer'} <= rel, str(path.relative_to(ROOT)))

    def test_local_links_and_fragments_resolve(self):
        site_host = 'sidineyr.github.io'
        id_cache = {}
        for page_path in ROOT.rglob('*.html'):
            if any(part.startswith('.') for part in page_path.relative_to(ROOT).parts):
                continue
            if page_path.name == 'googlef4098dd53c5428d3.html':
                continue
            document = Document()
            document.feed(page_path.read_text(encoding='utf-8'))
            for tag, attrs in document.tags:
                if tag not in ('a', 'link', 'script', 'img', 'source'):
                    continue
                for attribute in ('href', 'src'):
                    value = attrs.get(attribute)
                    if not value:
                        continue
                    url = urlparse(value)
                    if url.scheme and url.netloc != site_host:
                        continue
                    if url.netloc and url.netloc != site_host:
                        continue
                    path = unquote(url.path)
                    target = ROOT / path.lstrip('/') if path.startswith('/') else page_path.parent / path if path else page_path
                    target = target.resolve()
                    try:
                        target.relative_to(ROOT)
                    except ValueError:
                        self.fail(f'Link escapes repository: {page_path.relative_to(ROOT)} -> {value}')
                    candidates = [target]
                    if target.is_dir() or path.endswith('/') or not target.suffix:
                        candidates.extend((target / 'index.html', target.with_suffix('.html')))
                    resolved = next((candidate for candidate in candidates if candidate.is_file()), None)
                    self.assertIsNotNone(resolved, f'{page_path.relative_to(ROOT)} -> {value}')
                    fragment = unquote(url.fragment)
                    if fragment and resolved.suffix.lower() == '.html':
                        if resolved not in id_cache:
                            linked = Document()
                            linked.feed(resolved.read_text(encoding='utf-8'))
                            id_cache[resolved] = set(linked.ids)
                        self.assertIn(fragment, id_cache[resolved], f'{page_path.relative_to(ROOT)} -> {value}')


if __name__ == '__main__':
    unittest.main()

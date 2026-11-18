"""Regressões da geração: inventário não vira aula; rotas e arquivos sobrevivem."""
import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]


class EditorialTests(unittest.TestCase):
    def test_inventory_does_not_create_courses_or_remove_existing_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / 'casa-source'
            shutil.copytree(ROOT / 'casa-source', source, ignore=shutil.ignore_patterns('__pycache__'))
            catalog = json.loads((source / 'catalog.json').read_text())
            catalog.append(dict(id='new-fork', title='New fork', repository='https://github.com/sidineyr/new-fork', description='<script>unsafe</script>', fork=True))
            (source / 'catalog.json').write_text(json.dumps(catalog))
            evidence = root / 'cursos/new-fork/README.md'
            evidence.parent.mkdir(parents=True)
            evidence.write_text('Conteúdo existente')
            spec = importlib.util.spec_from_file_location('course_builder', source / 'build.py')
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            module.build()
            self.assertEqual(evidence.read_text(), 'Conteúdo existente')
            alias = (root / 'cursos/new-fork/index.html').read_text()
            self.assertIn('noindex,follow', alias)
            self.assertIn('Fork de projeto de terceiros', alias)
            self.assertIn('&lt;script&gt;unsafe&lt;/script&gt;', alias)
            self.assertNotIn('data-course="new-fork"', alias)
            self.assertIn('data-notebook="new-fork"', alias)
            self.assertIn('Recuperar meu caderno anterior', alias)
            sitemap = (root / 'cursos/sitemap.xml').read_text()
            self.assertNotIn('new-fork', sitemap)
            ElementTree.fromstring(sitemap)
            snapshot = {str(p.relative_to(root)): p.read_bytes() for p in (root / 'cursos').rglob('*') if p.is_file()}
            module.build()
            self.assertEqual(snapshot, {str(p.relative_to(root)): p.read_bytes() for p in (root / 'cursos').rglob('*') if p.is_file()})

    def test_all_lessons_have_unlocked_content_and_correct_canonical(self):
        lessons = json.loads((ROOT / 'casa-source/lessons.json').read_text())
        self.assertEqual(len(lessons), 4)
        self.assertEqual(len({lesson['body'] for lesson in lessons}), 4)
        for lesson in lessons:
            page = (ROOT / 'cursos' / lesson['id'] / 'index.html').read_text()
            self.assertIn(lesson['body'], page)
            self.assertIn(f'https://sidineyr.github.io/cursos/{lesson["id"]}/', page)
            self.assertNotIn(' hidden', page)
            self.assertNotIn('adsbygoogle', page)
            self.assertNotIn('google-footer-ad.js', page)

    def test_ownership_without_ad_requests_and_public_information(self):
        self.assertEqual((ROOT / 'ads.txt').read_text().strip(), 'google.com, pub-4924241177850142, DIRECT, f08c47fec0942fa0')
        for name in ('index.html', 'sobre/index.html', 'contato/index.html', 'privacidade/index.html', 'politica-editorial/index.html'):
            page = (ROOT / name).read_text(encoding='utf-8', errors='strict')
            self.assertIn('ca-pub-4924241177850142', page)
            self.assertIn('/privacidade/', page)
            self.assertNotIn('pagead2.googlesyndication.com', page)
            self.assertNotIn('\ufffd', page)
        for name in ('assets/google-footer-ad.js', 'universidade/assets/educational-ads.js'):
            self.assertNotIn('pagead2.googlesyndication.com', (ROOT / name).read_text())


if __name__ == '__main__':
    unittest.main()

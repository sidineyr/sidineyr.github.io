"""Vídeo educativo original, silencioso, com legendas; renderizado no Actions."""
import shutil
import subprocess
import tempfile
from pathlib import Path

OUT=Path(__file__).resolve().parent.parent/'cursos'/'media'
OUT.mkdir(parents=True,exist_ok=True)
ffmpeg=shutil.which('ffmpeg')
if not ffmpeg: raise SystemExit('FFmpeg ausente; instale pelo gerenciador do sistema.')
font=Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
if not font.is_file(): raise SystemExit('Fonte DejaVuSans ausente.')
cards=[
    '01  OBSERVAR\n\nComece com uma pergunta.\nLeia a proposta, os requisitos\ne as instruções do projeto.',
    '02  EXPERIMENTAR\n\nEscolha uma pequena tarefa.\nSiga a documentação e compare\no resultado com sua expectativa.',
    '03  REFLETIR\n\nRegistre o que você descobriu.\nSem ambiente disponível?\nAnalise um exemplo e descreva-o.'
]
with tempfile.TemporaryDirectory(prefix='casa-video-') as scratch:
    filters=[]
    for i,text in enumerate(cards):
        path=Path(scratch)/f'card{i}.txt'; path.write_text(text,encoding='utf-8')
        filters.append(f"drawtext=fontfile={font}:textfile={path}:fontcolor=0x243c31:fontsize=34:line_spacing=12:x=60:y=100:enable='gte(t,{i*6})*lt(t,{(i+1)*6})'")
    filters.append("drawtext=fontfile="+str(font)+":text='CASA DE CURSOS  |  SIDINEY RODRIGUES':fontcolor=0x28583e:fontsize=18:x=60:y=480")
    subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-f','lavfi','-i','color=c=0xF6F2E9:s=960x540:d=18:r=15','-vf',','.join(filters),'-an','-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'como-estudar.mp4')],check=True)
OUT.joinpath('como-estudar.pt-BR.vtt').write_text('''WEBVTT

00:00.000 --> 00:06.000
Observar: comece com uma pergunta. Leia a proposta, os requisitos e as instruções do projeto.

00:06.000 --> 00:12.000
Experimentar: escolha uma pequena tarefa. Siga a documentação e compare o resultado com sua expectativa.

00:12.000 --> 00:18.000
Refletir: registre suas descobertas. Sem ambiente disponível, analise um exemplo e descreva-o.
''',encoding='utf-8')
print('Vídeo de 18 segundos e legendas gerados.')

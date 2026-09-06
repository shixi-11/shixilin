"""Rebuild the four OFL CJK web fonts from licensed, full variable sources.

Run `node scripts/font-corpus.mjs <corpus.txt>` first, then:
python scripts/build-fonts.py --source-dir <font-directory> --corpus <corpus.txt>
Requires fonttools[woff] and brotli. Source fonts are never modified.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', type=Path, required=True)
parser.add_argument('--corpus', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
text = args.corpus.read_text(encoding='utf-8')
web = root / 'public' / 'fonts'
sources = {}
for suffix in ['SC', 'TC', 'JP', 'KR']:
    source = args.source_dir / f'NotoSerif{suffix}-VF.ttf'
    font = TTFont(source, recalcTimestamp=False)
    options = subset.Options()
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    options.notdef_glyph = True
    options.notdef_outline = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    font.flavor = 'woff2'
    target = web / f'noto-serif-{suffix.lower()}.woff2'
    font.save(target)
    sources[target.name] = {'file': source.name, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest()}
    print(f'{target.name}: {len(font.getBestCmap())} characters, {target.stat().st_size} bytes')

coverage = {'version': 1, 'fonts': {}}
for target in sorted(web.glob('*.woff2')):
    font = TTFont(target)
    coverage['fonts'][target.name] = {
        'sha256': hashlib.sha256(target.read_bytes()).hexdigest(),
        'characters': ''.join(chr(code) for code in sorted(font.getBestCmap())),
        'source': sources.get(target.name),
    }
(root / 'scripts' / 'font-coverage.json').write_text(json.dumps(coverage, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# Content-based URLs invalidate browser/CDN caches whenever a font changes.
for stylesheet in ['src/styles.css', 'src/locales.css', 'index.html']:
    path = root / stylesheet
    css = path.read_text(encoding='utf-8')
    for name, font in coverage['fonts'].items():
        css = re.sub(r'/fonts/' + re.escape(name) + r'(?:\?v=[a-f0-9]+)?',
                     f"/fonts/{name}?v={font['sha256'][:12]}", css)
    path.write_text(css, encoding='utf-8')

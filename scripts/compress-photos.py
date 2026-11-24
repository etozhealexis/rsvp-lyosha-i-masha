"""Usage: python3 scripts/compress-photos.py /path/to/Photos.zip (requires Pillow)."""
import io
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import sys
import zipfile

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/photos'
OUTPUT.mkdir(parents=True, exist_ok=True)


def compress(name):
    # Each worker gets its own archive handle; originals are never extracted or changed.
    with zipfile.ZipFile(sys.argv[1]) as archive:
        data = archive.read(name)
    with Image.open(io.BytesIO(data)) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
        filename = Path(name).stem + '.webp'
        image.save(OUTPUT / filename, 'WEBP', quality=76, method=6)
        return {'src': f'photos/{filename}', 'width': image.width, 'height': image.height}


with zipfile.ZipFile(sys.argv[1]) as archive:
    names = sorted(n for n in archive.namelist() if not n.startswith('__MACOSX/') and n.lower().endswith(('.jpg', '.jpeg', '.png')))
with ThreadPoolExecutor(max_workers=4) as workers:
    photos = []
    for index, photo in enumerate(workers.map(compress, names), 1):
        photos.append(photo)
        if index % 50 == 0:
            print(f'{index}/{len(names)} compressed', flush=True)
photos.sort(key=lambda photo: [int(part) if part.isdigit() else part for part in re.split(r'(\d+)', photo['src'])])
(ROOT / 'src/data/photoGallery.json').write_text(json.dumps(photos, indent=2) + '\n')
size = sum((ROOT / 'public' / photo['src']).stat().st_size for photo in photos)
print(f'{len(photos)} photos, {size / 1_000_000:.1f} MB total', flush=True)

import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const inputDir = path.join(root, 'public', 'images', 'works');
const outputDir = path.join(root, 'public', 'images', 'works-optimized');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const maxSize = 2200;
const quality = 82;

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectImages(fullPath);
      }

      if (!entry.isFile()) {
        return [];
      }

      const ext = path.extname(entry.name).toLowerCase();
      return supportedExtensions.has(ext) ? [fullPath] : [];
    }),
  );

  return files.flat();
}

async function optimizeImage(inputPath) {
  const relativePath = path.relative(inputDir, inputPath);
  const parsed = path.parse(relativePath);
  const outputPath = path.join(outputDir, parsed.dir, `${parsed.name}.webp`);

  await mkdir(path.dirname(outputPath), { recursive: true });

  await sharp(inputPath, { limitInputPixels: false })
    .rotate()
    .resize({
      width: maxSize,
      height: maxSize,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);

  const [inputStats, outputStats] = await Promise.all([
    stat(inputPath),
    stat(outputPath),
  ]);

  return {
    inputPath,
    outputPath,
    inputBytes: inputStats.size,
    outputBytes: outputStats.size,
  };
}

const images = await collectImages(inputDir);

if (images.length === 0) {
  console.log('No work images found.');
  process.exit(0);
}

let totalInputBytes = 0;
let totalOutputBytes = 0;

for (const image of images) {
  const result = await optimizeImage(image);
  totalInputBytes += result.inputBytes;
  totalOutputBytes += result.outputBytes;

  const relativeInput = path.relative(root, result.inputPath);
  const relativeOutput = path.relative(root, result.outputPath);
  console.log(
    `${relativeInput} -> ${relativeOutput} (${formatBytes(result.inputBytes)} -> ${formatBytes(result.outputBytes)})`,
  );
}

console.log(
  `Optimized ${images.length} images: ${formatBytes(totalInputBytes)} -> ${formatBytes(totalOutputBytes)}`,
);

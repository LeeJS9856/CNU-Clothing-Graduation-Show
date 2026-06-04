import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const inputDir = path.join(root, 'public', 'images', 'magazine');
const outputDir = path.join(root, 'public', 'images', 'magazine-optimized');
const maxSize = 2200;
const quality = 82;

// 🌟여기에 변환하고 싶은 파일 이름을 입력하세요 (예: '매거진 (1).jpg')
const targetFileName = '매거진 (49).png'; 

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

async function optimizeImage(inputPath) {
  const relativePath = path.relative(inputDir, inputPath);
  const parsed = path.parse(relativePath);
  const outputPath = path.join(outputDir, parsed.dir, `${parsed.name}.webp`);

  // 출력 폴더가 없으면 생성
  await mkdir(path.dirname(outputPath), { recursive: true });

  // Sharp 이미지 최적화 실행
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

// 메인 실행 로직
async function main() {
  const targetPath = path.join(inputDir, targetFileName);

  try {
    // 파일이 실제로 존재하는지 체크 겸 사이즈 확인
    const inputStats = await stat(targetPath);
    
    console.log(`[시작] 단일 이미지 최적화 프로세스: ${targetFileName}`);
    const result = await optimizeImage(targetPath);
    
    const relativeInput = path.relative(root, result.inputPath);
    const relativeOutput = path.relative(root, result.outputPath);
    
    console.log('\n--- 변환 완료 ---');
    console.log(`${relativeInput} -> ${relativeOutput}`);
    console.log(`용량 변화: ${formatBytes(result.inputBytes)} -> ${formatBytes(result.outputBytes)}`);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`[에러] 파일을 찾을 수 없습니다. 경로를 확인해 주세요.\n대상 경로: ${targetPath}`);
    } else {
      console.error('[에러] 이미지 최적화 중 오류 발생:', error);
    }
    process.exit(1);
  }
}

main();
import path from 'path';
import { FileSystemUtils } from './file-system.js';

function normalizeSpecId(specId: string): string {
  return FileSystemUtils.toPosixPath(specId).replace(/^\/+|\/+$/g, '');
}

export function specIdToPath(specId: string, baseDir: string): string {
  const normalizedSpecId = normalizeSpecId(specId);
  const segments = normalizedSpecId.length > 0 ? normalizedSpecId.split('/') : [];
  return FileSystemUtils.joinPath(baseDir, ...segments, 'spec.md');
}

export function pathToSpecId(filePath: string, specsDir: string): string {
  const normalizedFilePath = FileSystemUtils.toPosixPath(filePath);
  const normalizedSpecsDir = FileSystemUtils.toPosixPath(specsDir);
  const relativeDir = path.posix.relative(normalizedSpecsDir, path.posix.dirname(normalizedFilePath));
  return normalizeSpecId(relativeDir);
}

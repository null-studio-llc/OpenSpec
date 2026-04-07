import { promises as fs } from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { pathToSpecId } from './spec-paths.js';

export async function getActiveChangeIds(root: string = process.cwd()): Promise<string[]> {
  const changesPath = path.join(root, 'openspec', 'changes');
  try {
    const entries = await fs.readdir(changesPath, { withFileTypes: true });
    const result: string[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'archive') continue;
      const proposalPath = path.join(changesPath, entry.name, 'proposal.md');
      try {
        await fs.access(proposalPath);
        result.push(entry.name);
      } catch {
        // skip directories without proposal.md
      }
    }
    return result.sort();
  } catch {
    return [];
  }
}

export async function getSpecIds(root: string = process.cwd()): Promise<string[]> {
  const specsPath = path.join(root, 'openspec', 'specs');
  try {
    const specFiles = await fg('**/spec.md', {
      cwd: specsPath,
      absolute: true,
      onlyFiles: true,
      dot: false,
      ignore: ['**/.*/**'],
    });
    return specFiles.map(filePath => pathToSpecId(filePath, specsPath)).sort();
  } catch {
    return [];
  }
}

export async function getArchivedChangeIds(root: string = process.cwd()): Promise<string[]> {
  const archivePath = path.join(root, 'openspec', 'changes', 'archive');
  try {
    const entries = await fs.readdir(archivePath, { withFileTypes: true });
    const result: string[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      const proposalPath = path.join(archivePath, entry.name, 'proposal.md');
      try {
        await fs.access(proposalPath);
        result.push(entry.name);
      } catch {
        // skip directories without proposal.md
      }
    }
    return result.sort();
  } catch {
    return [];
  }
}

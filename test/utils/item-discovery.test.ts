import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { getSpecIds } from '../../src/utils/item-discovery.js';

describe('getSpecIds', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = path.join(os.tmpdir(), `openspec-item-discovery-${Date.now()}`);
    await fs.mkdir(path.join(tempDir, 'openspec', 'specs'), { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('recursively discovers flat and hierarchical specs while skipping hidden directories', async () => {
    const specsDir = path.join(tempDir, 'openspec', 'specs');
    const specBody = '## Purpose\nTest.\n\n## Requirements\n\n### Requirement: X\nText\n';

    await fs.mkdir(path.join(specsDir, 'alpha'), { recursive: true });
    await fs.writeFile(path.join(specsDir, 'alpha', 'spec.md'), specBody);

    await fs.mkdir(path.join(specsDir, 'cli-show'), { recursive: true });
    await fs.writeFile(path.join(specsDir, 'cli-show', 'spec.md'), specBody);

    await fs.mkdir(path.join(specsDir, 'cli', 'show'), { recursive: true });
    await fs.writeFile(path.join(specsDir, 'cli', 'show', 'spec.md'), specBody);

    await fs.mkdir(path.join(specsDir, 'cli', 'list'), { recursive: true });
    await fs.writeFile(path.join(specsDir, 'cli', 'list', 'spec.md'), specBody);

    await fs.mkdir(path.join(specsDir, '.hidden', 'secret'), { recursive: true });
    await fs.writeFile(path.join(specsDir, '.hidden', 'secret', 'spec.md'), specBody);

    await fs.mkdir(path.join(specsDir, 'visible', '.draft'), { recursive: true });
    await fs.writeFile(path.join(specsDir, 'visible', '.draft', 'spec.md'), specBody);

    expect(await getSpecIds(tempDir)).toEqual(['alpha', 'cli-show', 'cli/list', 'cli/show']);
  });
});

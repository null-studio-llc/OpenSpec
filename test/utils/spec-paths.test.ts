import { describe, expect, it } from 'vitest';
import path from 'path';
import { pathToSpecId, specIdToPath } from '../../src/utils/spec-paths.js';

describe('spec-paths', () => {
  it('converts hierarchical spec IDs to filesystem paths', () => {
    expect(specIdToPath('cli/show', 'openspec/specs')).toBe(
      path.join('openspec/specs', 'cli', 'show', 'spec.md')
    );
  });

  it('normalizes Windows-style separators when building filesystem paths', () => {
    expect(specIdToPath('cli\\show', 'C:\\repo\\openspec\\specs')).toBe(
      path.win32.join('C:\\repo\\openspec\\specs', 'cli', 'show', 'spec.md')
    );
  });

  it('derives flat and hierarchical spec IDs from file paths', () => {
    expect(
      pathToSpecId('/repo/openspec/specs/cli/show/spec.md', '/repo/openspec/specs')
    ).toBe('cli/show');
    expect(pathToSpecId('/repo/openspec/specs/cli-show/spec.md', '/repo/openspec/specs')).toBe(
      'cli-show'
    );
  });

  it('normalizes Windows paths when deriving spec IDs', () => {
    expect(
      pathToSpecId(
        'C:\\repo\\openspec\\specs\\cli\\show\\spec.md',
        'C:\\repo\\openspec\\specs'
      )
    ).toBe('cli/show');
  });
});

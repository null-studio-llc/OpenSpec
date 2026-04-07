import { describe, expect, it } from 'vitest';
import { nearestMatches } from '../../src/utils/match.js';

describe('nearestMatches', () => {
  it('supports fuzzy matching against full hierarchical IDs', () => {
    expect(nearestMatches('cli/shw', ['cli/archive', 'cli/show', 'auth/login'])).toContain('cli/show');
  });

  it('falls back to exact leaf-segment matches when no exact ID exists', () => {
    expect(nearestMatches('show', ['cli/archive', 'cli/show', 'auth/login'])).toEqual(['cli/show']);
  });

  it('returns multiple matching leaves in alphabetical order', () => {
    expect(nearestMatches('show', ['cli/show', 'admin/show', 'auth/login'])).toEqual([
      'admin/show',
      'cli/show',
    ]);
  });
});

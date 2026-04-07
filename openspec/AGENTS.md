# OpenSpec Agent Notes

## Hierarchical Specs

- Main specs live at `openspec/specs/<spec-id>/spec.md`.
- Spec IDs may be flat (`cli-show`) or hierarchical (`cli/show`).
- Hierarchical spec IDs always use `/` as the separator, regardless of OS.

Examples:

- `cli-show` -> `openspec/specs/cli-show/spec.md`
- `cli/show` -> `openspec/specs/cli/show/spec.md`
- `domain/project/feature` -> `openspec/specs/domain/project/feature/spec.md`

## Change Delta Specs

- Change delta specs mirror the same hierarchy under `openspec/changes/<change-name>/specs/`.

Examples:

- `openspec/changes/add-cli-show/specs/cli-show/spec.md`
- `openspec/changes/add-cli-show/specs/cli/show/spec.md`

## Useful Commands

- `openspec spec show cli/show`
- `openspec spec validate cli/show`
- `openspec spec list cli/`
- `openspec list --specs cli/`

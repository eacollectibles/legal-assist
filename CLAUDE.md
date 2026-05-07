# Project notes for Claude

This file is a memo for Claude — short pointers to long-lived
conventions in this repo so future sessions don't re-derive them.

## Letterhead generator

When the user asks me to "write a letter using the letterhead",
"draft a letter to ...", "send a letter to the LTB / Crown / opposing
counsel", or anything similar, **use the persistent generator at
`letterhead/letterhead.py`**:

```python
from letterhead.letterhead import build_letter
build_letter({
    'signer': 'jeanfrancois',     # or 'candice'
    'date': '...',
    'recipient_person': '...',
    'recipient_title': '...',
    'recipient_lines': ['...', '...'],
    'delivery_note': '...',
    're_line': '...',
    'salutation': 'Dear ...:',
    'body_paragraphs': ['...', '...'],
    'cc': '...',
}, out_path='outputs/<DescriptiveName>.pdf')
```

The engine bootstraps the Allura font on first run and caches the
cursive signature PNG per signer. Two paralegals are configured:

- `jeanfrancois` — Jean-Francois Demers, LSO #P22020 (default)
- `candice` — Candice Fogarty, LSO #P21479

Working example to copy from: `letterhead/example_LTB_scheduling.py`.
Full content-key reference: `letterhead/README.md`.

**Workflow when the user requests a letter:**

1. Ask only the questions actually needed (recipient, re line, body
   points, signer if not obvious). Don't ask for things the engine
   defaults — closing line, cursive signature, letterhead format.
2. Write a small driver script under `outputs/` (e.g.
   `outputs/letter_<short_descriptor>.py`) that imports `build_letter`
   and writes the PDF into `outputs/`.
3. Run it via the workspace bash tool, then share the PDF link
   (computer:// path).

## Paralegal directory

`src/lib/paralegals.ts` is the source of truth for the paralegal list
in the React app. `letterhead/letterhead.py` mirrors it as a Python
dict. Keep both in sync when adding a paralegal.

## Frontend stack

- Astro + React + TypeScript on Cloudflare Workers (`@wix/astro`).
- Wix Data SDK collections used heavily: `clientfiles`, `clientprofiles`,
  `clientdocuments`, `generateddocuments`, `documenttemplates`,
  `financialrecords`, `activitylogs`, `useraccounts`, `assignments`.
- `BaseCrudService.getAll(...)` defaults to a 50-row page — always pass
  `{ limit: 1000 }` when scanning across full collections.

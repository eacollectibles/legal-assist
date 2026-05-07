# Legal Assist — Letterhead Generator

Reusable Python module that produces letters on the LegalAssist
letterhead with an embedded cursive auto-signature. Used for LTB
scheduling requests, demand letters, Crown disclosure requests,
opposing-counsel correspondence, etc.

Output style matches the live website: navy ink (`#1F2D5C`), Helvetica
body copy, Allura cursive signature.

## Files

- `letterhead.py` — engine. Exposes `build_letter(content, out_path)`.
- `example_LTB_scheduling.py` — working example you can copy.

## Quick start

```python
from letterhead import build_letter

build_letter({
    'signer':           'jeanfrancois',          # or 'candice'
    'date':             'May 5, 2026',
    'recipient_person': 'Dana Wren',
    'recipient_title':  'Member, Landlord and Tenant Board',
    'recipient_lines':  ['15 Grosvenor Street', 'Toronto, ON  M7A 2G6'],
    'delivery_note':    'Delivered via the LTB e-File portal',
    're_line':          'Request to Schedule Hearing — File T-103871-25',
    'salutation':       'Dear Member Wren:',
    'body_paragraphs': [
        'First paragraph ...',
        'Second paragraph ...',
        'Third paragraph ...',
    ],
    'closing': 'Respectfully submitted,',
    'cc':      'Respondent (via LTB e-File)',
}, out_path='/tmp/my_letter.pdf')
```

## Content keys

| Key                | Required | Notes |
|--------------------|----------|-------|
| `date`             | yes      | e.g. `"May 5, 2026"` |
| `recipient_person` | yes      | First line of the recipient block |
| `recipient_lines`  | yes      | List of address lines (no need to include the person/title) |
| `re_line`          | yes      | Bolded "Re:" subject line |
| `salutation`       | yes      | `"Dear Member Wren:"` |
| `body_paragraphs`  | yes      | List of strings; HTML allowed (`<b>`, `<i>`) |
| `recipient_title`  | no       | e.g. `"Member, Landlord and Tenant Board"` |
| `delivery_note`    | no       | Italic line under the address (delivery method) |
| `closing`          | no       | Defaults to `"Respectfully submitted,"` |
| `cc`               | no       | One-line CC list |
| `signer`           | no       | `"jeanfrancois"` (default) or `"candice"` |
| `title`            | no       | PDF metadata title |
| `subject`          | no       | PDF metadata subject |

## CLI usage

You can also drop a JSON file matching the content shape and run:

```bash
python letterhead.py mycontent.json /tmp/myletter.pdf
```

## Bootstrap

On first run the engine downloads `Allura-Regular.ttf` from Google
Fonts into `/tmp/fonts`. Subsequent runs reuse the cached copy.

If your environment can't reach the public internet, drop the font
manually at `/tmp/fonts/Allura.ttf` before running.

## Adding or updating signers

The `PARALEGALS` dict at the top of `letterhead.py` mirrors
`src/lib/paralegals.ts`. Add a new key with `display_name`, `sig_text`,
`printed_name`, `lso`, `phone`, `email`. Keep both in sync.

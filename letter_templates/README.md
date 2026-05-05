# Legal Assist letter templates

Reusable Python module + template script for generating tribunal letters
(LTB, Small Claims, HRTO, etc.) on Legal Assist letterhead.

## Files

- **`letterhead.py`** — the reusable module. Defines:
  - `add_letterhead(story)` — appends the standard branded header
    (firm name, contact info, navy divider) to a Platypus story list.
  - `add_signoff(story, sig_image_path)` — appends "Respectfully
    submitted," + cursive signature + signature line + printed name +
    credentials block.
  - `build_doc(out_path, ...)` — creates a `SimpleDocTemplate` with
    Legal Assist's standard 0.9″ side / 0.7″ top / 0.8″ bottom margins
    and PDF metadata.
  - `render_cursive_signature(name, font_path, out_path)` — pre-renders
    a navy-ink Allura-font signature PNG; call once and reuse.
  - Style constants: `BODY_STYLE`, `SMALL_STYLE`, `RE_LINE_STYLE`,
    `SIG_NAME_STYLE`, `NAVY`, `GREY`.
  - Branding constants you change once per firm:
    `FIRM_NAME`, `FIRM_TAGLINE`, `FIRM_WEBSITE`, `FIRM_PHONE`,
    `FIRM_EMAIL`, `PRINCIPAL_NAME`, `PRINCIPAL_LICENCE`.
  - Margin constants: `MARGIN_LEFT`, `MARGIN_RIGHT`, `MARGIN_TOP`,
    `MARGIN_BOTTOM`.

- **`new_letter_template.py`** — fill-in-the-blanks starter.
  Copy and rename per matter, edit the **LETTER CONTENT** block at
  the top, run.

## Quick start

```bash
pip install reportlab pillow

# Download the signature font once (Allura, free, Google Fonts)
curl -L -o Allura-Regular.ttf \
  https://github.com/google/fonts/raw/main/ofl/allura/Allura-Regular.ttf

# Copy the template
cp new_letter_template.py letter_T-104522-25_disclosure.py

# Edit the file, change SIG_FONT_PATH to point at your Allura.ttf,
# fill in the LETTER CONTENT block, then:
python3 letter_T-104522-25_disclosure.py
```

The output PDF lands next to the script. Open, print, sign (or rely on
the embedded cursive signature) and serve.

## Customising

### Different recipient (Member, Adjudicator, Court Clerk, etc.)

Edit `RECIPIENT_NAME`, `RECIPIENT_TITLE`, `RECIPIENT_ADDRESS` and the
salutation. Examples:

```python
# LTB Member
RECIPIENT_NAME    = 'Dana Wren'
RECIPIENT_TITLE   = 'Member, Landlord and Tenant Board'
RECIPIENT_ADDRESS = ['15 Grosvenor Street, Ground Floor',
                     'Toronto, ON  M7A 2G6']
SALUTATION        = 'Dear Member Wren:'

# Small Claims Court
RECIPIENT_NAME    = 'Office of the Court Clerk'
RECIPIENT_TITLE   = 'Small Claims Court of Ontario'
RECIPIENT_ADDRESS = ['80 Dundas Street', 'London, ON  N6A 6A3']
SALUTATION        = 'To the Office of the Court Clerk:'

# HRTO Vice-chair
RECIPIENT_NAME    = 'David A. Wright'
RECIPIENT_TITLE   = 'Vice-chair, Human Rights Tribunal of Ontario'
RECIPIENT_ADDRESS = ['655 Bay Street, 14th Floor',
                     'Toronto, ON  M7A 2A3']
SALUTATION        = 'Dear Vice-chair Wright:'
```

### Adding paragraphs

Each entry in `BODY_PARAGRAPHS` becomes one paragraph in the letter.
Use HTML-like inline tags for `<b>bold</b>`, `<i>italic</i>`,
`<u>underline</u>` — these are ReportLab's mini-tag syntax.

### Removing the CC line

Set `CC_LINE = ''` (empty string).

### Changing the firm-wide branding

Edit `letterhead.py` — change `FIRM_NAME`, `FIRM_TAGLINE`,
`FIRM_WEBSITE`, `FIRM_PHONE`, `FIRM_EMAIL`, `PRINCIPAL_NAME`,
`PRINCIPAL_LICENCE`. Every letter that imports `letterhead` picks up
the change automatically — no need to touch each letter script.

### Two principals (e.g. cc Candice Fogarty)

Pass `PRINCIPAL_LICENCE = 'LSO #P22020 / #P21479'` to surface both
licence numbers in the letterhead, or edit `add_letterhead()` directly
to render two-line credit.

## What this template does NOT do

- **Hand-signed copies.** The cursive signature is rendered from the
  Allura font, not a scanned hand-signature. For tribunals that want
  a wet-ink original, print the PDF, sign in pen, scan back to PDF.
- **Email delivery.** Generates a PDF only. Use your usual email
  client to attach and send (separate email-template files live
  in `email_templates/` if/when you create them).
- **Form filings.** This is for procedural correspondence (letters,
  motions, scheduling requests). For application forms (T2, L1, etc.)
  use the LTB's prescribed forms — those have form fields the
  templates here can't fill in.

## Maintenance

- **Re-render the signature** by deleting `signature_jfd.png` and
  running any letter script — `render_cursive_signature` regenerates
  on demand.
- **Update licensure** when LSO numbers change by editing
  `letterhead.py` once.
- **Tweak typography** by editing the `BODY_STYLE` / `SMALL_STYLE`
  constants in `letterhead.py`. Default body is Helvetica 10.5pt /
  14pt leading — tight enough to fit a one-page procedural letter,
  loose enough to read cleanly.

"""
NEW LETTER TEMPLATE — Legal Assist
====================================

How to use:
    1. Copy this file and rename it for your matter,
       e.g. `letter_T-104522-25_disclosure_request.py`.
    2. Edit ONLY the LETTER CONTENT block below.
    3. Run:  python3 letter_T-104522-25_disclosure_request.py
    4. Output PDF lands next to the script.

Requires `letterhead.py` in the same folder, plus:
    pip install reportlab pillow
"""

import os
from reportlab.platypus import Paragraph, Spacer
from letterhead import (
    add_letterhead, add_signoff, build_doc,
    BODY_STYLE, SMALL_STYLE, RE_LINE_STYLE,
    render_cursive_signature,
)

# ===================================================================
# LETTER CONTENT — edit per use
# ===================================================================
OUTPUT_PDF = 'output_letter.pdf'

LETTER_DATE       = 'May 5, 2026'

# Recipient block — name on first line, title on second, address on remaining lines
RECIPIENT_NAME    = 'Dana Wren'
RECIPIENT_TITLE   = 'Member, Landlord and Tenant Board'
RECIPIENT_ADDRESS = ['15 Grosvenor Street, Ground Floor', 'Toronto, ON  M7A 2G6']

DELIVERY          = 'Delivered via the LTB e-File portal'
RE_LINE           = 'Request to Schedule Hearing — LTB File No. T-103871-25'
SALUTATION        = 'Dear Member Wren:'

# Body paragraphs — each entry becomes one paragraph
BODY_PARAGRAPHS = [
    'I am the licensed paralegal for the Applicant, '
    '<b>Selena Lyons</b>, in the above-noted matter. I write to you '
    'directly as the Member seized of this file.',

    'I write further to your endorsement of <b>February 18, 2026</b>, '
    'in which you directed that this matter not be scheduled before '
    '<b>May 4, 2026</b> in order to permit the Respondent additional '
    'time to obtain and produce a police report. That date has now '
    'passed and, to my knowledge, no police report has been produced '
    'or disclosed to my office.',

    'In the circumstances, I respectfully request that the matter be '
    'set down for hearing at the earliest available opportunity. The '
    'Applicant remains ready to proceed and, given the time elapsed, '
    'further delay would be prejudicial.',

    'I am happy to provide any additional information you may require '
    'to schedule this matter.',
]

CC_LINE = 'Respondent / Respondent&rsquo;s representative (via LTB e-File)'

# Signature image (pre-render once, reuse forever)
SIG_FONT_PATH = '/tmp/fonts/Allura.ttf'   # download from Google Fonts
SIG_IMG_PATH  = 'signature_jfd.png'

# ===================================================================
# Build
# ===================================================================
def main():
    # Render the cursive signature if it doesn't exist yet
    if not os.path.exists(SIG_IMG_PATH):
        render_cursive_signature('Jean-Francois Demers', SIG_FONT_PATH,
                                 SIG_IMG_PATH, rotate_deg=0)

    doc = build_doc(OUTPUT_PDF,
                    title=RE_LINE,
                    subject=RE_LINE)
    story = []

    # 1) Letterhead
    add_letterhead(story)

    # 2) Date
    story.append(Paragraph(LETTER_DATE, BODY_STYLE))
    story.append(Spacer(1, 4))

    # 3) Recipient block
    story.append(Paragraph(RECIPIENT_NAME, BODY_STYLE))
    if RECIPIENT_TITLE:
        story.append(Paragraph(RECIPIENT_TITLE, BODY_STYLE))
    for line in RECIPIENT_ADDRESS:
        story.append(Paragraph(line, BODY_STYLE))
    story.append(Spacer(1, 2))

    # 4) Delivery method (italic, smaller)
    if DELIVERY:
        story.append(Paragraph(f'<i>{DELIVERY}</i>', SMALL_STYLE))
        story.append(Spacer(1, 14))

    # 5) Re line
    story.append(Paragraph(f'<b>Re:</b> {RE_LINE}', RE_LINE_STYLE))
    story.append(Spacer(1, 14))

    # 6) Salutation
    story.append(Paragraph(SALUTATION, BODY_STYLE))

    # 7) Body
    for para in BODY_PARAGRAPHS:
        story.append(Paragraph(para, BODY_STYLE))

    story.append(Spacer(1, 14))

    # 8) Sign-off (cursive signature + line + name + credentials)
    add_signoff(story, SIG_IMG_PATH)

    story.append(Spacer(1, 12))

    # 9) CC line
    if CC_LINE:
        story.append(Paragraph(f'<b>cc:</b> {CC_LINE}', SMALL_STYLE))

    # Build
    doc.build(story)
    print(f'Wrote {OUTPUT_PDF} ({os.path.getsize(OUTPUT_PDF)} bytes)')


if __name__ == '__main__':
    main()

"""
Legal Assist — Reusable Letterhead Engine
==========================================

Generates a one-page (or multi-page) PDF on the Legal Assist letterhead
with a cursive auto-signature. Used for LTB scheduling requests, demand
letters, Crown disclosure requests, opposing-counsel correspondence,
etc. The letterhead and signature visuals match the live Wix retainer
look-and-feel: navy ink (#1F2D5C), Helvetica body, Allura cursive sig.

Quick use
---------
Call ``build_letter(content, out_path)`` with a content dict, e.g.:

    from letterhead import build_letter
    build_letter({
        'date': 'May 5, 2026',
        'recipient_person': 'Dana Wren',
        'recipient_title':  'Member, Landlord and Tenant Board',
        'recipient_lines':  ['15 Grosvenor Street', 'Toronto, ON  M7A 2G6'],
        'delivery_note':    'Delivered via the LTB e-File portal',  # italic line
        're_line':          'Request to Schedule Hearing — File T-103871-25',
        'salutation':       'Dear Member Wren:',
        'body_paragraphs': [
            'I am the licensed paralegal for the Applicant in the above-noted matter ...',
            'I write further to your endorsement of February 18, 2026 ...',
            'In the circumstances, I respectfully request ...',
        ],
        'closing':          'Respectfully submitted,',
        'cc':               'Respondent / Respondent’s representative (via LTB e-File)',
        # Optional — defaults to Jean-Francois Demers's block.
        'signer': 'jeanfrancois',     # or 'candice'
    }, out_path='/sessions/.../mnt/outputs/MyLetter.pdf')

Two paralegals are configured: 'jeanfrancois' (Jean-Francois Demers, LSO
#P22020) and 'candice' (Candice Fogarty, LSO #P21479).

Bootstrap
---------
On first run the engine fetches Allura from Google Fonts into /tmp/fonts
so the cursive signature renders correctly. Subsequent runs reuse it.
"""

from __future__ import annotations

import os
import urllib.request
from typing import Iterable, Mapping, Optional, Sequence

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image as RLImage,
)
from reportlab.pdfgen.canvas import Canvas
from PIL import Image, ImageDraw, ImageFont


# ----------------------------------------------------------------
# Paralegal directory — keep in sync with src/lib/paralegals.ts
# ----------------------------------------------------------------
PARALEGALS = {
    'jeanfrancois': {
        'display_name': 'Jean-Francois Demers',
        'sig_text':     'Jean-Francois Demers',
        'printed_name': 'Jean-Francois “Johnny” Demers',
        'lso':          'P22020',
        'phone':        '226-272-5153',
        'email':        'jeanfrancois@legalassist.london',
    },
    'candice': {
        'display_name': 'Candice Fogarty',
        'sig_text':     'Candice Fogarty',
        'printed_name': 'Candice Fogarty',
        'lso':          'P21479',
        'phone':        '226-272-5153',
        'email':        'jeanfrancois@legalassist.london',  # update when she gets her own
    },
}

DEFAULT_SIGNER = 'jeanfrancois'

# Brand colors / paths
NAVY = HexColor('#1F2D5C')
GREY = HexColor('#555555')

ALLURA_URL = 'https://github.com/google/fonts/raw/main/ofl/allura/Allura-Regular.ttf'
ALLURA_PATH = '/tmp/fonts/Allura.ttf'
SIG_TMP_DIR = '/tmp/legalassist_sigs'


# ----------------------------------------------------------------
# Font / signature helpers
# ----------------------------------------------------------------
def _ensure_allura() -> str:
    """Download Allura on first use; reuse the local copy after that."""
    if os.path.exists(ALLURA_PATH):
        return ALLURA_PATH
    os.makedirs(os.path.dirname(ALLURA_PATH), exist_ok=True)
    try:
        urllib.request.urlretrieve(ALLURA_URL, ALLURA_PATH)
    except Exception as e:
        raise RuntimeError(
            f'Could not download Allura font from {ALLURA_URL}: {e}. '
            f'Drop the .ttf manually at {ALLURA_PATH} and rerun.'
        )
    return ALLURA_PATH


def render_signature_image(name: str, out_path: str,
                           px_w: int = 1200, px_h: int = 280,
                           font_px: int = 130,
                           ink: tuple = (31, 45, 92, 255)) -> str:
    """Paint ``name`` in flowing cursive into a PNG. Returns out_path."""
    font_path = _ensure_allura()
    img = Image.new('RGBA', (px_w, px_h), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, font_px)
    bbox = draw.textbbox((0, 0), name, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (px_w - w) // 2 - bbox[0]
    y = (px_h - h) // 2 - bbox[1]
    draw.text((x, y), name, font=font, fill=ink)
    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    img.save(out_path)
    return out_path


# ----------------------------------------------------------------
# Page-numbered canvas — paints "Page X of Y" at the bottom centre of
# every page. Two-pass: first pass collects page count, second pass
# stamps the numbers. Standard reportlab pattern.
# ----------------------------------------------------------------
class NumberedCanvas(Canvas):
    def __init__(self, *args, **kwargs):
        Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self._draw_page_number(total)
            Canvas.showPage(self)
        Canvas.save(self)

    def _draw_page_number(self, total):
        self.setFont('Helvetica', 9)
        self.setFillColor(GREY)
        self.drawCentredString(
            letter[0] / 2.0,
            0.4 * inch,
            f'Page {self._pageNumber} of {total}',
        )


# ----------------------------------------------------------------
# Style sheet
# ----------------------------------------------------------------
def _build_styles():
    s = getSampleStyleSheet()
    body = ParagraphStyle(
        'Body', parent=s['Normal'],
        fontName='Helvetica', fontSize=10.5, leading=14, spaceAfter=8,
    )
    small = ParagraphStyle(
        'Small', parent=s['Normal'],
        fontName='Helvetica', fontSize=9, leading=12, textColor=GREY,
    )
    small_right = ParagraphStyle('SmallR', parent=small, alignment=TA_RIGHT)
    brand_left = ParagraphStyle(
        'BrandL', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=NAVY,
    )
    brand_left_sub = ParagraphStyle(
        'BrandLSub', parent=s['Normal'],
        fontName='Helvetica', fontSize=11, leading=14, textColor=NAVY,
    )
    re_line_style = ParagraphStyle('Re', parent=body, fontName='Helvetica-Bold')
    sig_name = ParagraphStyle('SigName', parent=body, fontName='Helvetica-Bold', spaceAfter=0)
    return {
        'body': body, 'small': small, 'small_right': small_right,
        'brand_left': brand_left, 'brand_left_sub': brand_left_sub,
        're_line': re_line_style, 'sig_name': sig_name,
    }


# ----------------------------------------------------------------
# Letterhead block
# ----------------------------------------------------------------
def _letterhead_table(signer: Mapping[str, str], st: dict) -> Table:
    left = [
        Paragraph('LEGAL ASSIST', st['brand_left']),
        Paragraph('Paralegal Services', st['brand_left_sub']),
    ]
    right = [
        Paragraph('www.legalassist.london', st['small_right']),
        Paragraph(signer['phone'], st['small_right']),
        Paragraph(signer['email'], st['small_right']),
        Paragraph(
            f"{signer['display_name']} &nbsp;|&nbsp; LSO #{signer['lso']}",
            st['small_right'],
        ),
    ]
    tbl = Table([[left, right]], colWidths=[3.4 * inch, 3.4 * inch])
    tbl.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return tbl


# ----------------------------------------------------------------
# Main entry point
# ----------------------------------------------------------------
def build_letter(content: Mapping, out_path: str) -> str:
    """
    Build a letter PDF and write to ``out_path``. Returns the path.

    Required content keys: date, recipient_person, recipient_lines,
    re_line, salutation, body_paragraphs.

    Optional: recipient_title, delivery_note (italic), closing, cc,
    signer ('jeanfrancois' | 'candice'), title (PDF metadata),
    subject (PDF metadata).
    """
    signer_key = content.get('signer') or DEFAULT_SIGNER
    signer = PARALEGALS.get(signer_key)
    if not signer:
        raise ValueError(
            f'Unknown signer key {signer_key!r}. '
            f'Choose from {list(PARALEGALS)}.'
        )

    st = _build_styles()

    # Render the cursive signature into a temp PNG (cached per signer).
    os.makedirs(SIG_TMP_DIR, exist_ok=True)
    sig_path = os.path.join(SIG_TMP_DIR, f'sig_{signer_key}.png')
    if not os.path.exists(sig_path):
        render_signature_image(signer['sig_text'], sig_path)

    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    doc = SimpleDocTemplate(
        out_path, pagesize=letter,
        leftMargin=0.9 * inch, rightMargin=0.9 * inch,
        topMargin=0.7 * inch, bottomMargin=0.8 * inch,
        title=content.get('title') or content.get('re_line', 'Legal Assist Letter'),
        author=f"{signer['display_name']}, Licensed Paralegal (LSO #{signer['lso']})",
        subject=content.get('subject') or content.get('re_line', ''),
    )

    body = st['body']
    story = []

    # Letterhead
    story.append(_letterhead_table(signer, st))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width='100%', thickness=1.0, color=NAVY))
    story.append(Spacer(1, 22))

    # Date
    story.append(Paragraph(content['date'], body))
    story.append(Spacer(1, 4))

    # Recipient
    story.append(Paragraph(content['recipient_person'], body))
    if content.get('recipient_title'):
        story.append(Paragraph(content['recipient_title'], body))
    for line in content.get('recipient_lines', []):
        story.append(Paragraph(line, body))

    if content.get('delivery_note'):
        story.append(Spacer(1, 2))
        story.append(Paragraph(f"<i>{content['delivery_note']}</i>", st['small']))
    story.append(Spacer(1, 14))

    # Re line
    story.append(Paragraph(f"<b>Re:</b> {content['re_line']}", st['re_line']))
    story.append(Spacer(1, 14))

    # Salutation + body
    story.append(Paragraph(content['salutation'], body))
    for p in content.get('body_paragraphs', []):
        story.append(Paragraph(p, body))

    story.append(Spacer(1, 14))

    # Closing line
    closing = content.get('closing') or 'Respectfully submitted,'
    story.append(Paragraph(closing, body))
    story.append(Spacer(1, 2))

    # Cursive signature image -> signature line -> printed name + credentials
    sig = RLImage(sig_path, width=2.4 * inch, height=0.5 * inch)
    sig.hAlign = 'LEFT'
    story.append(sig)
    story.append(HRFlowable(
        width=2.6 * inch, thickness=0.6, color=black,
        spaceBefore=-4, spaceAfter=4, hAlign='LEFT',
    ))
    story.append(Paragraph(signer['printed_name'], st['sig_name']))
    story.append(Paragraph('Licensed Paralegal &mdash; Law Society of Ontario', body))
    story.append(Paragraph(f"Licence No. {signer['lso']}", body))
    story.append(Paragraph(
        f"{signer['phone']} &nbsp;|&nbsp; {signer['email']}", body,
    ))

    if content.get('cc'):
        story.append(Spacer(1, 12))
        story.append(Paragraph(f"<b>cc:</b> {content['cc']}", st['small']))

    doc.build(story, canvasmaker=NumberedCanvas)
    return out_path


# ----------------------------------------------------------------
# CLI: lets the user run `python letterhead.py example.json out.pdf`.
# ----------------------------------------------------------------
if __name__ == '__main__':
    import json
    import sys

    if len(sys.argv) != 3:
        print('Usage: python letterhead.py <content.json> <out.pdf>')
        sys.exit(1)
    with open(sys.argv[1], 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    out = build_letter(data, sys.argv[2])
    print(f'OK -> {out}')
    print(f'Size: {os.path.getsize(out)} bytes')

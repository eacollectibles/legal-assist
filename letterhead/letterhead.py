"""
Legal Assist — Reusable Letterhead Engine
==========================================

Generates a one-page (or multi-page) PDF on the Legal Assist letterhead
with a cursive auto-signature.
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
    HRFlowable, Image as RLImage, PageBreak,
)
from reportlab.pdfgen.canvas import Canvas
from PIL import Image, ImageDraw, ImageFont


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
        'email':        'jeanfrancois@legalassist.london',
    },
}

DEFAULT_SIGNER = 'jeanfrancois'
NAVY = HexColor('#1F2D5C')
GREY = HexColor('#555555')

ALLURA_URL = 'https://github.com/google/fonts/raw/main/ofl/allura/Allura-Regular.ttf'
ALLURA_PATH = '/tmp/fonts/Allura.ttf'
SIG_TMP_DIR = '/tmp/legalassist_sigs'


def _ensure_allura() -> str:
    if os.path.exists(ALLURA_PATH):
        return ALLURA_PATH
    os.makedirs(os.path.dirname(ALLURA_PATH), exist_ok=True)
    urllib.request.urlretrieve(ALLURA_URL, ALLURA_PATH)
    return ALLURA_PATH


def render_signature_image(name, out_path, px_w=1200, px_h=280,
                           font_px=130, ink=(31, 45, 92, 255)):
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
            letter[0] / 2.0, 0.4 * inch,
            f'Page {self._pageNumber} of {total}',
        )


def _build_styles():
    s = getSampleStyleSheet()
    body = ParagraphStyle('Body', parent=s['Normal'],
        fontName='Helvetica', fontSize=10.5, leading=13, spaceAfter=5)
    # Tight body — no spaceAfter, used for the recipient block lines.
    body_tight = ParagraphStyle('BodyTight', parent=body, spaceAfter=0)
    small = ParagraphStyle('Small', parent=s['Normal'],
        fontName='Helvetica', fontSize=9, leading=12, textColor=GREY)
    small_right = ParagraphStyle('SmallR', parent=small, alignment=TA_RIGHT)
    brand_left = ParagraphStyle('BrandL', parent=s['Normal'],
        fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=NAVY)
    brand_left_sub = ParagraphStyle('BrandLSub', parent=s['Normal'],
        fontName='Helvetica', fontSize=11, leading=14, textColor=NAVY)
    re_line_style = ParagraphStyle('Re', parent=body, fontName='Helvetica-Bold')
    sig_name = ParagraphStyle('SigName', parent=body,
        fontName='Helvetica-Bold', spaceAfter=0)
    return {'body': body, 'body_tight': body_tight, 'small': small,
            'small_right': small_right, 'brand_left': brand_left,
            'brand_left_sub': brand_left_sub, 're_line': re_line_style,
            'sig_name': sig_name}


def _letterhead_table(signer, st):
    left = [Paragraph('LEGAL ASSIST', st['brand_left']),
            Paragraph('Paralegal Services', st['brand_left_sub'])]
    right = [Paragraph('www.legalassist.london', st['small_right']),
             Paragraph(signer['phone'], st['small_right']),
             Paragraph(signer['email'], st['small_right']),
             Paragraph(f"{signer['display_name']} &nbsp;|&nbsp; LSO #{signer['lso']}",
                       st['small_right'])]
    tbl = Table([[left, right]], colWidths=[3.4 * inch, 3.4 * inch])
    tbl.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return tbl


def build_letter(content, out_path):
    signer_key = content.get('signer') or DEFAULT_SIGNER
    signer = PARALEGALS.get(signer_key)
    if not signer:
        raise ValueError(f'Unknown signer key {signer_key!r}.')

    st = _build_styles()

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
    body_tight = st['body_tight']
    story = []

    story.append(_letterhead_table(signer, st))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width='100%', thickness=1.0, color=NAVY))
    story.append(Spacer(1, 22))

    story.append(Paragraph(content['date'], body))
    story.append(Spacer(1, 4))

    # Recipient block — single-spaced, no inter-line padding.
    story.append(Paragraph(content['recipient_person'], body_tight))
    if content.get('recipient_title'):
        story.append(Paragraph(content['recipient_title'], body_tight))
    for line in content.get('recipient_lines', []):
        story.append(Paragraph(line, body_tight))

    if content.get('delivery_note'):
        story.append(Spacer(1, 6))
        story.append(Paragraph(f"<i>{content['delivery_note']}</i>", st['small']))
    story.append(Spacer(1, 14))

    story.append(Paragraph(f"<b>Re:</b> {content['re_line']}", st['re_line']))
    story.append(Spacer(1, 14))

    story.append(Paragraph(content['salutation'], body))
    for p in content.get('body_paragraphs', []):
        story.append(Paragraph(p, body))

    # Force signature onto its own page so it never splits.
    if not content.get('inline_signature'):
        story.append(PageBreak())
    else:
        story.append(Spacer(1, 14))

    closing = content.get('closing') or 'Respectfully submitted,'
    story.append(Paragraph(closing, body))
    story.append(Spacer(1, 2))

    sig = RLImage(sig_path, width=2.4 * inch, height=0.5 * inch)
    sig.hAlign = 'LEFT'
    story.append(sig)
    story.append(HRFlowable(width=2.6 * inch, thickness=0.6, color=black,
        spaceBefore=-4, spaceAfter=4, hAlign='LEFT'))
    story.append(Paragraph(signer['printed_name'], st['sig_name']))
    story.append(Paragraph('Licensed Paralegal &mdash; Law Society of Ontario', body))
    story.append(Paragraph(f"Licence No. {signer['lso']}", body))
    story.append(Paragraph(
        f"{signer['phone']} &nbsp;|&nbsp; {signer['email']}", body))

    if content.get('cc'):
        story.append(Spacer(1, 12))
        story.append(Paragraph(f"<b>cc:</b> {content['cc']}", st['small']))

    doc.build(story, canvasmaker=NumberedCanvas)
    return out_path


if __name__ == '__main__':
    import json, sys
    if len(sys.argv) != 3:
        print('Usage: python letterhead.py <content.json> <out.pdf>')
        sys.exit(1)
    with open(sys.argv[1], 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    out = build_letter(data, sys.argv[2])
    print(f'OK -> {out}')
    print(f'Size: {os.path.getsize(out)} bytes')

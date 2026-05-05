"""
Legal Assist letterhead — reusable template module.

The letterhead matches the look used on Legal Assist correspondence to
tribunals (LTB, Small Claims, HRTO, etc.):

    LEGAL ASSIST                                  www.legalassist.london
    Paralegal Services                                       226-272-5153
                                          jeanfrancois@legalassist.london
                                  Jean-Francois Demers  |  LSO #P22020
    ─────────────────────────────────────────────────────────────────────

Usage from a letter script:

    from letterhead import (
        add_letterhead, build_doc, BODY_STYLE, SMALL_STYLE,
        RE_LINE_STYLE, SIG_NAME_STYLE, NAVY,
    )

    story = []
    add_letterhead(story)
    story.append(Paragraph('May 5, 2026', BODY_STYLE))
    ...
    doc = build_doc('output.pdf', title='My letter', subject='...')
    doc.build(story)
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black
from reportlab.lib.enums import TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image as RLImage,
)

# ===================================================================
# BRANDING — change ONCE here, every letter updates.
# ===================================================================
FIRM_NAME           = 'LEGAL ASSIST'
FIRM_TAGLINE        = 'Paralegal Services'
FIRM_WEBSITE        = 'www.legalassist.london'
FIRM_PHONE          = '226-272-5153'
FIRM_EMAIL          = 'jeanfrancois@legalassist.london'
PRINCIPAL_NAME      = 'Jean-Francois Demers'
PRINCIPAL_LICENCE   = 'LSO #P22020'

# Colours
NAVY = HexColor('#1F2D5C')
GREY = HexColor('#555555')

# Default page geometry
PAGE_SIZE     = letter
MARGIN_LEFT   = 0.9 * inch
MARGIN_RIGHT  = 0.9 * inch
MARGIN_TOP    = 0.7 * inch
MARGIN_BOTTOM = 0.8 * inch

# ===================================================================
# Styles — exported so callers can reuse them.
# ===================================================================
_styles = getSampleStyleSheet()

BODY_STYLE = ParagraphStyle(
    'Body', parent=_styles['Normal'],
    fontName='Helvetica', fontSize=10.5, leading=14, spaceAfter=8,
)
SMALL_STYLE = ParagraphStyle(
    'Small', parent=_styles['Normal'],
    fontName='Helvetica', fontSize=9, leading=12, textColor=GREY,
)
SMALL_RIGHT_STYLE = ParagraphStyle(
    'SmallR', parent=SMALL_STYLE, alignment=TA_RIGHT,
)
BRAND_HEAD_STYLE = ParagraphStyle(
    'Brand', parent=_styles['Normal'],
    fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=NAVY,
)
BRAND_SUB_STYLE = ParagraphStyle(
    'BrandSub', parent=_styles['Normal'],
    fontName='Helvetica', fontSize=11, leading=14, textColor=NAVY,
)
RE_LINE_STYLE = ParagraphStyle(
    'Re', parent=BODY_STYLE, fontName='Helvetica-Bold',
)
SIG_NAME_STYLE = ParagraphStyle(
    'SigName', parent=BODY_STYLE, fontName='Helvetica-Bold', spaceAfter=0,
)


def add_letterhead(story, with_divider=True, divider_thickness=1.0,
                   spacer_after=22):
    """
    Append the standard Legal Assist letterhead to a Platypus story list.

    `story` is mutated in-place — same list you'll later pass to
    `doc.build(story)`.

    Args:
        story:            list of Platypus flowables (mutated)
        with_divider:     draw a navy horizontal rule under the header
        divider_thickness: thickness in points (1.0 default)
        spacer_after:     vertical space after the letterhead, in points
    """
    left_cell = [
        Paragraph(FIRM_NAME, BRAND_HEAD_STYLE),
        Paragraph(FIRM_TAGLINE, BRAND_SUB_STYLE),
    ]
    right_cell = [
        Paragraph(FIRM_WEBSITE, SMALL_RIGHT_STYLE),
        Paragraph(FIRM_PHONE, SMALL_RIGHT_STYLE),
        Paragraph(FIRM_EMAIL, SMALL_RIGHT_STYLE),
        Paragraph(
            f'{PRINCIPAL_NAME} &nbsp;|&nbsp; {PRINCIPAL_LICENCE}',
            SMALL_RIGHT_STYLE,
        ),
    ]
    tbl = Table(
        [[left_cell, right_cell]],
        colWidths=[3.4 * inch, 3.4 * inch],
    )
    tbl.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(tbl)
    if with_divider:
        story.append(Spacer(1, 6))
        story.append(HRFlowable(width='100%', thickness=divider_thickness,
                                color=NAVY))
    story.append(Spacer(1, spacer_after))


def build_doc(out_path, title='Legal Assist Correspondence',
              subject='Correspondence', author=None):
    """
    Construct a SimpleDocTemplate with our standard margins and metadata.
    """
    return SimpleDocTemplate(
        out_path, pagesize=PAGE_SIZE,
        leftMargin=MARGIN_LEFT, rightMargin=MARGIN_RIGHT,
        topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM,
        title=title,
        author=author or f'{PRINCIPAL_NAME}, Licensed Paralegal ({PRINCIPAL_LICENCE})',
        subject=subject,
    )


# ===================================================================
# Cursive signature helper (Allura font, navy ink).
# ===================================================================
def render_cursive_signature(name, font_path, out_path,
                             px_w=1200, px_h=280, font_px=130,
                             ink=(31, 45, 92, 255), rotate_deg=0):
    """
    Pre-render a cursive signature PNG. Call once, then embed the
    resulting PNG with reportlab.platypus.Image in the sign-off block.
    Set `rotate_deg` to a non-zero value (e.g. -3) for a tilted, more
    'hand-signed' feel.
    """
    from PIL import Image, ImageDraw, ImageFont

    img = Image.new('RGBA', (px_w, px_h), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, font_px)
    bbox = draw.textbbox((0, 0), name, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (px_w - w) // 2 - bbox[0]
    y = (px_h - h) // 2 - bbox[1]
    draw.text((x, y), name, font=font, fill=ink)
    if rotate_deg:
        img = img.rotate(rotate_deg, resample=Image.BICUBIC, expand=False)
    img.save(out_path)


def add_signoff(story, sig_image_path, name=PRINCIPAL_NAME,
                nickname='Johnny', credentials='Licensed Paralegal — Law Society of Ontario',
                licence_no='P22020', phone=FIRM_PHONE, email=FIRM_EMAIL,
                closing='Respectfully submitted,'):
    """
    Append the standard Legal Assist sign-off block: closing,
    cursive signature image, signature line, printed name + credentials.
    """
    story.append(Paragraph(closing, BODY_STYLE))
    story.append(Spacer(1, 2))

    sig = RLImage(sig_image_path, width=2.4 * inch, height=0.5 * inch)
    sig.hAlign = 'LEFT'
    story.append(sig)

    story.append(HRFlowable(width=2.4 * inch, thickness=0.6, color=black,
                            spaceBefore=-4, spaceAfter=4, hAlign='LEFT'))
    display_name = f'{name} &ldquo;{nickname}&rdquo; {name.split()[-1]}' if nickname else name
    # Simpler: hard-code the format since the template is firm-specific
    display_name = f'Jean-Francois &ldquo;{nickname}&rdquo; Demers' if nickname else name
    story.append(Paragraph(display_name, SIG_NAME_STYLE))
    story.append(Paragraph(f'{credentials}', BODY_STYLE))
    story.append(Paragraph(f'Licence No. {licence_no}', BODY_STYLE))
    story.append(Paragraph(f'{phone} &nbsp;|&nbsp; {email}', BODY_STYLE))

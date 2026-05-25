"""
Generate og-home.jpg matching the existing brand style (navy gradient + orange accent).
1200x630 — Open Graph standard.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1200, 630

# Brand colors (lifted from the existing og-image.jpg)
NAVY_TOP    = (15, 25, 50)
NAVY_BOTTOM = (28, 42, 78)
ORANGE      = (212, 96, 39)
ORANGE_DK   = (180, 78, 30)
WHITE       = (255, 255, 255)
LIGHT       = (210, 220, 235)
DIVIDER     = (212, 96, 39, 255)

img = Image.new("RGB", (W, H), NAVY_TOP)
draw = ImageDraw.Draw(img)

# ----- Vertical gradient background -----
for y in range(H):
    t = y / H
    r = int(NAVY_TOP[0] + (NAVY_BOTTOM[0] - NAVY_TOP[0]) * t)
    g = int(NAVY_TOP[1] + (NAVY_BOTTOM[1] - NAVY_TOP[1]) * t)
    b = int(NAVY_TOP[2] + (NAVY_BOTTOM[2] - NAVY_TOP[2]) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# ----- Subtle diagonal lines for texture (low alpha) -----
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for i in range(-H, W + H, 24):
    od.line([(i, 0), (i + H, H)], fill=(255, 255, 255, 8), width=1)
img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(img)

# ----- Soft radial highlight upper right -----
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
cx, cy, rmax = 1050, 100, 500
for r in range(rmax, 0, -10):
    a = int(18 * (1 - r / rmax) ** 2)
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(80, 140, 220, a))
glow = glow.filter(ImageFilter.GaussianBlur(radius=20))
img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
draw = ImageDraw.Draw(img)

# ----- Fonts -----
F_TAG    = ImageFont.truetype("/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf", 22)
F_TITLE  = ImageFont.truetype("/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf",   78)
F_SUB    = ImageFont.truetype("/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf", 30)
F_FOOT   = ImageFont.truetype("/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf", 22)
F_URL    = ImageFont.truetype("/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf",   24)

# ----- Top-left tag pill -----
pill_text = "Legal Assist Paralegal Services"
pill_pad_x, pill_pad_y = 22, 12
bbox = draw.textbbox((0, 0), pill_text, font=F_TAG)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
pill_w = tw + pill_pad_x * 2
pill_h = th + pill_pad_y * 2 + 6
pill_x, pill_y = 80, 60
draw.rounded_rectangle(
    [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
    radius=pill_h // 2, fill=ORANGE
)
draw.text((pill_x + pill_pad_x, pill_y + pill_pad_y - 2), pill_text, font=F_TAG, fill=WHITE)

# ----- Main headline -----
draw.text((80, 165),  "Licensed Paralegal",  font=F_TITLE, fill=WHITE)
draw.text((80, 255),  "Services in Ontario", font=F_TITLE, fill=ORANGE)

# ----- Orange divider -----
draw.rectangle([80, 360, 200, 365], fill=ORANGE)

# ----- Subtitle -----
draw.text((80, 385), "Free Consultation  •  London, Ontario", font=F_SUB, fill=LIGHT)

# ----- Right-side scales of justice (vector) -----
def draw_scales(d, cx, cy, scale=1.0, color=(255,255,255,80)):
    s = scale
    # vertical pole
    d.rectangle([cx-3*s, cy-100*s, cx+3*s, cy+110*s], fill=color)
    # top knob
    d.ellipse([cx-10*s, cy-110*s, cx+10*s, cy-90*s], fill=color)
    # crossbar
    d.rectangle([cx-90*s, cy-60*s, cx+90*s, cy-54*s], fill=color)
    # connecting strings (left + right)
    d.line([(cx-80*s, cy-54*s), (cx-80*s, cy-20*s)], fill=color, width=int(2*s))
    d.line([(cx+80*s, cy-54*s), (cx+80*s, cy-20*s)], fill=color, width=int(2*s))
    # left pan
    d.polygon([(cx-110*s, cy-20*s), (cx-50*s, cy-20*s),
               (cx-65*s, cy+10*s),  (cx-95*s, cy+10*s)], outline=color, width=int(3*s))
    # right pan
    d.polygon([(cx+50*s, cy-20*s), (cx+110*s, cy-20*s),
               (cx+95*s, cy+10*s),  (cx+65*s, cy+10*s)], outline=color, width=int(3*s))
    # base
    d.rectangle([cx-45*s, cy+108*s, cx+45*s, cy+118*s], fill=color)
    d.rectangle([cx-65*s, cy+118*s, cx+65*s, cy+126*s], fill=color)

scales_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(scales_layer)
draw_scales(sd, 1010, 320, scale=1.1, color=(255, 255, 255, 70))
img = Image.alpha_composite(img.convert("RGBA"), scales_layer).convert("RGB")
draw = ImageDraw.Draw(img)

# ----- Bottom orange divider -----
draw.rectangle([0, 538, W, 543], fill=ORANGE)

# ----- Footer left: location + LSO licence note -----
footer_y = 565
draw.text((80, footer_y), "London, Ontario  •  Licensed by the Law Society of Ontario",
          font=F_FOOT, fill=LIGHT)

# ----- Footer right: domain -----
url_text = "legalassist.london"
url_bbox = draw.textbbox((0, 0), url_text, font=F_URL)
url_w = url_bbox[2] - url_bbox[0]
draw.text((W - url_w - 80, footer_y - 2), url_text, font=F_URL, fill=ORANGE)

# ----- Save as JPEG -----
out_path = "/sessions/busy-nifty-bardeen/mnt/legal-assist-main/public/og-home.jpg"
img.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
print(f"Wrote: {out_path}")

# Verify size
import os
print(f"Size: {os.path.getsize(out_path) / 1024:.1f} KB")

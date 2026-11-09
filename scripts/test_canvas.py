import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# ==============================================================================
# COLOR PALETTE: AMBER ORANGE + DEEP BLACK / OBSIDIAN
# ==============================================================================
COLOR_BG_PAGE = colors.HexColor('#080A0F')        # Pure obsidian black
COLOR_BG_CARD = colors.HexColor('#0F141E')        # Dark charcoal card
COLOR_BG_CODE = colors.HexColor('#04060A')        # Terminal console black
COLOR_BORDER_AMBER = colors.HexColor('#D97706')   # Vivid amber border
COLOR_BORDER_SUBTLE = colors.HexColor('#78350F')  # Deep dark amber
COLOR_BORDER_MUTED = colors.HexColor('#27272A')   # Charcoal border

COLOR_AMBER_BRIGHT = colors.HexColor('#F59E0B')   # Primary amber
COLOR_AMBER_LIGHT = colors.HexColor('#FDE68A')    # Pale amber / command text
COLOR_ORANGE_VIVID = colors.HexColor('#EA580C')   # Vivid orange
COLOR_TEXT_WHITE = colors.HexColor('#F8FAFC')     # Off-white headline
COLOR_TEXT_MUTED = colors.HexColor('#94A3B8')     # Slate grey subtitle/labels
COLOR_CODE_GREEN = colors.HexColor('#34D399')     # Terminal success green

class ObsidianAmberCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute total pages and draw consistent
    obsidian black background, illuminated amber header/footer rules, and page counts.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        self.saveState()
        # Full page background fill
        self.setFillColor(COLOR_BG_PAGE)
        self.rect(0, 0, 595.27, 841.89, fill=1, stroke=0)

        # Subtle glowing top accent bar
        self.setFillColor(COLOR_AMBER_BRIGHT)
        self.rect(0, 836, 595.27, 6, fill=1, stroke=0)

        # Header rule
        self.setStrokeColor(COLOR_BORDER_AMBER)
        self.setLineWidth(0.8)
        self.line(32, 810, 563, 810)

        # Running Header Text
        self.setFillColor(COLOR_AMBER_BRIGHT)
        self.setFont('Helvetica-Bold', 7.5)
        self.drawString(32, 816, 'REDKROSS DEFENSIVE CYBERSECURITY ACADEMY')
        self.setFont('Helvetica', 7.5)
        self.setFillColor(COLOR_TEXT_MUTED)
        self.drawRightString(563, 816, 'STUDENT PRACTICAL LAB & TOOLS BLUEPRINT')

        # Footer rule
        self.setStrokeColor(COLOR_BORDER_MUTED)
        self.setLineWidth(0.8)
        self.line(32, 32, 563, 32)

        # Running Footer Text
        self.setFillColor(COLOR_TEXT_MUTED)
        self.setFont('Helvetica', 7.5)
        self.drawString(32, 21, 'CONFIDENTIAL // OFFICIAL STUDENT LAB EXECUTION GUIDE')
        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(COLOR_AMBER_BRIGHT)
        self.drawRightString(563, 21, f'PAGE {self._pageNumber} OF {total_pages}')

        self.restoreState()

print("Canvas class prepared successfully.")

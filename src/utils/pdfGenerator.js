import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * High-Resolution Certificate PDF Generator
 * Renders the official RedKross Research Foundation Certificate to a print-ready A4 PDF.
 */
export async function downloadCertificatePdf(elementOrId, filename = 'RedKross_Certificate.pdf') {
  try {
    const element = typeof elementOrId === 'string'
      ? document.getElementById(elementOrId)
      : elementOrId;

    if (!element) {
      console.error('Certificate element not found for PDF generation');
      return false;
    }

    // Capture DOM at 2.5x resolution for sharp text and graphics
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Portrait A4 matches the 949 x 1343 template aspect ratio (~1:1.41)
    const orientation = canvasWidth > canvasHeight ? 'landscape' : 'portrait';
    const pdf = new jsPDF({
      orientation,
      unit: 'pt',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Scale precisely into the A4 printable area
    const widthRatio = pdfWidth / canvasWidth;
    const heightRatio = pdfHeight / canvasHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    const renderWidth = canvasWidth * ratio;
    const renderHeight = canvasHeight * ratio;
    const marginX = Math.max(0, (pdfWidth - renderWidth) / 2);
    const marginY = Math.max(0, (pdfHeight - renderHeight) / 2);

    pdf.addImage(imgData, 'PNG', marginX, marginY, renderWidth, renderHeight, undefined, 'FAST');
    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('Failed to generate certificate PDF:', error);
    // Fallback: trigger native window.print if html2canvas fails
    window.print();
    return false;
  }
}

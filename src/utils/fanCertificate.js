import { jsPDF } from 'jspdf'

function drawCheckeredStrip(pdf, x, y) {
  const squareSize = 4
  const columns = 8

  for (let row = 0; row < 2; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const isRed = (row + column) % 2 === 0
      pdf.setFillColor(...(isRed ? [216, 50, 36] : [28, 27, 25]))
      pdf.rect(x + column * squareSize, y + row * squareSize, squareSize, squareSize, 'F')
    }
  }
}

export function createFanCertificatePdf(recipient, perfectScore = 20) {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()
  const center = width / 2
  const safeName = recipient.replace(/[<>:"/\\|?*]/g, '').trim().slice(0, 48) || 'FIAT Fan'

  pdf.setProperties({
    title: 'FIAT Crew Fan Certificate',
    subject: 'Perfect score in the FIAT minigames',
    author: 'FIAT',
  })
  pdf.setFillColor(244, 240, 231)
  pdf.rect(0, 0, width, height, 'F')
  pdf.setDrawColor(28, 27, 25)
  pdf.setLineWidth(1.2)
  pdf.rect(10, 10, width - 20, height - 20)
  pdf.setDrawColor(216, 50, 36)
  pdf.setLineWidth(0.5)
  pdf.rect(14, 14, width - 28, height - 28)

  drawCheckeredStrip(pdf, 24, 23)
  drawCheckeredStrip(pdf, width - 56, 23)

  pdf.setFillColor(216, 50, 36)
  pdf.circle(center, 43, 11, 'F')
  pdf.setTextColor(244, 240, 231)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(15)
  pdf.text('F', center, 48, { align: 'center' })

  pdf.setTextColor(28, 27, 25)
  pdf.setFontSize(28)
  pdf.text('FIAT FAN CERTIFICATE', center, 75, { align: 'center' })
  pdf.setDrawColor(216, 50, 36)
  pdf.setLineWidth(1)
  pdf.line(center - 42, 82, center + 42, 82)

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(12)
  pdf.text('AWARDED TO', center, 98, { align: 'center' })
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(24)
  pdf.text(pdf.splitTextToSize(safeName, 210).slice(0, 2), center, 113, {
    align: 'center',
    lineHeightFactor: 1.15,
  })

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(14)
  pdf.text(`For earning a perfect score of ${perfectScore} / ${perfectScore}`, center, 139, { align: 'center' })
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(17)
  pdf.setTextColor(216, 50, 36)
  pdf.text('AND BEING A REAL FIAT CREW FAN', center, 151, { align: 'center' })

  pdf.setTextColor(28, 27, 25)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.text(`FIAT MINIGAMES  /  ${new Date().toLocaleDateString('en-GB')}`, center, height - 24, { align: 'center' })
  return {
    pdf,
    filename: `${safeName.replace(/\s+/g, '-').toLowerCase()}-fiat-fan-certificate.pdf`,
  }
}
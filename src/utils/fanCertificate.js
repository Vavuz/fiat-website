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

function drawCertificateMotif(pdf, motif, color, center) {
  pdf.setFillColor(...color)
  pdf.setDrawColor(...color)

  if (motif === 'lyrics') {
    pdf.roundedRect(center - 9, 33, 18, 22, 2, 2, 'F')
    pdf.setDrawColor(244, 240, 231)
    pdf.setLineWidth(0.8)
    pdf.line(center - 5, 40, center + 5, 40)
    pdf.line(center - 5, 44, center + 5, 44)
    pdf.line(center - 5, 48, center + 2, 48)
  } else if (motif === 'artist') {
    pdf.roundedRect(center - 4, 33, 8, 15, 4, 4, 'F')
    pdf.setLineWidth(1.5)
    pdf.line(center, 48, center, 53)
    pdf.line(center - 6, 53, center + 6, 53)
    pdf.line(center - 7, 44, center - 7, 46)
    pdf.line(center + 7, 44, center + 7, 46)
    pdf.line(center - 7, 46, center - 5, 50)
    pdf.line(center + 7, 46, center + 5, 50)
  } else if (motif === 'song') {
    pdf.roundedRect(center - 11, 40, 22, 9, 2, 2, 'F')
    pdf.triangle(center - 7, 40, center - 3, 34, center + 5, 34, 'F')
    pdf.setFillColor(28, 27, 25)
    pdf.circle(center - 6, 50, 3, 'F')
    pdf.circle(center + 6, 50, 3, 'F')
  } else {
    const cell = 6
    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        if ((row + column) % 2 === 0) {
          pdf.rect(center - 9 + column * cell, 34 + row * cell, cell, cell, 'F')
        }
      }
    }
  }
}

export function createFanCertificatePdf(recipient, perfectScore = 20, theme = {}) {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()
  const center = width / 2
  const safeName = recipient.replace(/[<>:"/\\|?*]/g, '').trim().slice(0, 48) || 'FIAT Fan'
  const title = theme.pdfTitle ?? 'FIAT FAN CERTIFICATE'
  const gameName = theme.gameName ?? 'FIAT Minigames'
  const color = theme.color ?? [216, 50, 36]
  const motif = theme.motif ?? 'mixed'

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

  drawCertificateMotif(pdf, motif, color, center)

  pdf.setTextColor(28, 27, 25)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(title.length > 22 ? 23 : 27)
  pdf.text(title, center, 75, { align: 'center' })
  pdf.setDrawColor(...color)
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
  pdf.setTextColor(...color)
  pdf.text(`PERFECT RUN / ${gameName.toUpperCase()}`, center, 151, { align: 'center' })

  pdf.setTextColor(28, 27, 25)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.text(`FIAT MINIGAMES  /  ${new Date().toLocaleDateString('en-GB')}`, center, height - 24, { align: 'center' })
  return {
    pdf,
    filename: `${safeName.replace(/\s+/g, '-').toLowerCase()}-fiat-fan-certificate.pdf`,
  }
}
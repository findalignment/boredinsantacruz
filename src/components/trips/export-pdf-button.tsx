'use client';

import { useState } from 'react';
import { TripWithItems } from '@/types/trips';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

interface ExportPDFButtonProps {
  trip: TripWithItems;
}

export function ExportPDFButton({ trip }: ExportPDFButtonProps) {
  const [exporting, setExporting] = useState(false);

  const exportToPDF = async () => {
    setExporting(true);
    toast.loading('Generating PDF...');

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Helper function to check if we need a new page
      const checkPageBreak = (spaceNeeded: number) => {
        if (yPosition + spaceNeeded > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Helper to add text with wrapping
      const addText = (text: string, fontSize: number, isBold: boolean = false, indent: number = 0) => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        
        const lines = pdf.splitTextToSize(text, contentWidth - indent);
        const lineHeight = fontSize * 0.5;
        
        checkPageBreak(lines.length * lineHeight);
        
        lines.forEach((line: string) => {
          pdf.text(line, margin + indent, yPosition);
          yPosition += lineHeight;
        });
      };

      // Title - Minimal
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(trip.name, margin, yPosition);
      yPosition += 12;

      // Dates (if available)
      if (trip.startDate || trip.endDate) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const dates = trip.startDate && trip.endDate 
          ? `${trip.startDate} - ${trip.endDate}`
          : trip.startDate || trip.endDate || '';
        pdf.text(dates, margin, yPosition);
        yPosition += 8;
      }

      // Description
      if (trip.description) {
        yPosition += 3;
        addText(trip.description, 10, false);
        yPosition += 5;
      }

      // Thin line separator
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.1);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      // Group items by day
      const itemsByDay = trip.items.reduce((acc, item) => {
        const day = item.day || 1;
        if (!acc[day]) acc[day] = [];
        acc[day].push(item);
        return acc;
      }, {} as Record<number, typeof trip.items>);

      const days = Object.keys(itemsByDay).sort((a, b) => Number(a) - Number(b));

      // Iterate through days
      days.forEach((dayNum, dayIndex) => {
        const dayItems = itemsByDay[Number(dayNum)];
        const dayLabel = days.length > 1 ? `Day ${dayNum}` : 'Itinerary';

        // Day heading
        checkPageBreak(15);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(dayLabel, margin, yPosition);
        yPosition += 8;

        // Items for this day
        dayItems.forEach((item, index) => {
          checkPageBreak(12);

          // Item number (minimal circle)
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          pdf.circle(margin + 2, yPosition - 1.5, 2, 'S');
          pdf.text(String(index + 1), margin + 1.2, yPosition);

          // Item name
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(item.itemName, margin + 8, yPosition);
          yPosition += 5;

          // Parse item data for additional info
          let parsedData: any = null;
          try {
            parsedData = item.itemData ? JSON.parse(item.itemData) : null;
          } catch (e) {
            // Ignore parse errors
          }

          // Address (if available)
          if (parsedData?.address) {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(100, 100, 100);
            pdf.text(`📍 ${parsedData.address}`, margin + 8, yPosition);
            yPosition += 4;
          }

          // Cost and duration
          const details = [];
          if (parsedData?.cost !== undefined) details.push(`$${parsedData.cost}`);
          if (parsedData?.duration) details.push(parsedData.duration);
          
          if (details.length > 0) {
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);
            pdf.text(details.join(' • '), margin + 8, yPosition);
            yPosition += 4;
          }

          // Notes (if any)
          if (item.notes) {
            pdf.setFontSize(9);
            pdf.setTextColor(60, 60, 60);
            pdf.setFont('helvetica', 'italic');
            const noteLines = pdf.splitTextToSize(`Note: ${item.notes}`, contentWidth - 10);
            noteLines.forEach((line: string) => {
              checkPageBreak(4);
              pdf.text(line, margin + 8, yPosition);
              yPosition += 4;
            });
          }

          pdf.setTextColor(0, 0, 0); // Reset color
          yPosition += 3; // Space between items
        });

        // Space between days
        if (dayIndex < days.length - 1) {
          yPosition += 5;
        }
      });

      // Footer - minimal
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
        pdf.text(
          'Created with boredinsantacruz.com',
          pageWidth - margin,
          pageHeight - 10,
          { align: 'right' }
        );
      }

      // Save PDF
      const filename = `${trip.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      pdf.save(filename);

      toast.success('PDF downloaded!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={exporting}
      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center gap-2"
      title="Export as PDF"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {exporting ? 'Generating...' : 'Export PDF'}
    </button>
  );
}


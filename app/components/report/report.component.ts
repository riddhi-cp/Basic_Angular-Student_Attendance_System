//.ts file for report
// // report.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  standalone: true,
  imports: [FormsModule,CommonModule,FormsModule],
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  attendanceData: any = {}; // Store attendance records by date
  selectedDate: string = ''; // Selected date for viewing reports
  reportVisible = false; // To show or hide the report table
  studentReport: any[] = []; // Store attendance for the selected date

  ngOnInit() {
    // ✅ Load saved attendance data from localStorage
    const savedData = localStorage.getItem('attendanceData');
    this.attendanceData = savedData ? JSON.parse(savedData) : {};
  }

  // ✅ View Report for Selected Date
  viewReport() {
    if (this.selectedDate && this.attendanceData[this.selectedDate]) {
      // Get attendance for the selected date
      this.studentReport = this.attendanceData[this.selectedDate];
      this.reportVisible = true;
    } else {
      alert('No attendance data found for the selected date.');
      this.reportVisible = false;
    }
  }

  // ✅ Export Attendance Report as PDF
  exportReportAsPDF() {
    if (!this.reportVisible || this.studentReport.length === 0) {
      alert('Please view the report before exporting.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Attendance Report', 70, 15);
    doc.setFontSize(12);
    doc.text(`Date: ${this.selectedDate}`, 14, 25);

    // Define Table Headers and Rows
    const tableHeaders = [['#', 'Name', 'Roll No', 'Attendance']];
    const tableRows = this.studentReport.map((student, i) => [
      i + 1,
      student.name,
      student.rollNo,
      student.attendance || 'Not Marked',
    ]);

    // Add Table to PDF
    autoTable(doc, {
      head: tableHeaders,
      body: tableRows,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 12 },
      bodyStyles: { textColor: 50, fontSize: 11, halign: 'center' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 30 },
    });

    // Save PDF with Date
    doc.save(`attendance-report-${this.selectedDate}.pdf`);
  }
}

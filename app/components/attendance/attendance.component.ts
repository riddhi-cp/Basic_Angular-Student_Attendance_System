//.ts file for attendence
// // attendance.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  students: any[] = [];
  selectedDate: string = ''; // Store selected date
  attendanceData: any = {}; // Store attendance by date

  ngOnInit() {
    // ✅ Load Students from localStorage
    const savedStudents = localStorage.getItem('students');
    this.students = savedStudents ? JSON.parse(savedStudents) : [];

    // ✅ Load Existing Attendance Data from localStorage
    const savedAttendance = localStorage.getItem('attendanceData');
    this.attendanceData = savedAttendance ? JSON.parse(savedAttendance) : {};
  }

  // ✅ Mark Attendance for a Student
  markAttendance(index: number, status: string) {
    this.students[index].attendance = status;
  }

  // ✅ Submit Attendance for Selected Date
  submitAttendance() {
    if (!this.selectedDate) {
      alert('Please select a date before submitting attendance.');
      return;
    }

    // ✅ Save attendance for the selected date
    this.attendanceData[this.selectedDate] = this.students.map((student) => ({
      name: student.name,
      rollNo: student.rollNo,
      attendance: student.attendance || 'Not Marked',
    }));

    // ✅ Save data to localStorage
    localStorage.setItem('attendanceData', JSON.stringify(this.attendanceData));
    alert(`Attendance saved successfully for ${this.selectedDate}`);
  }
}

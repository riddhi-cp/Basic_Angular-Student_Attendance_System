//.ts file for the student list component
// student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from "./filter.pipe";

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, FilterPipe],
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent = { id: '', name: '', rollNo: '', class: '' };
  editingId: string = '';
  searchQuery: string = '';  // Search query to filter students
  previewStudent: any = null;  // For student profile preview

  ngOnInit() {
    this.loadStudents();
  }

  // Load students from localStorage
  loadStudents() {
    const savedStudents = localStorage.getItem('students');
    this.students = savedStudents ? JSON.parse(savedStudents) : [];
  }

  // Save to localStorage
  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  // Add  student
  addOrUpdateStudent() {
    if (!this.newStudent.name || !this.newStudent.rollNo || !this.newStudent.class) {
      alert('All fields are required!');
      return;
    }

    if (this.editingId === '') {
      // New student
      const newEntry = {
        ...this.newStudent,
        id: this.generateUniqueId(),
      };
      this.students.push(newEntry);
    } else {
      // Editing existing student
      const index = this.students.findIndex(student => student.id === this.editingId);
      if (index !== -1) {
        this.students[index] = { ...this.newStudent, id: this.editingId };
      }
      this.editingId = '';
    }

    this.saveStudents();
    this.resetForm();
  }

  // Reset the form
  resetForm() {
    this.newStudent = { id: '', name: '', rollNo: '', class: '' };
    this.editingId = '';
  }

  // Generate a unique ID
  generateUniqueId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2);
  }

  // Show student profile preview on hover
  showPreview(student: any) {
    this.previewStudent = student;
  }

  // Hide student profile preview
  hidePreview() {
    this.previewStudent = null;
  }

  // Clear all students
  clearAllStudents() {
    if (confirm('Are you sure you want to clear all students?')) {
      this.students = [];
      this.saveStudents();
    }
  }
}


// //✅ In Simple Words:
// Two-way data binding means the input box and your variable are linked.
// If one changes, the other changes automatically
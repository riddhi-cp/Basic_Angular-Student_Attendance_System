import { Component } from '@angular/core';
import { StudentListComponent } from "./components/student-list/student-list.component";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { ReportComponent } from "./components/report/report.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [StudentListComponent, AttendanceComponent, ReportComponent,FormsModule, CommonModule],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  currentComponent = 'attendance'; // Default component to show

  showComponent(component: string) {
    this.currentComponent = component;
  }
}


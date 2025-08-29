import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StudentListComponent } from './app/components/student-list/student-list.component';  // Adjusted to the correct path


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


platformBrowserDynamic().bootstrapModule(StudentListComponent)
  .catch(err => console.error(err));

//   deleteStudent(index: number) {
bootstrapApplication(StudentListComponent);

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  name: string;
  rollNo: string;
  grade: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Student Manager</h2>
      <form (ngSubmit)="editMode ? updateStudent() : addStudent()">
        <input [(ngModel)]="currentStudent.name" name="name" placeholder="Name" required>
        <input [(ngModel)]="currentStudent.rollNo" name="rollNo" placeholder="Roll No" required>
        <input [(ngModel)]="currentStudent.grade" name="grade" placeholder="Grade" required>
        <button type="submit">{{ editMode ? 'Update' : 'Add' }}</button>
      </form>

      <table>
        <tr *ngFor="let student of students; let i = index">
          <td>{{ student.name }}</td>
          <td>{{ student.rollNo }}</td>
          <td>{{ student.grade }}</td>
          <td><button (click)="editStudent(i)">Edit</button></td>
        </tr>
      </table>
    </div>
  `,
  styles: [`
    table { width: 100%; margin-top: 1rem; }
    td { padding: 0.5rem; border: 1px solid #ddd; }
    input { margin: 0.5rem; padding: 0.5rem; }
  `]
})
export class AppComponent {
  students: Student[] = [];
  currentStudent: Student = { name: '', rollNo: '', grade: '' };
  editMode = false;
  editIndex = -1;

  addStudent() {
    this.students.push({...this.currentStudent});
    this.clearForm();
  }

  editStudent(index: number) {
    this.currentStudent = {...this.students[index]};
    this.editMode = true;
    this.editIndex = index;
  }

  updateStudent() {
    this.students[this.editIndex] = {...this.currentStudent};
    this.clearForm();
  }

  clearForm() {
    this.currentStudent = { name: '', rollNo: '', grade: '' };
    this.editMode = false;
  }
}

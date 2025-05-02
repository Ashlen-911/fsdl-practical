import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Hello {{ message }}!</h1>
      <input [(ngModel)]="message" placeholder="Enter name">
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding: 2rem;
    }
    input {
      padding: 0.5rem;
      margin: 1rem;
      width: 200px;
    }
  `]
})
export class AppComponent {
  message = 'World';
}

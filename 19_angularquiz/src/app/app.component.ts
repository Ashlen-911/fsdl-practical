import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="header">Quick Quiz</h1>

      <div *ngIf="currentQuestion < questions.length" class="quiz-card">
        <div class="question-header">
          <span class="question-number">Question {{ currentQuestion + 1 }}/{{ questions.length }}</span>
        </div>
        <p class="question-text">{{ questions[currentQuestion].question }}</p>

        <div class="options-container">
          <button
            *ngFor="let option of questions[currentQuestion].options; let i = index"
            (click)="checkAnswer(i)"
            class="option-button"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div *ngIf="currentQuestion >= questions.length" class="result-card">
        <h2 class="score-header">Quiz Complete!</h2>
        <p class="score-text">Your Score: {{ score }}/{{ questions.length }}</p>
        <button
          (click)="restart()"
          class="restart-button"
        >
          Try Again
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }

    .header {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
      border-bottom: 2px solid #3498db;
      padding-bottom: 0.5rem;
    }

    .quiz-card, .result-card {
      background: #ffffff;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
    }

    .question-header {
      margin-bottom: 1.5rem;
    }

    .question-number {
      color: #7f8c8d;
      font-size: 0.9rem;
      font-weight: bold;
    }

    .question-text {
      color: #2c3e50;
      font-size: 1.2rem;
      margin-bottom: 2rem;
      line-height: 1.5;
    }

    .options-container {
      display: grid;
      gap: 1rem;
    }

    .option-button {
      padding: 1rem;
      border: none;
      border-radius: 8px;
      background: #3498db;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .option-button:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .result-card {
      text-align: center;
    }

    .score-header {
      color: #27ae60;
      margin-bottom: 1rem;
    }

    .score-text {
      color: #2c3e50;
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .restart-button {
      padding: 1rem 2rem;
      background: #e67e22;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .restart-button:hover {
      background: #d35400;
    }
  `]
})
export class AppComponent {
  questions: Question[] = [
    {
      question: 'What is the result of 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1
    },
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correct: 1
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correct: 1
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Rembrandt'],
      correct: 2
    }
  ];
  currentQuestion = 0;
  score = 0;

  checkAnswer(selected: number) {
    if (selected === this.questions[this.currentQuestion].correct) this.score++;
    this.currentQuestion++;
  }

  restart() {
    this.currentQuestion = 0;
    this.score = 0;
  }
}

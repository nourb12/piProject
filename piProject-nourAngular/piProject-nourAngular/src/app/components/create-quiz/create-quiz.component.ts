import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz-service.service';  // Adjust the path based on your folder structure

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']  // Add your styles if any
})
export class CreateQuizComponent implements OnInit {
  quizForm!: FormGroup;
  levels = ['BEGINNER', 'INTERMEDIATE', 'EXPERT'];

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      specialite: ['', [Validators.required, Validators.minLength(3)]],
      dateQuiz: ['', Validators.required],
      level: ['', Validators.required]  // Ajout du champ level
    });
  }

  // Getters for easier access to form controls in the template
  get title() {
    return this.quizForm.get('title');
  }

  get description() {
    return this.quizForm.get('description');
  }

  get specialite() {
    return this.quizForm.get('specialite');
  }

  get dateQuiz() {
    return this.quizForm.get('dateQuiz');
  }

  // Submit handler for the form
  onSubmit(): void {
    if (this.quizForm.valid) {
      const quizData = this.quizForm.value;

      this.quizService.createQuiz(quizData).subscribe(
        (response) => {
          console.log('Quiz created successfully!', response);
          this.router.navigate(['/quiz-list']);
        },
        (error) => {
          console.error('Error creating quiz:', error);
        }
      );
    }
  }
}

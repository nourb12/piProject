import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { ProfilebackComponent } from './profileback/profileback.component';
import { IntershipoffersComponent } from './intershipoffers/intershipoffers.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ListQuizComponent } from './components/list-quiz/list-quiz.component';
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { ListQuestionComponent } from './components/list-question/list-question.component';
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { ListAnswerComponent } from './components/list-answer/list-answer.component';
import { UpdateAnswerComponent } from './components/update-answer/update-answer.component';
import { QuizFrontComponent } from './components/quiz-front/quiz-front.component';
import { QuizStatComponent } from './components/quiz-stat/quiz-stat.component';
import { UpdateQuestionComponent } from './components/update-question/update-question.component';


const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' }, // Redirige vers /front au lieu de répéter HomeComponent
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'back', component: HomebackComponent },
  { path: 'backnav', component: HeaderbackComponent },
  { path: 'login', component: LoginfrontComponent },
  { path: 'homeback', component: HomebackComponent },
  { path: 'profileback', component: ProfilebackComponent },
  {path: 'intership' , component: IntershipoffersComponent},
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'list-quiz', component: ListQuizComponent },
  { path: 'update-quiz/:id', component: UpdateQuizComponent },
  { path: 'add-question/:quizId', component: AddQuestionComponent },
  { path: 'questions-list/:quizId', component: ListQuestionComponent },
  { path: 'edit-question/:id', component: UpdateQuestionComponent },
  { path: 'add-answer/:questionId', component: AddAnswerComponent },
  { path: 'answer-list/:questionId', component: ListAnswerComponent },
  { path: 'update-answer/:answerId', component: UpdateAnswerComponent },
  { path: 'quizFront/:specialite', component: QuizFrontComponent },
  { path: 'quiz-statistics', component: QuizStatComponent },
 // { path: '**', redirectTo: 'front', pathMatch: 'full' } // Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

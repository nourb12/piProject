import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterbackComponent } from './components/footerback/footerback.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { SidebackComponent } from './components/sideback/sideback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { ProfilebackComponent } from './profileback/profileback.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListQuizComponent } from './components/list-quiz/list-quiz.component';
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { ListQuestionComponent } from './components/list-question/list-question.component';
import { UpdateQuestionComponent } from './components/update-question/update-question.component';
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { ListAnswerComponent } from './components/list-answer/list-answer.component';
import { UpdateAnswerComponent } from './components/update-answer/update-answer.component';
import { IntershipoffersComponent } from './intershipoffers/intershipoffers.component';
import { QuizFrontComponent } from './components/quiz-front/quiz-front.component';
import { QuizStatComponent } from './components/quiz-stat/quiz-stat.component';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
    PartnershipsComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterbackComponent,
    HomebackComponent,
    SidebackComponent,
    HeaderbackComponent,
    LoginfrontComponent,
    ProfilebackComponent,
    CreateQuizComponent,
    ListQuizComponent,
    UpdateQuizComponent,
    AddQuestionComponent,
    ListQuestionComponent,
    UpdateQuestionComponent,
    AddAnswerComponent,
    ListAnswerComponent,
    UpdateAnswerComponent,
    IntershipoffersComponent,
    QuizFrontComponent,
    QuizStatComponent,
    BadgeComponent // Declare the component here, not in imports
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    RouterModule // Ensure RouterModule is imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

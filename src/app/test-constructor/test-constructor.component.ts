import { Component, ViewChild } from '@angular/core';
import { TestConstructorService } from 'src/app/test-constructor.service';
import { Router } from '@angular/router';

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

@Component({
  selector: 'app-test-constructor',
  templateUrl: './test-constructor.component.html',
  styleUrls: ['./test-constructor.component.css']
})

export class TestConstructorComponent {

  constructor(private service: TestConstructorService, private router: Router) { }

  inputValues: string[] = [''];
  question: string = '';
  correctIndex: string = '';
  testName: string = '';
  tests: Question[] = [];

  error: string = '';
  nameError: string = '';
  finish: boolean = false;
  setName: boolean = false;
  boolAdd: boolean = false;

  testTime: number;

  onTrackBy (index: any) {
    return index;
  }

  addAnswer() {
    this.inputValues.push('');
    this.boolAdd = true;
  }

  onChange(event: any, i: number) {
    this.inputValues[i] = event.target.value;
  }

  onSubmit() {
    if (this.question) {
      if(this.correctIndex) {
        if (this.inputValues.some(element => element == '')) {
          this.error = "Please, enter all answers.";
        } else {
          this.tests.push({ question: this.question, answers: [...this.inputValues], correct: parseInt(this.correctIndex) });

          this.finish = true;
          
          //form reset
          this.question = '';
          this.inputValues = [''];
          this.correctIndex = '';
          this.error = '';
          this.boolAdd = false;
        }
      }
      else {
        this.error = "Please, select the correct answer.";
      }
    } else {
      this.error = "Please, enter the question.";
    }
  }

  async showModel () {
    this.setName = true;
  }

  async finishTest () {
    if (this.testName && this.testTime) {
      if (this.testTime < 1) {
        this.nameError = "Incorrect time input";
      } else {
        const discipline = localStorage.getItem('disciplineId');
        this.service.saveTest(this.tests, this.testName, this.testTime, discipline);
        this.setName = false;
      }
    } else {
      this.nameError = "Please, enter all values";
    }
  }

  closeSetName() {
    this.setName = false;
  }
}
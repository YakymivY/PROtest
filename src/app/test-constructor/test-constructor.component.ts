import { Component, OnInit } from '@angular/core';
import { TestConstructorService } from 'src/app/services/test-constructor.service';
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

export class TestConstructorComponent implements OnInit {

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

  ngOnInit(): void {
    const testsString = localStorage.getItem('savedTests');
    if (testsString) this.tests = JSON.parse(testsString);

    if (this.tests.length > 0) this.finish = true;
  }

  onTrackBy(index: any) {
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
      if (this.correctIndex) {
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

          //save test to localstorage
          const testsString = JSON.stringify(this.tests);
          localStorage.setItem('savedTests', testsString);
        }
      }
      else {
        this.error = "Please, select the correct answer.";
      }
    } else {
      this.error = "Please, enter the question.";
    }
  }

  deleteTest(i: number) {
    this.tests.splice(i, 1);

    //save test to localstorage
    const testsString = JSON.stringify(this.tests);
    localStorage.setItem('savedTests', testsString);
  }

  async showModel(event: Event) {
    event.preventDefault();
    this.setName = true;
  }

  async finishTest() {
    if (this.testName && this.testTime) {
      if (this.testTime < 1) {
        this.nameError = "Incorrect time input";
      } else {
        const discipline = localStorage.getItem('disciplineId');
        if (discipline) {
          this.service.findTestname(this.testName, discipline).subscribe(
            (foundTest) => {
              if (!foundTest) {
                this.service.saveTest(this.tests, this.testName, this.testTime, discipline);
                localStorage.removeItem('savedTests');
                this.setName = false;
              } else {
                this.nameError = "There is the test with this name.";
              }
            },
            (error) => {
              console.log('ERROR: ', error);
            }
          );
        }
      }
    } else {
      this.nameError = "Please, enter all values";
    }
  }

  closeSetName() {
    this.setName = false;
  }
}
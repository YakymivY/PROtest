import { Component, OnInit } from '@angular/core';
import { TestSolvingService } from 'src/app/services/test-solving.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-solving',
  templateUrl: './test-solving.component.html',
  styleUrls: ['./test-solving.component.css']
})
export class TestSolvingComponent implements OnInit {

  tests: any = [];
  loadId: string | null = '';
  userAnswers: number[] = [];
  correctCounter: number = 0;
  mark: number;

  testTime: any;
  timer: any;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  done: boolean = false;

  userData: any;
  testId: any;

  error: string = '';

  constructor(private service: TestSolvingService, private router: Router) { }

  ngOnInit() {
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      this.userData = JSON.parse(jsonString);
    } else {
      console.log("ERROR: could not get data from local storage");
    }
    this.loadId = localStorage.getItem('testToLoad');
    if (this.loadId) {
      this.service.loadTest(this.loadId).subscribe(
        (response: any) => {
          this.tests = response.tests;
          this.minutes = response.time; /////////
          this.testId = response.id;
          this.startTimer();
        },
        error => {
          console.log("error", error);
        }
      );
    } else {
      console.log("ERROR: could not load a test");
    }

  }

  onTrackBy(index: any) {
    return index;
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          if (this.hours > 0) {
            this.hours--;
            this.minutes = 59;
            this.seconds = 59;
          } else {
            if (!this.done) {
              clearInterval(this.timer);
              console.log("Time's up!");
              this.finishTest();
            }
          }
        }
      }
    }, 1000);
  }

  finishTest() {
    this.done = true;
    for (let j = 0; j < this.tests.length; j++) {
      if (this.userAnswers[j] == this.tests[j].correct) {
        console.log("Answer ", j, " is correct");
        this.correctCounter++;
      } else {
        console.log("Answer ", j, " is incorrect");
      }
    }
    let result = this.correctCounter / this.tests.length * 100;
    this.mark = Math.round(result * 100) / 100;
    console.log(this.mark, "%");
    this.service.pushAnswers(this.userData._id, this.testId, this.userAnswers, this.mark);
    this.router.navigate(['/student']);
  }

  onRadioChange(event: any) {
    if (event.target.checked) {
      let testNum = event.target.getAttribute("question-id");
      let answerNum = event.target.value;
      this.userAnswers[testNum] = answerNum;
      console.log(testNum, answerNum);
    }
  }

  onSubmit() {
    for (let i = 0; i < this.tests.length; i++) {
      if (!this.userAnswers[i]) {
        this.error = "Please, choose all the answers.";
        break;
      } else {
        this.error = '';
      }
    }
    this.finishTest();
  }



}

import { Component, OnInit } from '@angular/core';
import { DisciplineService } from '../services/discipline.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  disciplineName: string = '';
  username: string = '';
  userData: any;
  disciplines: any;

  boolAddUser: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userError: string = '';

  boolAddStudent: boolean = false;
  studentEmail: string = '';
  studentError: string = '';
  disIndex: number;
  tests: [];

  students: any;
  boolShowMarks: boolean = false;
  disId: number;

  settingsShown: boolean = false;
  deleteDisciplineOption: string = '';
  removeStudentsFlag: number = NaN;

  constructor(private service: DisciplineService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      this.userData = JSON.parse(jsonString);
    } else {
      console.log("ERROR: could not get data from local storage");
    }
    this.username = this.userData.username;

    //clear disciplines array
    this.disciplines = [];

    this.service.loadDisciplines("teacher").subscribe(
      (response: any) => {
        this.disciplines = response.disciplines;
        this.students = response.students;
        this.tests = response.tests;
      },
      error => {
        console.log(error);
      }
    );
  }

  onTrackBy(index: any) {
    return index;
  }

  addDiscipline() {
    if (!this.disciplineName) {
      alert("Please, enter discipline name");
    } else {
      this.service.pushDiscipline(this.disciplineName).subscribe(
        (response: any) => {
          if (response["status"] === "error") {
            alert("Sorry, there is already a discipline with this name. Please, select the other one");
          } else {
            this.disciplines.push({ name: this.disciplineName, tests: [], students: [], teacher: this.userData._id });
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  //adding new user

  addUser() {
    this.boolAddUser = true;
  }

  userSubmit() {
    if (!this.userName) {
      this.userError = "Please, enter name of a student";
    } else {
      if (!this.userEmail) {
        this.userError = "Please, enter email";
      } else {
        if (!this.userPassword) {
          this.userError = "Please, enter the password";
        } else {
          this.authService.onRegister(this.userEmail, this.userPassword, this.userName, "student").subscribe(
            (response: any) => {
              this.boolAddUser = false;
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    }
  }

  //adding new test

  addTest(event: any) {
    const disId = event.target.getAttribute('discipline-id');
    const disciplineTestId = this.disciplines[disId]._id;
    localStorage.setItem('disciplineId', disciplineTestId);
    this.router.navigate(['/constructor']);
  }

  //adding new student to a discipline

  addStudent(i: any) {
    this.boolAddStudent = true;
    this.disIndex = i;
  }

  studentSubmit() {
    if (!this.studentEmail) {
      this.studentError = "Please enter student's email";
    } else {
      const disciplineId = this.disciplines[this.disIndex]._id;
      this.service.addStudent(this.studentEmail, disciplineId).subscribe(
        (response: any) => {
          if (response.status === "no such user") {
            this.studentError = "There is no student with such email";
          } else {
            if (response.status === "added") {
              this.studentError = "You have already added the student";
            } else {
              this.boolAddStudent = false;
              this.students[this.disIndex].push(response);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeStudents(i: number) {
    Number.isNaN(this.removeStudentsFlag) ? this.removeStudentsFlag = i : this.removeStudentsFlag = NaN;
  }

  kickStudent(d: number, s: number) {
    const d_id = this.disciplines[d]._id;
    const s_id = this.disciplines[d].students[s];
    this.service.removeStudent(d_id, s_id).subscribe(
      (response: any) => {
        console.log('success', response);
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  //marks

  showMarks(event: any) {
    const disciplineId = event.target.getAttribute('d-id');
    const testId = event.target.getAttribute('t-id');
    this.boolShowMarks = true;
    this.disId = disciplineId;

  }

  closeAddStudent() {
    this.boolAddStudent = false;
  }

  closeAddUser() {
    this.boolAddUser = false;
  }

  closeMarks() {
    this.boolShowMarks = false;
  }

  //settings

  showSettings () {
    this.settingsShown = !this.settingsShown;
  }

  deleteDiscipline () {
    if (!this.deleteDisciplineOption) alert("Error. Select the discipline to delete")
    else {
      this.service.deleteDiscipline(this.deleteDisciplineOption).subscribe(
        (response: any) => {
          const indexToDelete = this.disciplines.findIndex((item: any) => item._id === this.deleteDisciplineOption);
          if (indexToDelete !== -1) {
            this.disciplines.splice(indexToDelete, 1);
          }
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error)
        }
      );
    }
  }

}

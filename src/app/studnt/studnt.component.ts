import { Component, OnInit } from '@angular/core';
import { DisciplineService } from '../discipline.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studnt',
  templateUrl: './studnt.component.html',
  styleUrls: ['./studnt.component.css']
})
export class StudntComponent {

  userData: any;
  disciplines: any;
  disciplineIds: [];
  tests: any;
  solved: any;

  constructor(private service: DisciplineService, private router: Router) { }


  ngOnInit() {
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      this.userData = JSON.parse(jsonString);
    } else {
      console.log("ERROR: could not get data from local storage");
    }

    this.service.loadDisciplines("student").subscribe(
      (response: any) => {
        console.log("success", response);
        this.disciplines = response.disciplines;
        this.tests = response.tests;
        this.solved = response.solved;
      },
      error => {
        console.log(error);
      }
    );
  }

  onTrackBy(index: any) {
    return index;
  }

  idInArray (array: [], value: any) {
    const exists = array.some(innerArray => innerArray[0] == value);
    return exists;
  }

  getMark (array: [], value: any) {
    const found = array.find(innerArray => innerArray[0] == value);
    if (found) {
      return found[1];
    }
    return
  }

  startTest(event: any) {
    const discId = event.target.getAttribute('disc-id');
    const testId = event.target.getAttribute('test-id');

    const test = this.tests[discId][testId]._id;
    if (this.solved.includes(test)) {
      console.log("test is already solved");
    } else {
      localStorage.setItem('testToLoad', test);
    this.router.navigate(['/solving']);
    }
  }
  
}


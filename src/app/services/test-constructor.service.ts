import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestConstructorService {

  path: string = environment.host_path;

  constructor(private http: HttpClient, private router: Router) { }

  findTestname(testname: string, disciplineId: string) {
    let params = new HttpParams().set('name', testname).set('discipline', disciplineId);
    return this.http.get(this.path + '/api/find-testname', { params }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  saveTest(tests: any[], name: string, time: number, disciplineId: any) {
    return this.http.post(this.path + '/api/test', { tests, name, time, disciplineId }).subscribe(
      response => {
        this.router.navigate(['/teacher']);
      },
      error => {
        console.log('error', error);
      }
    );
  }

}

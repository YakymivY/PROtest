import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class TestConstructorService {

  path: string = environment.host_path;

  constructor(private http: HttpClient, private router: Router) { }

  saveTest (tests: any[], name: string, time: number, disciplineId: any) {
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

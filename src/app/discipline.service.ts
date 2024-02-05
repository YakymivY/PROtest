import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  userData: any;
  path: string = environment.host_path;

  constructor(private http: HttpClient) { }

  loadDisciplines(role: string) {
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      this.userData = JSON.parse(jsonString);
    } else {
      console.log("ERROR: could not get data from local storage");
    }
    const id = this.userData._id;

    return this.http.post(this.path + "/api/get-discipline", { id, role });
  }

  pushDiscipline(name: string) {

    return this.http.post(this.path + "/api/add-discipline", { name });
  }

  addStudent(email: string, disciplineId: any) {
    return this.http.post(this.path + "/api/add-student", { email, disciplineId });
  }
}

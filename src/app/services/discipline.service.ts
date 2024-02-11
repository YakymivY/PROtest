import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment';

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

    let params = new HttpParams().set('id', id).set('role', role);
    return this.http.get(this.path + "/api/get-discipline", { params });
  }

  pushDiscipline(name: string) {
    return this.http.post(this.path + "/api/add-discipline", { name });
  }

  deleteDiscipline(id: string) {
    let params = new HttpParams().set('id', id);
    return this.http.delete(this.path + '/api/delete-discipline', { params });
  }

  addStudent(email: string, disciplineId: any) {
    return this.http.post(this.path + "/api/add-student", { email, disciplineId });
  }

  removeStudent(discipline: string, student: string) {
    return this.http.post(this.path + "/api/remove-student", { discipline, student });
  }
}

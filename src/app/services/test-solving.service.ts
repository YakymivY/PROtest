import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class TestSolvingService {

  path: string = environment.host_path;

  constructor(private http: HttpClient) { }

  loadTest(id: string) {
    let params = new HttpParams().set('id', id);
    return this.http.get(this.path + '/api/solve', { params });
  }

  pushAnswers(userId: string, testId: any, answers: number[], mark: number) {
    return this.http.post(this.path + '/api/answers', { userId, testId, answers, mark }).subscribe(
      error => {
        console.log('error', error);
      }
    );
  }

}

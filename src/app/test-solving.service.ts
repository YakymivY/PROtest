import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class TestSolvingService {

  path: string = environment.host_path;

  constructor(private http: HttpClient) { }

  loadTest(id: string | null) {
    return this.http.post(this.path + '/api/solve', { id });
  }

  pushAnswers(userId: string, testId: any, answers: number[], mark: number) {
    return this.http.post(this.path + '/api/answers', { userId, testId, answers, mark }).subscribe(
      error => {
        console.log('error', error);
      }
    );
  }

}

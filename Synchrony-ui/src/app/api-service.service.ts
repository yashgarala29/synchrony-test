import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }


  getStudents(): Observable<any> {
    return this.http.get(this.baseUrl + 'student/getAllStudents');
  }
  addStudent(student: any): Observable<any> {
    return this.http.post(this.baseUrl + 'student/addStudent', student, { responseType: 'text' });
  }
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "student/deleteStudent/" + id, { responseType: 'text' });
  }
  updateStudent(student: any): Observable<any> {
    return this.http.patch(this.baseUrl + "student/updateStudent", student, { responseType: 'text' });
  }
  searchStudent(studentName: string): Observable<any> {
    return this.http.get(this.baseUrl + "student/searchStudent/" + studentName);
  }


}

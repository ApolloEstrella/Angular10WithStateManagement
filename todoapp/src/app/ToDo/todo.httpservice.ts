import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'http://localhost:44308/api/ToDo';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    var x = this.httpclient.get<ToDo[]>(this.ApiURL)
    return this.httpclient.get<ToDo[]>(this.ApiURL);
  }

  createToDos(payload: ToDo): Observable<ToDo> {
    return this.httpclient.post<ToDo>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType': 'json' }
    });
  }

  deleteToDos(id: number): Observable<ToDo> {
    return this.httpclient.delete<ToDo>(`${this.ApiURL}/${id}`);
  }

  updateToDos(payload: ToDo): Observable<ToDo> {
    return this.httpclient.put<ToDo>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType': 'json' }
    });
  }
}

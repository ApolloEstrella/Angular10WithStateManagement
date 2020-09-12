import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../todo.action';
import ToDo from '../todo.model';
import ToDoState from '../todo.state';
import * as jquery from 'jquery'
 

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )  
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Id: number = 0;
  Title: string = '';
  IsCompleted: boolean = false;

  todoError: Error = null;

  createToDo() {
    var todoId = $("#todoId").val()
    if (todoId === '') {
      const todo: ToDo = { Id: this.Id, Title: this.Title, IsCompleted: this.IsCompleted };
      this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
      this.Title = '';
      this.IsCompleted = false;
    }
    else {
      const title = $("#Title").val()
      var isCompleted = $("#IsCompleted").prop('checked')
      const todo: ToDo = { Id: Number(todoId), Title: String(title), IsCompleted: isCompleted };
      this.store.dispatch(ToDoActions.BeginUpdateToDoAction({ payload: todo }));
      this.Title = '';
      this.IsCompleted = false;
      $("#todoId").val('')
      $("#IsCompleted").prop('checked', false)
    }
  }

  deleteToDo(t) {
    const todo: ToDo = { Id: t.Id, Title: t.Title, IsCompleted: t.IsCompleted };
    this.store.dispatch(ToDoActions.BeginDeleteToDoAction({ payload: todo }));
  }

  loadEdit(t) {
    const todo: ToDo = { Id: t.Id, Title: t.Title, IsCompleted: t.IsCompleted };
    $("#Title").val(t.Title)
    $("#IsCompleted").prop('checked', t.IsCompleted)
    $("#todoId").val(t.Id)
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}

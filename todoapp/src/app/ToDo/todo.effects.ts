import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from './todo.action';
import { ToDoHttpService } from './todo.httpservice';
import ToDo from './todo.model';

@Injectable()
export class ToDoEffects {
  constructor(private todoService: ToDoHttpService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.todoService.getToDos().pipe(
          map((data: ToDo[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.todoService.createToDos(action.payload).pipe(
          map((data: ToDo) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  DeleteToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginDeleteToDoAction),
      mergeMap(action =>
        this.todoService.deleteToDos(action.payload.Id).pipe(
          map((data: ToDo) => {
            console.log(data)
            return ToDoActions.SuccessDeleteToDoAction({ payload : action.payload });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  ); 

  UpdateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginUpdateToDoAction),
      mergeMap(action =>
        this.todoService.updateToDos(action.payload).pipe(
          map((data: ToDo) => {
            console.log(data)
            return ToDoActions.SuccessUpdateToDoAction({ payload: action.payload });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

}

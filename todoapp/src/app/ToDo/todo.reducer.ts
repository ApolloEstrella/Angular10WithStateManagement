import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from './todo.action';
import ToDo from './todo.model';
import ToDoState, { initializeState } from './todo.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  /*on(ToDoActions.GetToDoAction, state => state),
  on(ToDoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),
  on(ToDoActions.DeleteToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos.filter(state => state.Id != todo.Id)], ToDoError: null };
  }),*/

  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(ToDoActions.SuccessDeleteToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos.filter(state => state.Id != payload.Id)], ToDoError: null };
  }),
  on(ToDoActions.SuccessUpdateToDoAction, (state: ToDoState, { payload }) => {
    //const index = Number(state.ToDos.findIndex(t => t.Id === payload.Id))
    //const item = state.ToDos.find(t => t.Id === payload.Id)
    //{ [...state.ToDos][index].Title = payload.Title }  


    var x = [...state.ToDos.map((item, i) => {
      if (item.Id === payload.Id) {
        item = { ...item, Title: payload.Title, IsCompleted: payload.IsCompleted }
      }
      return item
    })]

    //var y = [...state.ToDos]

    //var x = [y.splice(index, 1, payload)]

    /* const copyOfItems = state.ToDos.map(
      i => ({ ...i, Title: payload.Title, IsCompleted: payload.IsCompleted })
    ); // create a new array of items with updated descriptions */

    // return a new copy of the state
    return {
      ...state,
      ToDos: x,
      ToDoError: null
    }

    //return { ...state, ToDos: [...state.ToDos.splice(index, 1, payload)], ToDoError: null };
  }),
  on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  return reducer(state, action);
}

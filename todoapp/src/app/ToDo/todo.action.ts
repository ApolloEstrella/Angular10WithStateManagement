import { createAction, props } from '@ngrx/store';
import ToDo from './todo.model';

/*export const GetToDoAction = createAction('[ToDo] - Get ToDo');

export const CreateToDoAction = createAction(
  '[ToDo] - Create ToDo',
  props<ToDo>()
);

export const DeleteToDoAction = createAction(
  '[ToDo] - Delete ToDo',
  props<ToDo>()
);*/

export const BeginGetToDoAction = createAction('[ToDo] - Begin Get ToDo');

export const SuccessGetToDoAction = createAction(
  '[ToDo] - Sucess Get ToDo',
  props<{ payload: ToDo[] }>()
);

export const BeginCreateToDoAction = createAction(
  '[ToDo] - Begin Create ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessCreateToDoAction = createAction(
  '[ToDo] - Sucess Create ToDo',
  props<{ payload: ToDo }>()
);

export const BeginDeleteToDoAction = createAction(
  '[ToDo] - Begin Delete ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessDeleteToDoAction = createAction(
  '[ToDo] - Sucess Delete ToDo',
  props<{ payload: ToDo }>()
);

export const BeginUpdateToDoAction = createAction(
  '[ToDo] - Begin Update ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessUpdateToDoAction = createAction(
  '[ToDo] - Sucess Update ToDo',
  props<{ payload: ToDo }>()
);

export const ErrorToDoAction = createAction('[ToDo] - Error', props<Error>());

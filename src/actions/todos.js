import { createTypes } from 'redux-compose-reducer';

export const TYPES = createTypes('todos', [
  'addTodo',
  'completeTodo',
  'removeTodo'
]);

export function addTodo(dispatch, todo) {
  return dispatch({ type: TYPES.addTodo, todo });
}

export function completeTodo(dispatch, id) {
  return dispatch({ type: TYPES.completeTodo, id });
}

export function removeTodo(dispatch, id) {
  return dispatch({ type: TYPES.removeTodo, id });
}

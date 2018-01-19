import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  items: []
};

function addTodo(state, { todo }) {
  return update.push(state, 'items', { ...todo, id: Date.now() });
}

function completeTodo(state, { id }) {
  return update(state, `items.{id:${id}}.done`, true);
}

function removeTodo(state, { id }) {
  return update.remove(state, `items.{id:${id}}`);
}

export default composeReducer(
  'todos',
  {
    addTodo,
    completeTodo,
    removeTodo
  },
  initialState
);

import { todosRef, todoStore } from "../config/firebase";
import { FETCH_TODOS } from "./types";


export const addToDo = newToDo => async dispatch => {
  todoStore.add(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
  todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
  todoStore.onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push(doc);
    });
    dispatch({
      type: FETCH_TODOS,
      payload: docs
    })
  });
};

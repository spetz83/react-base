import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo } from "../actions";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    console.log(completeToDoId);
    const { completeToDo } = this.props;
    completeToDo(completeToDoId);
  };

  render() {
    const {todoId, todo } = this.props;
    return (
      <ListItem key={todoId} dense button>
          <ListItemText primary={todo.title}/>
          <ListItemSecondaryAction>
              <Checkbox
                  onChange={() => this.handleCompleteClick(todoId)}
              />
          </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default connect(null, { completeToDo })(ToDoListItem);

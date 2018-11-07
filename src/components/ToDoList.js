import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ToDoListItem from "./ToDoListItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addToDo } = this.props;
    event.preventDefault();
    addToDo({ title: addFormValue });
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue } = this.state;
    if (addFormVisible) {
      return (
        <Card>
          <CardContent>
            <h3>New ToDo</h3>
            <form onSubmit={this.handleFormSubmit}>
              <TextField
                id="toDoNext"
                label="Title"
                value={addFormValue}
                onChange={this.handleInputChange}
                margin="normal"
              />
            </form>
          </CardContent>
        </Card>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;
    const toDos = _.map(data, (value) => {
      return <ToDoListItem key={value.id} todoId={value.id} todo={value.data()} />;
    });

    if (!_.isEmpty(toDos)) {
      return (
        <List>
          {toDos}
        </List>
      );
    }

    return (
      <div>
        <h4>You have completed all the tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchToDos();
  }

  render() {
    const { addFormVisible } = this.state;
    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderAddForm()}
          {this.renderToDos()}
        </div>
        <div>
          <Button
            variant="fab"
            color="primary"
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
          >
            {addFormVisible ? (<CloseIcon/>) : (<AddIcon/>)}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ToDoList);

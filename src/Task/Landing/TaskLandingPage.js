import React, { Component } from "react";
import TaskList from "../Listing/TaskList";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { properties } from "../../Property";

class TaskLandingPage extends Component {
  state = {
    taskState: [
      {
        id: 1,
        subject: "No task found",
        lastEntry: "NULL",
        lastEntryDate: "NULL",
      },
    ],
  };

  removeTask = (event) => {
    if (window.confirm("Are you sure you want to delete ")) {
      axios
        .delete(properties.appURL + "/tasks/" + event.target.id)
        .then((response) => {
          console.log("Task got removed");
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data.message);
        });
    }
  };

  componentDidMount() {
    let userId = this.props.match.params.userId;
    let dummyTask = {
      id: 1,
      subject: "",
      lastEntry: "",
      lastEntryDate: "",
    };
    const tasks = [];
    axios
      .get(properties.appURL + "/tasks?userId=" + userId)
      .then((response) => {
        response.data.map((x) => {
          let task = { ...dummyTask };
          task.id = x.taskId;
          task.subject = x.subject;
          task.description = x.description;
          task.lastEntryDate = x.lastEntryTimestamp;
          task.lastEntry = x.lastEntry;
          task.dataCapturingFreqType = x.dataCapturingFreqType;
          task.datatype = x.datatype;
          tasks.push(task);
          return x;
        });
        this.setState({ taskState: tasks });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <TaskList
        state={this.state}
        user={this.props.match.params.userId}
        onRemoveTask={this.removeTask}
      ></TaskList>
    );
  }
}
export default withRouter(TaskLandingPage);

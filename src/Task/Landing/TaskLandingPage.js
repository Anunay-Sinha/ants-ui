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

  componentDidMount() {
    let userId = this.props.match.params.userId;
    let dummyTask = {
      id: 1,
      subject: "",
      lastEntry: "",
      lastEntryDate: "",
    };
    const tasks = [];
    console.log(properties);
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
          console.log(task);
          tasks.push(task);
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
      ></TaskList>
    );
  }
}
export default withRouter(TaskLandingPage);

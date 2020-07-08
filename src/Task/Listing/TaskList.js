import React, { Component } from "react";
import TaskCard from "../TaskCard/TaskCard";
import classes from "./TaskList.module.css";
import { withRouter } from "react-router-dom";

class TaskList extends Component {
  onNewTask = (event) => {
    this.props.history.push("/users/" + this.props.user + "/tasks/create");
  };
  render() {
    let taskDisp = this.props.state.taskState.map((x) => {
      return <TaskCard task={x} key={x.id}></TaskCard>;
    });

    return (
      <div>
        <p className={classes.TaskHeader}>
          {this.props.location.state}'s Task List
        </p>

        <div>
          <button className={classes.AddTaskButton} onClick={this.onNewTask}>
            {console.log(this)}
            Create A New Task{" "}
          </button>
        </div>
        <div className={classes.TaskHolder}>{taskDisp}</div>
      </div>
    );
  }
}
export default withRouter(TaskList);

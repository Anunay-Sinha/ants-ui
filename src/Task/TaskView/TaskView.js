import React, { Component } from "react";
import classes from "./TaskView.module.css";
import { withRouter } from "react-router-dom";

class TaskView extends Component {
  render() {
    return (
      <div className={classes.TaskCard}>
        <div className={classes.TaskHeader}>{this.props.task.subject}</div>
        <div className={classes.TaskId}>TaskId : {this.props.task.id}</div>
        <hr></hr>
        <div className={classes.LastRecord}>
          <p>
            Last Record : {this.props.task.lastEntry} at{" "}
            {this.props.task.lastEntryDate}
          </p>
          <p>Next record due on 31 Dec 2020 </p>
        </div>
        <div>
          <button>Record Activity</button>
          <button>View Activity graph</button>
        </div>
      </div>
    );
  }
}
export default withRouter(TaskView);

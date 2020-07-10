import React, { Component } from "react";
import classes from "./TaskCard.module.css";
import { withRouter } from "react-router-dom";

class TaskCard extends Component {
  onViewActivity = () => {
    console.log(this.props);
    this.props.history.push(
      "/activity/view/" + this.props.task.id,
      this.props.task
    );
  };

  onAddActivity = () => {
    console.log(this.props);
    this.props.history.push("/activity/" + this.props.task.id, this.props.task);
  };

  dateFormatter = (dateString) => {
    let date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  render() {
    return (
      <div className={classes.TaskCard}>
        <div>
          <button
            id={this.props.task.id}
            className={classes.RemoveButton}
            onClick={this.props.onRemoveButton}
          >
            x
          </button>
        </div>
        <div className={classes.TaskHeader}>{this.props.task.subject}</div>

        <div className={classes.TaskId}>{this.props.task.description}</div>
        <hr></hr>
        <div className={classes.LastRecord}>
          {this.props.task.lastEntry != null ? (
            <div>
              <p>Last Activity : {this.props.task.lastEntry}</p>
              <p>
                Date time : {this.dateFormatter(this.props.task.lastEntryDate)}
              </p>
            </div>
          ) : (
            <div>
              <p>No Entry</p>
              <p>Available</p>
            </div>
          )}
        </div>
        <div>
          <button className={classes.Button} onClick={this.onAddActivity}>
            Record Activity
          </button>
          <button className={classes.Button} onClick={this.onViewActivity}>
            View Activities
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(TaskCard);

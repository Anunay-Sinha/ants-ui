import React, { Component } from "react";
import classes from "./Activity.module.css";

class Activity extends Component {
  dateFormatter = (dateString) => {
    let date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  render() {
    return (
      <div className={classes.ActivityCard}>
        <p className={classes.ActivityData}>
          Data : {this.props.activity.data}
        </p>
        <p>Timestamp : {this.dateFormatter(this.props.activity.timestamp)}</p>
      </div>
    );
  }
}

export default Activity;

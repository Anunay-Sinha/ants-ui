import React, { Component } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { withRouter } from "react-router-dom";
import { properties } from "../../Property";
import classes from "./AddActivity.module.css";

class AddActivity extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  postActivity = () => {
    let reqBody = {
      id: uuid(),
      data: this.state.inputValue,
      taskId: this.props.match.params.taskId,
    };
    console.log(reqBody);
    console.log(this.props.match.params.taskId);
    axios
      .post(
        properties.appURL +
          "/tasks/" +
          this.props.match.params.taskId +
          "/activities",
        reqBody
      )
      .then((response) => {
        console.log(response);
        alert(response.status);
        this.props.history.goBack();
      })
      .catch((error) => {
        console.log(error);
        alert("failed");
      });
  };

  render() {
    console.log("Add activity page");
    return (
      <div>
        <p className={classes.Header}>
          Task : {this.props.location.state.subject}
        </p>
        <div>
          <p className={classes.FieldHeader}> Add activity</p>
          <input
            className={classes.Input}
            type="text"
            name="recordText"
            onChange={this.handleChange}
            value={this.state.inputValue}
          />
        </div>
        <button className={classes.Button} onClick={this.postActivity}>
          Record Activity
        </button>
      </div>
    );
  }
}

export default withRouter(AddActivity);

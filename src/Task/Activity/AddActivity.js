import React, { Component } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { withRouter } from "react-router-dom";
import { properties } from "../../Property";
import classes from "./AddActivity.module.css";

class AddActivity extends Component {
  state = {
    inputValue: "",
    isForced: false,
    inputDate: "",
  };

  handleCheckInputChange = (event) => {
    this.setState({ isForced: event.target.checked });
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleDateChange = (event) => {
    this.setState({ inputDate: event.target.value });
  };

  postActivity = () => {
    let reqBody = {
      id: uuid(),
      data: this.state.inputValue,
      taskId: this.props.match.params.taskId,
      forced: this.state.isForced,
    };
    if (this.state.isForced) {
      reqBody.timestamp = this.state.inputDate;
    }
    console.log("request body for post activity");
    console.log(reqBody);
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
    return (
      <div>
        <p className={classes.Header}>
          Task : {this.props.location.state.subject}
        </p>
        <div>
          <p className={classes.FieldHeader}> Add activity</p>
          <div>
            <input
              className={classes.Input}
              type="text"
              name="recordText"
              onChange={this.handleChange}
              value={this.state.inputValue}
            />
          </div>
          <div>
            {this.state.isForced ? (
              <input
                className={classes.Input}
                type="datetime-local"
                name="recordDateTime"
                onChange={this.handleDateChange}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <p>Add activity for custom date</p>
            <input
              type="checkbox"
              name="forced"
              onChange={this.handleCheckInputChange}
            />
          </div>
        </div>
        <button className={classes.Button} onClick={this.postActivity}>
          Record Activity
        </button>
      </div>
    );
  }
}

export default withRouter(AddActivity);

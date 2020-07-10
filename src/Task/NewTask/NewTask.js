import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { properties } from "../../Property";
import classes from "./NewTask.module.css";

class NewTask extends Component {
  state = {
    subject: "",
    descr: "",
    dataType: "INTEGER",
    dataCapturingFreqType: "NA",
  };

  handleChange = (event) => {
    let tempStateObj = {};
    tempStateObj[event.target.name] = event.target.value;
    this.setState(tempStateObj);
  };

  createTask = () => {
    if (
      this.state.subject !== "" &&
      this.state.descr !== "" &&
      this.state.dataType !== "" &&
      this.state.dataCapturingFreqType !== ""
    ) {
      console.log("We are good");
    } else {
      console.log("All data not available for task");
      alert("all data is not available");
      return;
    }
    let reqBody = {
      userId: this.props.match.params.userId,
      subject: this.state.subject,
      description: this.state.descr,
      datatype: this.state.dataType,
      dataCapturingFreqType: this.state.dataCapturingFreqType,
    };
    axios
      .post(properties.appURL + "/tasks", reqBody)
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
          Create a new task for {this.props.match.params.userId}
        </p>

        <div className={classes.ContainerDiv}>
          <div className={classes.FieldHeader}>Subject</div>
          <input
            className={classes.Input}
            type="text"
            name="subject"
            onChange={this.handleChange}
          />
        </div>

        <div className={classes.ContainerDiv}>
          <p className={classes.FieldHeader}>Description</p>
          <input
            className={classes.Input}
            type="text"
            name="descr"
            onChange={this.handleChange}
          />
        </div>

        <div className={classes.ContainerDiv}>
          <p className={classes.FieldHeader}>DataType</p>
          <select
            className={classes.Input}
            onChange={this.handleChange}
            name="dataType"
          >
            <option>INTEGER</option>
            <option>STRING</option>
            <option>BOOLEAN</option>
          </select>
        </div>

        <div className={classes.ContainerDiv}>
          <p className={classes.FieldHeader}>Data Capturing Frequency </p>
          <select
            className={classes.Input}
            onChange={this.handleChange}
            name="dataCapturingFreqType"
          >
            <option>NA</option>
            <option>DAILY</option>
            <option>WEEKLY</option>
            <option>MONTHLY</option>
            <option>YEARLY</option>
          </select>
        </div>
        <button className={classes.Button} onClick={this.createTask}>
          Create Task
        </button>
      </div>
    );
  }
}

export default withRouter(NewTask);

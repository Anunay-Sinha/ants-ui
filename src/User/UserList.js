import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { properties } from "../Property";
import classes from "./UserList.module.css";

class UserList extends Component {
  state = {
    userList: [],
    selectedUser: "",
    selectedUserName: "",
  };

  onTaskListClick = (event) => {
    console.log(this.state);
    if (this.state.selectedUser === "" || this.state.selectedUser === "null") {
      console.log("selection not possible for null user");
    } else {
      this.props.history.push(
        "/users/" + this.state.selectedUser + "/tasks",
        this.state.selectedUserName
      );
    }
  };

  onSelection = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    var username = event.nativeEvent.target[index].text;
    this.setState({ selectedUserName: username });
    this.setState({ selectedUser: event.target.value });
  };

  componentDidMount() {
    const users = [];
    axios
      .get(properties.appURL + "/users")
      .then((response) => {
        response.data.content.map((x) => {
          users.push(x);
        });
        console.log(users);
        this.setState({ userList: users });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  render() {
    let listusers = this.state.userList.map((user) => {
      return <div>User : {user.username}</div>;
    });

    return (
      <div>
        <p className={classes.UserHeader}>User Selector</p>
        <select className={classes.Select} onChange={this.onSelection}>
          <option key="0" value="null">
            Select User
          </option>
          {this.state.userList.map((user) => (
            <option key={user.username} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>
        <div>
          <button className={classes.Button} onClick={this.onTaskListClick}>
            Goto task list
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(UserList);

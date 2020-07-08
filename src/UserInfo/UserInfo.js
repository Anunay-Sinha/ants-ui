import React, { Component } from "react";

class UserInfo extends Component {
  render() {
    return (
      <div>
        <p>Welcome DA!</p>
        <p>{this.props.children}</p>
        <p>Rating : 10</p>
      </div>
    );
  }
}

export default UserInfo;

import React from "react";
import "./App.css";
import UserInfo from "./UserInfo/UserInfo";
import TaskLandingPage from "./Task/Landing/TaskLandingPage";
import { Route } from "react-router-dom";
import TaskView from "./Task/TaskView/TaskView";
import AddActivity from "./Task/Activity/AddActivity";
import ViewActivities from "./Task/Activity/ViewActivities";
import UserList from "./User/UserList";
import NewTask from "./Task/NewTask/NewTask";

function App() {
  const state = {
    taskState: [
      {
        id: 1,
        subject: "Weight check",
        lastEntry: "72",
        lastEntryDate: "11 Jun 2020",
      },
      {
        id: 2,
        subject: "Walking",
        lastEntry: "5Km",
        lastEntryDate: "11 Jun 2020",
      },
    ],
  };
  return (
    <div className="App">
      <Route path="/" exact component={UserList} />
      <Route path="/users/:userId/tasks" exact component={TaskLandingPage} />
      <Route
        path="/taskView"
        exact
        render={() => <TaskView task={state.taskState[0]}></TaskView>}
      />
      <Route path="/activity/:taskId" exact component={AddActivity} />
      <Route path="/activity/view/:id" exact component={ViewActivities} />
      <Route path="/users/:userId/tasks/create" exact component={NewTask} />
    </div>
  );
}

export default App;

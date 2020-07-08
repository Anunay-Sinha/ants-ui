import React, { Component } from "react";
import axios from "axios";
import Activity from "./Activity";
import { withRouter } from "react-router-dom";
import { properties } from "../../Property";
import classes from "./ViewActivities.module.css";
import { Line, Bar } from "react-chartjs-2";

class ViewActivities extends Component {
  state = {
    activities: [],
    lineData: {
      labels: [0, 1, 2, 3, 4],
      datasets: [
        {
          data: [0, 1, 2, 3, 4],
        },
      ],
    },
  };

  componentDidMount() {
    console.log(this);
    let taskID = this.props.match.params.id;
    this.getActivity(taskID, 10);
  }

  dateFormatter = (dateString) => {
    let date = new Date(dateString);
    return date.toLocaleDateString();
  };

  getActivity = (taskId, count) => {
    const activityList = [];
    const labelData = [];
    let dummyActivity = {
      id: "1",
      data: "1",
      timestamp: "1",
    };
    let url =
      properties.appURL +
      "/tasks/" +
      taskId +
      "/activities?page=0&size=" +
      properties.activity_records_to_be_displayed;
    console.log(url);
    const activityEntryData = [];
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          response.data.content.map((x) => {
            let activity = { ...dummyActivity };
            activity.id = x.id;
            activity.data = x.data;
            activity.timestamp = x.timestamp;
            activityList.push(activity);
            labelData.push(this.dateFormatter(x.timestamp));
            activityEntryData.push(x.data);
          });
          const lineData = {
            labels: labelData,
            datasets: [
              {
                label: "Datapoints",
                data: activityEntryData,
                pointBackgroundColor: "#1abc9c",
                fill: false,
                borderColor: "#9aeedc",
              },
            ],
          };
          this.setState({ lineData });
          this.setState({ activities: activityList });
        } else {
          alert("Could not fetch data");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Could not get data for task id " + taskId);
      });
  };

  displayActivityList = () => {
    let activityDisp = this.state.activities.map((x) => {
      return <Activity activity={x} key={x.id}></Activity>;
    });

    return <div className={classes.ActivityList}>{activityDisp}</div>;
  };

  displayLineChart = () => {
    return (
      <div>
        <div>
          <Line data={this.state.lineData} />
          {this.displayActivityList()}
        </div>
      </div>
    );
  };

  displayNoData = () => {
    return (
      <div>
        <p>No activity available for the task</p>
      </div>
    );
  };

  displayData = () => {
    switch (this.props.location.state.datatype) {
      case "INTEGER":
        return <div>{this.displayLineChart()}</div>;
      case "DECIMAL":
        return <div>{this.displayLineChart()}</div>;
      case "STRING":
        return <div>{this.displayActivityList()}</div>;
      default:
        return <div>{this.displayActivityList()}</div>;
    }
  };

  render() {
    return (
      <div>
        <p className={classes.ActivityHeader}>
          Activity List for {this.props.location.state.subject}
        </p>

        {this.state.activities.length === 0
          ? this.displayNoData()
          : this.displayData()}
      </div>
    );
  }
}

export default withRouter(ViewActivities);

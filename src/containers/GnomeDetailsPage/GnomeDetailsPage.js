import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import * as actions from "../../store/actions/gnomeActions";
import LineChart from "../../components/LineChart";



const GnomeDetailsPage = ({ gnomes }) => {
  const colors = ["#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff"];
  const { id } = useParams();
  var timeLabels = [];
  var gnome;
  var light = [];
  var soil_humidity = [];
  var temperature = [];
  if (typeof gnomes != "undefined") {
    console.log(gnomes[id].data);
    gnome = gnomes[id].data;
    //timeLabels = Object.keys(gnome);
    for (let [key, properties] of Object.entries(gnome)) {
      timeLabels.push(timeConverter(key));
      light.push(properties.light);
      soil_humidity.push(properties.soil_humidity);
      temperature.push(properties.temperature);
    }
  }

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Gnome Dashboard</title>
      </Helmet>
      <h1 className="page__title text-center">Gnome Dashboard</h1>
      <div className="w-100 text-center mt-3">
						<button
							type="button"
							className="col-4 btn btn-primary"
						>
							Turn Hose On
						</button>
      </div>
      {typeof gnomes != "undefined" && (
        <div className="row">
          <LineChart
            data={light}
            labels={timeLabels}
            label={"Light"}
            borderColor={"#00b4bd"}
          />
        </div>
      )}
      {typeof gnomes != "undefined" && (
        <div className="row">
          <LineChart
            data={soil_humidity}
            labels={timeLabels}
            label={"Soil humidity"}
            borderColor={"#ff562a"}
          />
        </div>
      )}
      {typeof gnomes != "undefined" && (
        <div className="row">
          <LineChart
            data={temperature}
            labels={timeLabels}
            label={"Temperature"}
            borderColor={"#5610f2"}
          />
        </div>
      )}
    </div>
  );
};

function timeConverter(UNIX_timestamp) {
  var a = new Date(parseInt(UNIX_timestamp, 10));
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
const mapStateToProps = ({ firebase, firestore }) => {
  let user =
    firestore.data.users &&
    firestore.data.gnomes &&
    Object.values(firestore.data.users)[0];
  return {
    userId: firebase.auth.uid,
    gnomes:
      user &&
      Object.keys(user.gnomes).map(i => ({
        ...firestore.data.gnomes[i],
        properties: user.gnomes[i]
      }))
  };
};
const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => ["gnomes", `users/${props.userId}`])
)(GnomeDetailsPage);

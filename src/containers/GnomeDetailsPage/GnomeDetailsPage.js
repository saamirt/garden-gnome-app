import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import * as actions from "../../store/actions/gnomeActions";
import LineChart from "../../components/LineChart";

import "./style.scss";

const GnomeDetailsPage = ({ gnome, editGnomeHose, loading, error }) => {
  //const colors = ["#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff"];
  const { id } = useParams();
  let timeLabels = [];
  let unixDate = [];
  let light = [];
  let soil_humidity = [];
  let temperature = [];
  let isHoseOn = false;
  if (typeof gnome != "undefined") {
    isHoseOn = gnome.hose.hose;
    
    Object.keys(gnome.data).sort().forEach(function(key){
      unixDate.push(new Date(parseInt(key, 10)));
      timeLabels.push(unixDate[unixDate.length - 1].toDateString());
      light.push(gnome.data[key].light);
      soil_humidity.push(gnome.data[key].soil_humidity);
      temperature.push(gnome.data[key].temperature);
    });
    let lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth()-1);
    let i = unixDate.findIndex(day => day>lastMonth);
    timeLabels  = timeLabels.slice(i);
    light   = light.slice(i);
    soil_humidity = soil_humidity.slice(i);
    temperature = temperature.slice(i);
  }
  const turnHoseOn = async (event) =>{
    let hose = {hose:true, water_time:1};
    await editGnomeHose(id, hose).then(() => {
      if (error) {
        console.error("Error Editing Gnome Hose", error)
      }
    });
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
              className="col-4 btn btn-primary gnome_hose_button"
              onClick={turnHoseOn}
              disabled={loading || isHoseOn}
						>
              {(loading || isHoseOn)?"Hose is On": "Turn Hose On"}
						</button>
      </div>
      {typeof gnome != "undefined" && (
        <div className="row">
          <LineChart
            data={light}
            labels={timeLabels}
            label={"Light"}
            borderColor={"#00b4bd"}
          />
        </div>
      )}
      {typeof gnome != "undefined" && (
        <div className="row">
          <LineChart
            data={soil_humidity}
            labels={timeLabels}
            label={"Soil humidity"}
            borderColor={"#ff562a"}
          />
        </div>
      )}
      {typeof gnome != "undefined" && (
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
  let a = new Date(parseInt(UNIX_timestamp, 10));
  let months = [
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
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
const mapStateToProps = ({ firebase, firestore, gnomes }, props) => {
  let user =
    firestore.data.users &&
    firestore.data.gnomes &&
    Object.values(firestore.data.users)[0];
  let hose = gnomes.editGnomeHose;
  let { id } = props.match.params;
  return {
    userId: firebase.auth.uid,
    gnome:
      user &&
      {
        ...firestore.data.gnomes[id],
        properties: user.gnomes[id]
      },
    loading: hose.loading,
    error: hose.error
  };
};
const mapDispatchToProps = {
	editGnomeHose: actions.editGnomeHose,
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => ["gnomes", `users/${props.userId}`])
)(GnomeDetailsPage);

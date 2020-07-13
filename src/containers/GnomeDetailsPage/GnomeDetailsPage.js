import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import * as actions from "../../store/actions/gnomeActions";
import LineChart from "../../components/LineChart";

import "./style.scss";

const GnomeDetailsPage = ({ gnomes, editGnomeHose, loading, error }) => {
  //const colors = ["#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff"];
  const { id } = useParams();
  let timeLabels = [];
  let gnome = {};
  let light = [];
  let soil_humidity = [];
  let temperature = [];
  let accu = 0;
  let accu_amount = 10;
  let isHoseOn = false;
  if (typeof gnomes != "undefined") {
    //console.log(gnomes);
    gnome = gnomes[id];
    isHoseOn = gnome.hose.hose;
    //console.log(isHoseOn);
    //timeLabels = Object.keys(gnome);
    Object.keys(gnome.data).sort().forEach(function(key){
      timeLabels.push(timeConverter(key));
      light.push(gnome.data[key].light);
      soil_humidity.push(gnome.data[key].soil_humidity);
      temperature.push(gnome.data[key].temperature);
    });
    // for (let [key, properties] of Object.entries(gnome.data)) {
    //   timeLabels.push(timeConverter(key));
    //   light.push(properties.light);
    //   soil_humidity.push(properties.soil_humidity);
    //   temperature.push(properties.temperature);
      // if(accu === 0){
      //   if(timeLabels.length > 0){
      //     light.push(light.pop()/accu_amount);
      //     soil_humidity.push(soil_humidity.pop() /accu_amount);
      //     temperature.push(temperature.pop() /accu_amount);
      //   }
      //   timeLabels.push(timeConverter(key));
      //   light.push(properties.light);
      //   soil_humidity.push(properties.soil_humidity);
      //   temperature.push(properties.temperature);
      // }else if(accu < accu_amount){
      //   light.push(light.pop()+properties.light);
      //   soil_humidity.push(soil_humidity.pop() + properties.soil_humidity);
      //   temperature.push(temperature.pop() + properties.temperature);
      // }
      // accu++;
      // accu = (accu === accu_amount)? 0: accu;
    // }
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
const mapStateToProps = ({ firebase, firestore, gnomes }) => {
  let user =
    firestore.data.users &&
    firestore.data.gnomes &&
    Object.values(firestore.data.users)[0];
  let hose = gnomes.editGnomeHose;
  return {
    userId: firebase.auth.uid,
    gnomes:
      user &&
      Object.keys(user.gnomes).map(i => ({
        ...firestore.data.gnomes[i],
        properties: user.gnomes[i]
      })),
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

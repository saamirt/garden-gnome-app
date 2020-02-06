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
  var timeLabels;
  var gnome;
  var light = [];
  var soil_humidity = [];
  var temperature = [];
  if (typeof gnomes != "undefined") {
    console.log(gnomes[id].data);
    gnome = gnomes[id].data;
    timeLabels = Object.keys(gnome);
    for (let [key, properties] of Object.entries(gnome)) {
      light.push(properties.light);
      soil_humidity.push(properties.soil_humidity);
      temperature.push(properties.temperature);
    }
  }

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Gnome data</title>
      </Helmet>
      <h1 className="page__title text-center">Gnome data</h1>

      {typeof gnomes != "undefined" && (
        <div className="row">
		  <LineChart 
			  data={light}
			  labels={timeLabels} 
			  label={"Light"} 
		  />
        </div>
      )}
	  {/* {typeof gnomes != "undefined" && (
        <div className="row">
		  <LineChart
            data={soil_humidity}
            labels={timeLabels}
            label={"Soil humidity"}
          />
        </div>
      )} */}
	  
          {/* <LineChart
            data={temperature}
            labels={timeLabels}
            label={"Temperature"}
          /> */}
    </div>
  );
};

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

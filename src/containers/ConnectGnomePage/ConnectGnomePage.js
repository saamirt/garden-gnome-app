import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import {useLocation, useHistory} from "react-router-dom";
import * as actions from "../../store/actions/gnomeActions";

import "./style.scss";

//makes setting and disappearing the success message thread-safe.
//prevents setting success to false while other calls are still going on
//let semaphore = 0;

const ConnectGnomePage = ({ userId, loading, error }) => {
	const [success, setSuccess] = useState(false);
	const [gnomeSetupLoading, setGnomeSetupLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    let gnomeId = location.state.id;


    
    const handleSubmit = async event => {
        setSuccess(true);
		if (event.origin.startsWith('http://192.168.4.1')) { 
            if(event.data === 'Network Saved'){
                history.push('/gnome/'+gnomeId, {id:gnomeId});
                window.removeEventListener('message', handleSubmit);
            }
        }
        console.groupEnd();
    };
    
    const handleHideLoader = _e =>{
        setGnomeSetupLoading(false);
        window.addEventListener('message', handleSubmit);
    };

	useEffect(() => {
		const iframe = document.getElementsByTagName("iframe")[0];
		if(iframe){
			iframe.contentWindow.postMessage({gnomeId, userId},'http://192.168.4.1/wifi');
			console.log("sent gnome id")
		}		
    });
	

	return (
		<div className="container mt-5">
			<Helmet>
				<title>Connect Gnome</title>
				<meta
					name="description"
					content="A React.js Boilerplate application"
				/>
			</Helmet>
			{error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : success ? (
				<div className="alert alert-primary" role="alert">
					New gnome Connected!
				</div>
			) : null}
			<div className="card p-5">
				<h1 id="connect-Gnome-Page" className="text-center">Connect Gnome</h1>
				<p>Please turn on your gnome and go to your wifi settings to connect to GnomeAutoConnectAP</p>
                <div className="row-center gnomeSetupWrapper">
					{gnomeSetupLoading ? (
						<Loader />	
					) : null}
				</div>
				<iframe 
					className="row-center"
					src="http://192.168.4.1/wifi?" 
					title="Gnome Access Point"
                    onLoad={handleHideLoader}
                    height={gnomeSetupLoading?0:480}
				>
				</iframe>
				{/* {(error || success) && (
					<small id="formError" className="form-text text-muted mt-3">
						{error || "Successfully added a new item!"}
					</small>
				)} */}
			</div>
		</div>
	);
};

const mapStateToProps = ({ firebase, gnomes }) => {
	return {
        userId: firebase.auth.uid,
		loading: gnomes.addGnome.loading,
		error: gnomes.addGnome.error
	};
};

const mapDispatchToProps = {
	addGnome: actions.addGnome,
	editGnomeAction: actions.editGnome
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectGnomePage);

import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/layout/Dashboard';
import Gnome from './components/gnomes/Gnome';
import Footer from './components/layout/Footer';

import './App.css';
import backgroundImg from './assets/bg-white-01.jpg';
//import backgroundImg from './assets/bg-green.jpg';
//import backgroundImg from './assets/bg-light.jpg';
//import backgroundImg from './assets/Artboard-1.png';
import NavBar from './components/layout/NavBar';
//import backgroundImg from './assets/bg.jpg';

class App extends Component {
	render() {
		return (
			<Router>
				<div
					className="App"
					style={{ backgroundImage: `url(${backgroundImg})` }}
				>
					{//<NavBar />
					}
					<div className="container">
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route
								exact
								path="/gnome/:gnomeindex"
								component={Gnome}
							/>
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;

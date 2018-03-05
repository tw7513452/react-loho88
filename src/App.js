import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './style/App.scss';
import Shouye from './components/Shouye';
import GoodList from './components/GoodList';
import GoodRegister from './components/GoodRegister';






class App extends Component {

	render() {
		return(
			<Router>
				<div className="App">
			        <Link to="/"></Link>
			        <Link to="/goodList"></Link>
			        <Link to="/goodRegister"></Link>
			
			        <Route exact path="/" component={Shouye} />
			        <Route path="/goodList/:fid/:fit" component={GoodList} />
			        <Route path="/goodRegister/:fidReg" component={GoodRegister} />
		        </div>
			</Router>
		)
	}
}

export default App;

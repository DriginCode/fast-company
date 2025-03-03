import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
	return (
		<main className="container">
			<NavBar />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route path="/login" component={Login} />
				<Route path="/users/:userId?/" component={Users} />
				<Redirect to="/" />
			</Switch>
		</main>
	);
};

export default App;

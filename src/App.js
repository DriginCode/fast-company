import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
	return (
		<main className="container">
			<NavBar />
			<Switch>
				<Route path="/users/:userId?/:edit?" component={Users} />
				<Route path="/login/:type?" component={Login} />
				<Route exact path="/" component={Main} />
				<Redirect to="/" />
			</Switch>
		</main>
	);
};

export default App;

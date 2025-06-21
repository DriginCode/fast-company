import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessons";
import { QualityProvider } from "./hooks/useQualities";

const App = () => {
	return (
		<main className="container">
			<NavBar />
			<QualityProvider>
				<ProfessionProvider>
					<Switch>
						<Route path="/users/:userId?/:edit?" component={Users} />
						<Route path="/login/:type?" component={Login} />
						<Route exact path="/" component={Main} />
						<Redirect to="/" />
					</Switch>
				</ProfessionProvider>
			</QualityProvider>
			<ToastContainer />
		</main>
	);
};

export default App;

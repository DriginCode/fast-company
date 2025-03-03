import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
	const history = useHistory();
	const [user, setUser] = useState();
	useEffect(() => {
		api.users.getById(userId).then((data) => setUser(data));
	});

	const handleClick = () => {
		history.push("/users");
	};

	if (user) {
		return (
			<div>
				<h1>{user.name}</h1>
				<h2>Профессия: {user.profession.name}</h2>
				<QualitiesList qualities={user.qualities} />
				<p>Completed meetings: {user.completedMeetings}</p>
				<h1>Rate: {user.rate}</h1>

				<button onClick={handleClick} className="btn btn-primary">
					Все пользователи
				</button>
			</div>
		);
	} else {
		return <h1>Loading...</h1>;
	}
};

UserPage.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserPage;

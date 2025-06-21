import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
	const params = useParams();
	const { userId, edit } = params;

	return (
		<>
			<UserProvider>
				{userId ? (
					edit ? (
						<EditUserPage />
					) : (
						<UserPage userId={userId} />
					)
				) : (
					<UsersListPage />
				)}
			</UserProvider>
		</>
	);
};

export default Users;

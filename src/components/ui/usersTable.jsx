import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({
	users,
	onSort,
	selectedSort,
	onToggleBookMark,
	onDelete,
	...rest
}) => {
	const columns = {
		index: { name: "#" },
		name: {
			path: "name",
			name: "Имя",
			component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
		},
		qualities: {
			name: "Качества",
			component: (user) => <Qualities qualities={user.qualities} />,
		},
		profession: {
			name: "Профессия",
			component: (user) => <Profession id={user.profession} />,
		},
		completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
		rate: { path: "rate", name: "Оценка" },
		bookmark: {
			path: "bookmark",
			name: "Избранное",
			component: (user) => (
				<Bookmark
					status={user.bookmark}
					onClick={() => onToggleBookMark(user._id)}
				/>
			),
		},
		delete: {
			component: (user) => (
				<button onClick={() => onDelete(user._id)} className="btn btn-danger">
					Delete
				</button>
			),
		},
	};

	return (
		<Table
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}
		>
			{/* [КП] Извлечение таблицы и рефакторинг https://lk.result.school/pl/teach/control/lesson/view?id=253585220 пример реализации с children */}
		</Table>
	);
};

UserTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	onToggleBookMark: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default UserTable;

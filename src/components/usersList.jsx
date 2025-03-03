import React, { useState, useEffect } from "react";
import api from "../api";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _, { set } from "lodash";

const UsersList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [professions, setProfessions] = useState();
	const [searchQuery, setSearchQuery] = useState();
	const [selectedProf, setSelectedProf] = useState("");
	const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
	const pageSize = 8;

	const [users, setUsers] = useState();

	useEffect(() => {
		api.users.fetchAll().then((data) => setUsers(data));
	}, []);

	const handleDelete = (userId) => {
		setUsers(users.filter((user) => user._id !== userId));
	};

	const handleToggleBookMark = (userId) => {
		setUsers(
			users.map((user) => {
				if (user._id === userId) {
					user.bookmark = !user.bookmark;
				}
				return user;
			})
		);
	};

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedProf, searchQuery]);

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};

	const handleProfessionSelect = (item) => {
		setSelectedProf(item);
		if (searchQuery !== "") {
			setSearchQuery("");
		}
	};

	const handleSearchQuery = ({ target }) => {
		setSelectedProf(undefined);
		setSearchQuery(target.value);
	};

	const handleSort = (item) => {
		setSortBy(item);
	};

	if (users) {
		const filteredUsers = searchQuery
			? users.filter((user) =>
					user.name.toLowerCase().includes(searchQuery.toLowerCase())
			  )
			: selectedProf
			? users.filter(
					(user) =>
						JSON.stringify(user.profession) === JSON.stringify(selectedProf)
			  )
			: users;
		const itemsCount = filteredUsers.length;

		const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

		const userCrop = paginate(sortedUsers, currentPage, pageSize);
		const clearFilter = () => {
			setSelectedProf();
		};

		return (
			<div className="d-flex">
				{professions && (
					<div className="d-flex flex-column flex-shrink-0 p-3">
						<GroupList
							selectedItem={selectedProf}
							items={professions}
							onItemSelect={handleProfessionSelect}
						/>
						<button onClick={clearFilter} className="btn btn-secondary mt-2">
							Очистить
						</button>
					</div>
				)}
				<div className="d-flex flex-column">
					<SearchStatus length={itemsCount} />
					<input
						class="form-control me-2"
						type="search"
						name="searchQuery"
						placeholder="Введите запрос"
						onChange={handleSearchQuery}
						aria-label="Search"
						value={searchQuery}
					></input>
					{itemsCount > 0 && (
						<UsersTable
							users={userCrop}
							onSort={handleSort}
							selectedSort={sortBy}
							onDelete={handleDelete}
							onToggleBookMark={handleToggleBookMark}
						/>
					)}
					<div className="d-flex justify-content-center">
						<Pagination
							itemsCount={itemsCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		);
	}
	return "Loading...";
};

UsersList.propTypes = {
	users: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
	onToggleBookMark: PropTypes.func.isRequired,
};

export default UsersList;

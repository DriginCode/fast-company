import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
	const handleSort = (item) => {
		onSort({
			path: item,
			order: selectedSort.order === "asc" ? "desc" : "asc",
		});
	};

	const renderSortArrow = (selectedSort, currentPath) => {
		if (selectedSort.path !== currentPath) return null;
		if (selectedSort.order === "asc")
			return <i className="bi bi-caret-up-fill"></i>;
		return <i className="bi bi-caret-down-fill"></i>;
	};

	return (
		<thead>
			<tr>
				{Object.keys(columns).map((column) => (
					<th
						key={column}
						onClick={
							columns[column].path
								? () => handleSort(columns[column].path) //если есть path, то вызываем функцию handleSort
								: undefined
						}
						scope="col"
						{...{ role: columns[column].path && "button" }} //распаковывает объект в атрибуты и можно использовать для нескольких атрибутов
						// role={columns[column].path ? "button" : undefined} аналогично, работает для одного атрибута
					>
						{columns[column].name}
						{/* {columns[column].path && (
							<i
								className={
									selectedSort.path === columns[column].path
										? selectedSort.order === "asc"
											? "bi bi-caret-up-fill"
											: "bi bi-caret-down-fill"
										: ""
								}
							></i>
						)} */}

						{renderSortArrow(selectedSort, columns[column].path)}
					</th>
				))}

				{/* <th scope="col">#</th>
				<th onClick={() => handleSort()} scope="col">
					Имя
				</th>
				<th scope="col">Качества</th>
				<th onClick={() => handleSort("profession.name")} scope="col">
					Профессия
				</th>
				<th onClick={() => handleSort("completedMeetings")} scope="col">
					Встретился, раз
				</th>
				<th onClick={() => handleSort("rate")} scope="col">
					Оценка
				</th>
				<th onClick={() => handleSort("bookmark")} scope="col">
					Избранное
				</th>
				<th></th> */}
			</tr>
		</thead>
	);
};

TableHeader.propTypes = {
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
};

export default TableHeader;

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
	const renderContent = (item, column, index) => {
		if (columns[column].name === "#") {
			return index + 1; // Если это порядковый номер, возвращаем индекс + 1
		}

		if (columns[column].component) {
			const component = columns[column].component; // Если указан компонент, сохраняем его в переменную
			if (typeof component === "function") {
				return component(item); // Если компонент функция, вызываем его
			}
			return component; // Если указан компонент, возвращаем его
		}

		return _.get(item, columns[column].path); // Если ничего из вышеуказанного не выполнено, берём значение из path
	};

	return (
		<tbody>
			{data.map((item, index) => (
				<tr key={item._id}>
					{Object.keys(columns).map((column) => (
						<td key={column}>
							{renderContent(item, column, index)}

							{/* Этот код отображает строку таблицы для каждого элемента в массиве данных.
                  Для каждого столбца он проверяет, определен ли пользовательский компонент в объекте columns.
                  Если пользовательский компонент определен, он отображает этот компонент.
                  В противном случае он извлекает значение из объекта item, используя путь, указанный в объекте columns. */}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.object.isRequired,
};

export default TableBody;

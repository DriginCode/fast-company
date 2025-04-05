import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
	const renderPhrase = (number) => {
		const lastTwoDigits = number % 100;
		const lastDigit = number % 10;

		// Числа от 11 до 14
		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			return "человек тусанёт";
		}
		// Остальные числа
		if (lastDigit === 1) {
			return "человек тусанёт";
		}
		if (lastDigit >= 2 && lastDigit <= 4) {
			return "человека тусанут";
		}
		return "человек тусанёт";
	};
	return (
		<h3>
			<span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
				{length > 0
					? `${length + " " + renderPhrase(length)} с тобой сегодня`
					: "Никто с тобой не тусанет"}
			</span>
		</h3>
	);
};

SearchStatus.propTypes = {
	length: PropTypes.number.isRequired,
};

export default SearchStatus;

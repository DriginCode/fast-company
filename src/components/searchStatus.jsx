import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ countUsers }) => {
    const renderPhrase = (countUsers) => {
        const phrase = [
            "человек тусанёт с тобой сегодня",
            "человека тусанут с тобой сегодня",
            "Никто с тобой не тусанёт"
        ];

        countUsers = Math.abs(countUsers) % 100;
        const num = countUsers % 10;
        if (countUsers > 10 && countUsers < 20) return countUsers + " " + phrase[0];
        if (num > 1 && num < 5) return countUsers + " " + phrase[1];
        if (num === 1) return countUsers + " " + phrase[0];
        if (countUsers === 0) return phrase[2];
        return countUsers + " " + phrase[0];
    };

    return (
        <h3>
            <span
                className={
                    "badge bg-" + (countUsers > 0 ? "primary" : "danger")
                }
            >
                {renderPhrase(countUsers)}
            </span>
        </h3>
    );
};

SearchStatus.propTypes = {
    countUsers: PropTypes.number.isRequired
};

export default SearchStatus;

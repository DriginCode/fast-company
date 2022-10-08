import React from "react";

const SearchStatus = (props) => {

    const renderPhrase = (number) => {
        const phrase = ['человек тусанёт с тобой сегодня', 'человека тусанут с тобой сегодня', 'Никто с тобой не тусанёт'];

        number = Math.abs(number) % 100;
        let num = number % 10;
        if (number > 10 && number < 20) return number + ' ' + phrase[0];
        if (num > 1 && num < 5) return number + ' ' + phrase[1];
        if (num === 1) return number + ' ' + phrase[0];
        if (number === 0) return phrase[2];
        return number + ' ' + phrase[0];
    }

    return (
        <h3><span className={"badge bg-" + (props.number > 0 ? "primary" : "danger")}>{renderPhrase(props.number)}</span></h3>
    )
}

export default SearchStatus;
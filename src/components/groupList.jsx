import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    const isArray = Array.isArray(items);
    let itemsArray = [];

    if (isArray) {
        itemsArray = items;
    } else {
        let index = 0;
        itemsArray = Object.keys(items).reduce((newArray, key) => {
            newArray[index] = items[key];
            index++;
            return newArray;
        }, []);
    }

    return (
        <ul className="list-group">
            {itemsArray.map((item) => (
                <li key={item[valueProperty]}
                    className={"list-group-item" + (item === selectedItem ? " active" : "")}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item[contentProperty]}
                </li>
            ))
            }
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;

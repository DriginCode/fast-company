import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmarkStatus, ...rest }) => {
    return (
        <button type="button" className="btn" {...rest}>
            <i
                className={
                    "bi " +
                    (bookmarkStatus ? "bi-bookmark-plus-fill" : "bi-bookmark")
                }
            ></i>
        </button>
    );
};

Bookmark.propTypes = {
    bookmarkStatus: PropTypes.bool.isRequired
};

export default Bookmark;

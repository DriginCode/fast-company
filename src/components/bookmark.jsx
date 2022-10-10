import React from "react";

const Bookmark = ({ bookmarkStatus, ...rest }) => {

    return (<button type="button" className="btn" {...rest} >
        <i className={"bi " + (bookmarkStatus ? "bi-bookmark-plus-fill" : "bi-bookmark")}></i>
    </button>)
}

export default Bookmark;
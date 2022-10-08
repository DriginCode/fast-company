import React from "react";

const Bookmark = (props) => {

    return <i className={"bi " + (props.bookmarkState ? "bi-bookmark-plus-fill" : "bi-bookmark")}></i>
}

export default Bookmark;
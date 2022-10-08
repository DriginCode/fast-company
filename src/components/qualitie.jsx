import React from "react";

const Qualitie = (props) => {
    return (
        <span key={props._id} className={"m-1 badge bg-" + props.color}>{props.name}</span>
    )
}

export default Qualitie;
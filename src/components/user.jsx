import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>
                {props.qualities.map(qualitie => (
                    <Qualitie key={qualitie._id} {...qualitie} />
                ))}
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}</td>
            <td><button type="button" className="btn" onClick={() => props.onHandleBoomark(props._id)}><i className={"bi " + (props.bookmark ? "bi-bookmark-plus-fill" : "bi-bookmark")}></i></button></td>
            <td><button type="button" className="btn btn-danger" onClick={() => props.onHandleDelete(props._id)}>Delete</button></td>
        </tr>
    );
}

export default User;
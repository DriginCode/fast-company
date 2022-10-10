import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({ _id, name, qualities, profession, completedMeetings, rate, bookmark, onHandleUserDelete, onHandleToggleBoomark }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(qualitie => (
                    <Qualitie key={qualitie._id} {...qualitie} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td><Bookmark onClick={() => onHandleToggleBoomark(_id)} bookmarkStatus={bookmark} /></td>
            <td><button type="button" className="btn btn-danger" onClick={() => onHandleUserDelete(_id)}>Delete</button></td>
        </tr>
    );
}

export default User;
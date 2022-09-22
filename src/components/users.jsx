import React, { useState } from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId));
        renderPhrase(users.length - 1)
    }

    const renderPhrase = (number) => {

        const words = ['человек тусанёт с тобой сегодня', 'человека тусанут с тобой сегодня', 'Никто с тобой не тусанёт'];

        number = Math.abs(number) % 100;
        let num = number % 10;
        if (number > 10 && number < 20) return number + ' ' + words[0];
        if (num > 1 && num < 5) return number + ' ' + words[1];
        if (num === 1) return number + ' ' + words[0];
        if (number === 0) return words[2];
        return number + ' ' + words[0];

    }

    const changeBadgeClass = () => {
        let badgeClass = 'badge bg-primary';
        if (users.length === 0) badgeClass = 'badge bg-danger';
        return badgeClass;
    }

    const getQualitieClass = (color) => {
        let classes = 'm-1 badge bg-';
        classes = classes + color;
        return classes;
    }

    const renderUsers = () => {
        if (users.length === 0) return;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map(qualitie => (
                                        <span key={qualitie._id} className={getQualitieClass(qualitie.color)}>{qualitie.name}</span>

                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3><span className={changeBadgeClass()}>{renderPhrase(users.length)}</span></h3>
                        {renderUsers()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
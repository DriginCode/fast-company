import React, { useState } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId));
    }

    const handleBoomark = (userId) => {
        const newValue = users.map((user) => ({
            ...user,
            bookmark: user._id === userId && !user.bookmark ? true : false
        }));

        setUsers(newValue);
    }

    const renderUsers = () => {

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <User
                                key={user._id}
                                {...user}
                                onHandleBoomark={handleBoomark}
                                onHandleDelete={handleDelete}
                            />))
                    }
                </tbody>
            </table >
        )
    }

    return (
        <>
            <SearchStatus number={users.length} />
            {users.length > 0 && renderUsers()}
        </>
    );
};

export default Users;
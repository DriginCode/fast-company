import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleUserDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        const newBookmarkState = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        setUsers(newBookmarkState);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {users && <Users
                        users={users}
                        onHandleToggleBoomark={handleToggleBookmark}
                        onHandleUserDelete={handleUserDelete}
                    />}
                </div>
            </div>
        </div>
    );
};

export default App;

import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId));
    }

    const handleToggleBookmark = (id) => {
        const newBookmarkState = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        setUsers(newBookmarkState);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <SearchStatus number={users.length} />
                    <Users
                        userList={users}
                        onHandleBoomark={handleToggleBookmark}
                        onHandleDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;
import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onHandleToggleBoomark,
    onHandleUserDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя"
        },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities} />) },
        professions: {
            path: "profession.name",
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            path: "rate",
            name: "Оценка"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (<Bookmark
                onClick={() => onHandleToggleBoomark(user._id)}
                bookmarkStatus={user.bookmark}
            />)
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onHandleUserDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

    return (

        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onHandleToggleBoomark: PropTypes.func.isRequired,
    onHandleUserDelete: PropTypes.func.isRequired
};

export default UserTable;

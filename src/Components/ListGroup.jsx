import { useEffect } from "react";
import List from "./List";
import "./css/ListGroup.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/slice/listSlice";

const ListGroup = () => {
    const users = useSelector((state) => state.listReducer.users);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("fetching users", users);
        dispatch(fetchUsers({ since: users.length }));
    }, []);

    return (
        <div className="list-group">
            {users?.length
                ? users.map((user, index) => <List key={index} user={user} />)
                : null}
        </div>
    );
};

export default ListGroup;

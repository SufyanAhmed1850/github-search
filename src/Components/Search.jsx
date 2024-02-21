import IconSearch from "../assets/search.svg";
import "./css/Search.css";
import { useSelector, useDispatch } from "react-redux";
import { clearList, fetchUsers, searchUser } from "../store/slice/listSlice";
import { useEffect, useRef, useState } from "react";

const Search = () => {
    const users = useSelector((state) => state.listReducer.users);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const typingTimeoutRef = useRef(null);

    const search = (value) => {
        if (value && value.trim() !== "") {
            dispatch(searchUser({ userName: value }));
        } else {
            dispatch(clearList());
            dispatch(fetchUsers({ since: 0 }));
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            search(value);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="search-bar">
            <div className="search-field">
                <div>
                    <img className="search-icon" src={IconSearch} alt="search" />
                </div>
                <input
                    value={query}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Type username…"
                />
            </div>
            <div onClick={() => search(query)} className="search-btn">
                <h3>Search</h3>
            </div>
        </div>
    );
};

export default Search;

import { useState } from "react";
import "./App.css";
import ListGroup from "./Components/ListGroup";
import Search from "./Components/Search";
import { fetchUsers } from "./store/slice/listSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
    const [isDark, setIsDark] = useState(false);
    const usersState = useSelector((state) => state.listReducer);
    const dispatch = useDispatch();

    const handleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    console.log(usersState);

    return (
        <main>
            <header className="app-header">
                <h1>GitHub User Search</h1>
                <div onClick={handleTheme} className="theme-btn">
                    <h4>{isDark ? "LIGHT" : "DARK"}</h4>
                </div>
            </header>
            <Search />
            <ListGroup />
            {!usersState.isSearch && (
                <div
                    onClick={() => {
                        const since =
                            usersState.users[usersState.users.length - 1].id;
                        dispatch(fetchUsers({ since }));
                    }}
                    className="load-btn"
                >
                    <h3>More</h3>
                </div>
            )}
        </main>
    );
}

export default App;

import "./css/List.css";
import IconURL from "../assets/url.svg";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/slice/userSlice";

const List = ({ user }) => {
    const dispatch = useDispatch();
    const [showProjectModal, setShowProjectModal] = useState(false);
    const {
        avatar_url: userProfile,
        login: userName,
        html_url: userGithub,
    } = user;

    const handleModal = () => {
        setShowProjectModal(true);
        dispatch(fetchUser({ userName }));
    };

    return (
        <>
            {showProjectModal && (
                <Modal
                    setShowProjectModal={setShowProjectModal}
                    showProjectModal={showProjectModal}
                />
            )}
            <div className="list-item">
                <div className="list-item-left">
                    <div>
                        <img src={userProfile} alt="user" />
                    </div>
                    <div className="modal-opener" onClick={handleModal}>
                        <h3>@{userName}</h3>
                    </div>
                </div>
                <div className="list-item-right">
                    <div
                        className="list-item-url"
                        onClick={() => window.open(userGithub)}
                    >
                        <div>
                            <img src={IconURL} alt="url" />
                        </div>
                        <p>
                            {window.innerWidth <= 650 ? "Github" : userGithub}
                        </p>
                    </div>
                    <h3 className="list-item-detail-btn" onClick={handleModal}>Details</h3>
                </div>
            </div>
        </>
    );
};

export default List;

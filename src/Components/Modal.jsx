import "./css/Modal.css";
import IconLocation from "../assets/location.svg";
import IconOrg from "../assets/org.svg";
import IconUrl from "../assets/url.svg";
import IconX from "../assets/x.svg";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../store/slice/userSlice";

const Modal = ({ setShowProjectModal, showProjectModal }) => {
    const user = useSelector((state) => state.userReducer.user);
    console.log(user);
    const {
        name,
        login,
        avatar_url,
        bio,
        blog,
        company,
        twitter_username,
        public_repos,
        followers,
        following,
        location,
        created_at,
    } = user;

    const dispatch = useDispatch();

    const joined = new Date(created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <>
            <div
                className="user-modal-container"
                onClick={(e) => {
                    if (e.target.classList.contains("user-modal-container")) {
                        dispatch(resetUser());
                        setShowProjectModal(false);
                    }
                }}
            >
                <div className="user-modal">
                    <div
                        onClick={() => {
                            dispatch(resetUser());
                            setShowProjectModal(false);
                        }}
                        className="modal-close-icon"
                    >
                        <h1>X</h1>
                    </div>
                    <div className="user-modal-image">
                        <img src={avatar_url} alt="user" />
                    </div>
                    <div className="user-modal-main">
                        <div className="user-modal-header-container">
                            <div className="user-modal-header">
                                <div>
                                    <h1>{name}</h1>
                                    <h3>@{login}</h3>
                                </div>
                                <p>Joined {joined}</p>
                            </div>
                            <p>{bio || "No Bio"}</p>
                        </div>
                        <div className="user-modal-meta">
                            <div>
                                <h4>Repos</h4>
                                <h2>{public_repos}</h2>
                            </div>
                            <div>
                                <h4>Followers</h4>
                                <h2>{followers}</h2>
                            </div>
                            <div>
                                <h4>Following</h4>
                                <h2>{following}</h2>
                            </div>
                        </div>
                        <div className="user-moadal-links-container">
                            {location && (
                                <div className="user-moadal-links">
                                    <div>
                                        <img
                                            src={IconLocation}
                                            alt="location"
                                        />
                                    </div>
                                    <p>{location}</p>
                                </div>
                            )}
                            {twitter_username && (
                                <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        window.open(
                                            `https://twitter.com/${twitter_username}`
                                        )
                                    }
                                    className="user-moadal-links"
                                >
                                    <div>
                                        <img src={IconX} alt="twitter" />
                                    </div>
                                    <p>@{twitter_username}</p>
                                </div>
                            )}
                            {blog && (
                                <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() => window.open(blog)}
                                    className="user-moadal-links"
                                >
                                    <div>
                                        <img src={IconUrl} alt="website" />
                                    </div>
                                    <p>{blog}</p>
                                </div>
                            )}
                            {company && (
                                <div className="user-moadal-links">
                                    <div>
                                        <img src={IconOrg} alt="organization" />
                                    </div>
                                    <p>{company}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;

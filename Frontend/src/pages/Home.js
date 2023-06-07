import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const [userinfo, setUserinfo] = useState("");

    useEffect(() => {
        if (isAuthenticated && user) {
            setUsername(user.name.split(" ")[0]);
            setUserinfo(user);
        }
    }, [isAuthenticated, user]);

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success("Created a new room");
    };

    const joinRoom = () => {
        if (!roomId || !username) {

            if (!roomId) {
                toast.error("ROOM ID is required");
                return;
            }
            else {
                toast.error("You are not signed in !!!");
                return;
            }

        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
                userinfo
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            joinRoom();
        }
    };


    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/cloud-collaborator.png"
                    alt="cloud-collaborator-logo"
                />



                {isAuthenticated ? (
                    <>
                        <div className="homeLoginInfo">
                            <span>Logged in as </span>
                            <span style={{ fontWeight: 'bold' }}>{userinfo.name}</span>
                        </div>
                    </>
                ) : ""}
                <div className="inputGroup">
                    <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />

                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>

                    {
                        isAuthenticated ? (
                            <>
                                {console.log(user)}
                                <div className="signContainer">
                                    <LogoutButton />
                                </div>

                            </>

                        ) :
                            (
                                <div className="signContainer">
                                    <LoginButton />
                                </div>

                            )
                    }

                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a onClick={createNewRoom} href="" className="createNewBtn">
                            new room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    {/* Built with 💛&nbsp;by &nbsp;
                    <a href="https://github.com/pratikjpatil">Pratik</a> */}
                </h4>
            </footer>
        </div>
    );
};

export default Home;

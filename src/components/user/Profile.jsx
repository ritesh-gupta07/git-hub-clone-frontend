import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../NavBar";
import "./profile.css";
import { useAuth } from "../../authContext";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const {setCurrentUser} = useAuth();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const currentUserId = localStorage.getItem("userId");
        if (!userId) {
            window.location.href = "/auth";
            return;
        }

        fetchUser(userId);
        fetchRepositories(userId);
    }, []);

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:3002/userProfile/${userId}`
            );

            // console.log("User:", response.data);

            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRepositories = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:3002/repo/user/${userId}`
            );

            // console.log("Repositories:", response.data);

            setRepositories(response.data.repositories || []);
        } catch (err) {
            console.error(err);
            setRepositories([]);
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <h1 style={{ color: "white", textAlign: "center" }}>
                    Loading...
                </h1>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="profile-container">

                <div className="profile-sidebar">

                    <div className="profile-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>

                    <h2>{user.username}</h2>

                    <p className="profile-email">
                        {user.email}
                    </p>



                    <button className="follow-btn">
                        Follow
                    </button>



                    <div className="profile-stats">
                        <span>
                            Following: {user.followedUsers?.length || 0}
                        </span>
                    </div>

                </div>

                <div className="profile-content">

                    <div className="profile-tabs">
                        <button className="active-tab">
                            Overview
                        </button>

                        <button>
                            Starred Repositories ({user.starRepos?.length || 0})
                        </button>

                        <button id="logout" onClick={() => {
                            localStorage.removeItem("token")
                            localStorage.removeItem("userId");
                            setCurrentUser(null);
                            window.location.href ="/auth"
                        }}>
                            Logout
                        </button>
                    </div>

                    <div className="repository-section">

                        <h3>Your Repositories</h3>

                        {repositories.length === 0 ? (
                            <p>No repositories found</p>
                        ) : (
                            repositories.map((repo) => (
                                <div
                                    key={repo._id}
                                    className="repository-card"
                                >
                                    <h4>{repo.name}</h4>

                                    <p>{repo.description}</p>

                                    <span>
                                        {repo.visibility ? "Public" : "Private"}
                                    </span>
                                </div>
                            ))
                        )}

                    </div>

                </div>

            </div>
        </>
    );
};

export default Profile;
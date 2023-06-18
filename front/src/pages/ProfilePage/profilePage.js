import React, { useState, useEffect } from 'react';
import VideoGrid from '../../components/VideoGrid/videoGrid';
import Card from "../../components/Card/card";
import { BiExport } from "react-icons/bi"
import { Link } from 'react-router-dom';
import { getUser, getVideosByAuthor } from '../../videos_api/videos';

import './profilePage.css';

const ProfilePage = () => {

  useEffect(() => {
    getUser(sessionStorage.getItem("id"))
      .then((response) => {
        setUsername(response["nickname"]);
        setAvatarSrc(response["profilePic"]);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getVideosByAuthor(sessionStorage.getItem("id"))
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.error(error));
  }, []);

  const [username, setUsername] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [videos, setVideos] = useState([]);

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <img src={ avatarSrc } alt={ `${username}'s Avatar` } className="profile-page__avatar" />
        <h1 className="profile-page__username">{ username }</h1>
      </div>
      <VideoGrid videos={videos}></VideoGrid>
      <Link to={`/import`} className={"profile-page__add-video-button"}>
          <BiExport/>
      </Link>
      <Card></Card>
    </div>
  );
};

export default ProfilePage;
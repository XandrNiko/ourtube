import React from 'react';
import VideoGrid from '../../components/VideoGrid/videoGrid';
import Card from "../../components/Card/card";
import { BiExport } from "react-icons/bi"
import { Link } from 'react-router-dom';

import './style.css';

const ProfilePage = () => {
  const username = 'John Doe';
  const avatarSrc = 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg';
  const videos = [
    {
      id: 1,
      title: 'Video Title 1',
      author: 'Author 1',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 2,
      title: 'Video Title 2',
      author: 'Author 2',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 3,
      title: 'Video Title 3',
      author: 'Author 3',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 4,
      title: 'Video Title 4',
      author: 'Author 4',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 5,
      title: 'Video Title 5',
      author: 'Author 5',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 6,
      title: 'Video Title 1',
      author: 'Author 1',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 7,
      title: 'Video Title 2',
      author: 'Author 2',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 8,
      title: 'Video Title 3',
      author: 'Author 3',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 9,
      title: 'Video Title 4',
      author: 'Author 4',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
    {
      id: 10,
      title: 'Video Title 5',
      author: 'Author 5',
      imageSrc: 'https://f.vividscreen.info/soft/56857d2a5ac29f2897c481b80da86a41/Deliciour-Cherries-2880x1920.jpg',
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <img src={ avatarSrc } alt={ `${username}'s Avatar` } className="profile-page__avatar" />
        <h1 className="profile-page__username">{ username }</h1>
      </div>
      <VideoGrid videos={videos}></VideoGrid>
      <Link to={`/export`} className={"profile-page__add-video-button"}>
          <BiExport/>
      </Link>
      <Card></Card>
    </div>
  );
};

export default ProfilePage;
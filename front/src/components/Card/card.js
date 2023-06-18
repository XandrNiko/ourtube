import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLogOut, FiHome } from 'react-icons/fi';

import './card.css';

const Card = () => {
  return (
    <div className="card">
      <div className="buttons">
        <Link to="/profile">
          <FiUser />
        </Link>
        <Link to="/auth">
          <FiLogOut />
        </Link>
        <Link to="/">
          <FiHome />
        </Link>
      </div>
    </div>
  );
};

export default Card;
import React, { useEffect, useState } from 'react';
import { getUserData } from '../../services/auth';
import './Profile.scss';

const Profile = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const { email, username } = getUserData();

    setState({
      email,
      username
    });
  }, []);
  const { email, username } = state;
  return (
    <div className='screenWrapper'>
      <h3>
        My profile
      </h3>
      <div className='info'>
        <div className='field'>
          <span className='label'>
            Email:
          </span>
          <span className='value'>
            {email}
          </span>
        </div>
        <div className='field'>
          <span className='label'>
            Username:
          </span>
          <span className='value'>
            {username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;

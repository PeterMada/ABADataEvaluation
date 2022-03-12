import React, { useEffect, useState } from 'react';

export const Profile = ({ setAuth }) => {
  /*
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const response = awaitfetch(
        `${process.env.REACT_APP_API_URL}profile/`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      setProfile(parseRes.profile);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  });
  */

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

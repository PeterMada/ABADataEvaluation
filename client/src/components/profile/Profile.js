import React, { useEffect, useState } from 'react';

export const Profile = () => {
  const [profile, setProfile] = useState({
    user_email: '',
    user_name: '',
  });

  const getProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}profile/`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      setProfile(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{profile.user_name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{profile.user_email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

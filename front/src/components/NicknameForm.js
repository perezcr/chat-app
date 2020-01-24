import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const NicknameForm = ({ sendNickname }) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    sendNickname(nickname);
    setNickname('');
  };

  const handleInputChange = event => {
    setNickname(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoComplete="off"
        name="nickname"
        onChange={handleInputChange}
        label="Nickname..."
        value={nickname}
        variant="outlined"
      />
    </form>
  );
};

export default NicknameForm;

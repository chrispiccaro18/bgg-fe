import React, { useState, useEffect } from 'react';
import { getCollection } from '../../services/game-collection-api';
import {
  randomBGPrompt,
  randomBGButton,
  randomBGLabel,
} from '../../utils/strings';

const RandomGame = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [randomGame, setRandomGame] = useState('');

  const handleChange = event => {
    setUsername(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSubmittedUsername(username);
  };

  useEffect(() => {
    if(submittedUsername) {
      getCollection(submittedUsername)
        .then(game => setRandomGame(game));
    }
  }, [submittedUsername]);

  return (
    <>
    <h1>{randomBGPrompt}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {randomBGLabel}
          <input value={username} onChange={handleChange} />
        </label>
        <button>{randomBGButton}</button>
      </form>
      {randomGame && <h2>{randomGame.name}</h2>}
    </>
  );
};

export default RandomGame;

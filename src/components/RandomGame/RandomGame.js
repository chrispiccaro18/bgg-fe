import React, { useState } from 'react';
import { getCollection } from '../../services/game-collection-api';
import {
  randomBGPrompt,
  randomBGButton,
  randomBGLabel,
} from '../../utils/strings';

const RandomGame = () => {
  const [username, setUsername] = useState('');
  const [randomGame, setRandomGame] = useState('');
  const [error, setError] = useState('');

  const handleChange = event => {
    setUsername(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(username) {
      getCollection(username)
        .then(game => {
          if(game.error) {
            setRandomGame('');
            setError(game.error.message);
          }
          else {
            setError('');
            setRandomGame(game);
          }
        });
    }
    else console.log('not fired');
  };

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
      {randomGame && 
      <>
        <h2>{randomGame.name}</h2>
        <img src={randomGame.img} />
      </>}
      {error && <h2>{`Error: ${error}`}</h2>}
    </>
  );
};

export default RandomGame;

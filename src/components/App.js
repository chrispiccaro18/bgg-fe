import React, { useState, useEffect } from 'react';
import { getCollection } from '../services/game-collection-api';

const App = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [game, setGame] = useState('');

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
        .then(randomGame => setGame(randomGame));
    }
  }, [submittedUsername]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={handleChange} />
        <button>Submit</button>
      </form>
      <p>{game.name}</p>
    </>
  );
};

export default App;

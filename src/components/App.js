import React, { useState, useEffect } from 'react';
import { getCollection } from '../services/game-collection-api';

const App = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [games, setGames] = useState([]);

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
        .then(collection => setGames(collection));
    }
  }, [submittedUsername]);

  const listOfGames = games.map(game => {
    return <li key={game.name}>{game.name}</li>;
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={handleChange} />
        <button>Submit</button>
      </form>
      <ul>{listOfGames}</ul>
    </>
  );
};

export default App;

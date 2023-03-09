const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const getGameId = async () => {
  const id = localStorage.getItem('gameId');
  if (id) {
    return id;
  }
  const res = await fetch(`${baseUrl}games/`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'My Game',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const result = await res.json();

  if (result && result.result) {
    const newId = result.result.split(' ')[3];
    if (newId && newId.length > 5) {
      localStorage.setItem('gameId', newId);
      return newId;
    }
  }

  return null;
};

const getScores = async () => {
  const id = await getGameId();
  if (id) {
    const res = await fetch(`${baseUrl}games/${id}/scores/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const result = await res.json();
    return result;
  }
  return null;
};

const submitScore = async (name, score) => {
  const id = await getGameId();
  if (id) {
    const res = await fetch(`${baseUrl}games/${id}/scores/`, {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const result = await res.json();
    return result;
  }
  return null;
};

export { getScores, submitScore };

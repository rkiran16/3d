async function getPlanet(planetName = '') {
  // Default options are marked with *
  const response = await fetch(
    `https://api.api-ninjas.com/v1/planets?name=${planetName}`,
    {
      method: 'Get', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
      },
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
}

export default getPlanet;

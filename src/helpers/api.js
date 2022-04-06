const getToken = async () => {
  const fetchData = {
    method: 'GET',
  };

  const response = await fetch('https://opentdb.com/api_token.php?command=request', fetchData);
  const data = await response.json();
  return data;
};

export default getToken;

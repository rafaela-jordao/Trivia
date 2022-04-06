export const getToken = async () => {
  const fetchData = {
    method: 'GET',
  };

  const response = await fetch('https://opentdb.com/api_token.php?command=request', fetchData);
  const data = await response.json();
  return data;
};

export const getQuestions = async (token) => {
  const fetchData = {
    method: 'GET',
  };

  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`, fetchData);
  const data = await response.json();
  return data;
};

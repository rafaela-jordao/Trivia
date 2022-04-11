export const getToken = async () => {
  const fetchData = {
    method: 'GET',
  };

  const response = await fetch('https://opentdb.com/api_token.php?command=request', fetchData);
  const data = await response.json();
  return data;
};

export const getQuestions = async ({ token, category, difficulty, typeOfQuestion }) => {
  const fetchData = {
    method: 'GET',
  };
  console.log(typeOfQuestion);
  let URL = 'https://opentdb.com/api.php?amount=5';

  if (category) URL += `&category=${category}`;
  if (difficulty) { URL += `&difficulty=${difficulty}`; }
  if (typeOfQuestion) { URL += `&type=${typeOfQuestion}`; }

  const response = await fetch(`${URL}&token=${token}`, fetchData);
  const data = await response.json();
  return data;
};

export const getCategorys = async () => {
  const fetchData = {
    method: 'GET',
  };

  const response = await fetch('https://opentdb.com/api_category.php', fetchData);
  const data = await response.json();
  return data;
};

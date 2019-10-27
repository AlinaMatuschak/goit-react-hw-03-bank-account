const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

const get = key => {
  try {
    const transactions = localStorage.getItem(key);
    return transactions ? JSON.parse(transactions) : null;
  } catch (err) {
    console.log('err');
  }
};

export default { save, get };

const setArray = arr => {
  const result = new Set();
  const repeat = new Set();

  arr.forEach(
    value => (result.has(value) ? repeat.add(value) : result.add(value))
  );

  return {
    result,
    repeat,
  };
};

export default setArray;

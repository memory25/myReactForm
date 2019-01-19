export default fn => {
  let timer;

  return delay => x => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(x);
    }, delay);
  };
};

export default (...funcs) => funcs.reduce((f, g) => x => f(g(x)));

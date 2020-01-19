const context = require.context('./', false, /\.tsx$/);
export default context
  .keys()
  .filter( (item) => item !== './index.js')
  .map( (key) => context(key));
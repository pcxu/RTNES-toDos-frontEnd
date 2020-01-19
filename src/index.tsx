import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugins

// 3. Model
require('./models').default.forEach( (key:any) => app.model(key.default));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
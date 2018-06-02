const Koa = require('koa');
const koaWebpack = require('koa-webpack');

const app = new Koa();

app.use(koaWebpack({}));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});

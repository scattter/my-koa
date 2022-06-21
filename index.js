const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = 'home page';
});

router.get('/login', (ctx, next) => {
  // ctx.router available
  ctx.body = 'login page';
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
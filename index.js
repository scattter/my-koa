const Koa = require('koa');
const Router = require('@koa/router');
const compose = require('koa-compose');

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

const a1 = (ctx, next) => {
  console.log('one')
  next()
  console.log('one')
}

const a2 = (ctx, next) => {
  console.log('two')
  next()
  console.log('two')
}

const a3 = (ctx, next) => {
  console.log('three')
  next()
  console.log('three')
}

app.use(compose([a1, a2, a3]))

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
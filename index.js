const Koa = require('koa');
const Router = require('@koa/router');
const compose = require('koa-compose');
const fs = require('fs');
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

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

// 使用洋葱模型捕获错误
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.body = e.message
  }
})

app.use(async (ctx, next) => {
  const data = JSON.parse('{}')
  // next() 如果不适用async/await 那么就捕获不到错误
  await next()
})

app.use(async (ctx, next) => {
  const data = await readFile('./dd.html')
  // next() 如果不适用async/await 那么就捕获不到错误
  ctx.type = 'html'
  ctx.body = data
})

// const a1 = (ctx, next) => {
//   console.log('one')
//   next()
//   console.log('one')
// }
//
// const a2 = (ctx, next) => {
//   console.log('two')
//   next()
//   console.log('two')
// }
//
// app.use(compose([a1, a2]))

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
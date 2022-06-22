const http = require('http')

class Koa {
  constructor() {
    this.middlewares = []
  }

  listen(...args) {
    const app = http.createServer(this.callback())
    app.listen(...args)
  }

  use(middleware) {
    this.middlewares.push(middleware)
    return this
  }

  callback() {
    const fnMiddleware = this.compose()
    return (req, res) => {
      fnMiddleware().then(() => {
        console.log('end')
        res.end('my koa')
      }).catch(err => {
        console.log('err: ', err.message)
      })
    }
  }

  compose() {
    const that = this
    return function() {
      const dispatch = index => {
        if (index >= that.middlewares.length) return Promise.resolve()
        const fn = that.middlewares[index]
        // 包裹Promise是防止有些middleware是同步代码 不能捕获错误
        return Promise.resolve(
          // {} 相当于middleware参数的ctx, 后面的相当于next函数, 即这样就可以进入洋葱的下一层了
          fn({}, () => dispatch(index + 1))
        )
      }
      return dispatch(0)
    }
  }
}

module.exports = Koa
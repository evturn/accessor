import { PassThrough } from 'stream'
import compose from 'koa-compose'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

export default compiler => {
  const devMiddleware = koaDevMiddleware(compiler, {
    noInfo: true,
    silent: true,
    publicPath: '/',
    stats: 'errors-only',
  })
  const hotMiddleware = koaHotMiddleware(compiler)
  return [devMiddleware, hotMiddleware]
}

function koaDevMiddleware(compiler, opts={}) {
  const expressDev = webpackDevMiddleware(compiler, opts)

  const waitUntilValid = _ => {
    return new Promise((resolve, reject) =>
      expressDev.waitUntilValid(resolve))
  }

  return async function koaDev(ctx, next) {
    await waitUntilValid()
    await expressDev(ctx.req, {
      end: x => ctx.body = x,
      setHeader: ctx.set.bind(ctx)
    }, next)
  }
}

function koaHotMiddleware(compiler, opts={}) {
  const expressHot = webpackHotMiddleware(compiler, opts)

  return async (ctx, next) => {
    const transform = new PassThrough()
    ctx.body = transform

    await expressHot(ctx.req, {
      write: transform.write.bind(transform),
      writeHead: (state, headers) => {
        ctx.state = state
        ctx.set(headers)
      }
    }, next)
  }
}
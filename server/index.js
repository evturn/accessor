import path from 'path'
import fs from 'fs'
import Koa from 'koa'
import webpack from 'webpack'
import webpackMiddleware from 'koa-webpack'
import webpackConfig from '../webpack.config.js'
import logger from './logger'

const compiler = webpack(webpackConfig)
const filepath = path.join(compiler.outputPath, 'index.html')
const middleware = webpackMiddleware({
  compiler,
  dev: {
    noInfo: true,
    silent: true,
    publicPath: '/',
    stats: 'errors-only',
  }
})

const app = new Koa()

app.use(middleware)

app.use(ctx => {
  ctx.body = fs.readFileSync(filepath).toString()
})

app.listen(3000, _ => logger.serverStarted)
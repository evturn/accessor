import path from 'path'
import fs from 'fs'
import Koa from 'koa'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import webpackMiddleware from './middleware'
import logger from './logger'

const compiler = webpack(webpackConfig)
const [devMiddleware, hotMiddleware] = webpackMiddleware(compiler)

const app = new Koa()

app.use(devMiddleware)
app.use(hotMiddleware)

app.use(ctx => {
  const filepath = path.join(compiler.outputPath, 'index.html')
  ctx.body = fs.readFileSync(filepath).toString()
})

app.listen(3000, _ => logger.serverStarted)
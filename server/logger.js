import c from 'chalk'

export default {
  serverStartError,
  serverStarted,
  DBConnected,
  DBConnectionError,
}

function serverStarted(port, env) {
  const n = `\n`
  const __ =  `------------------------`
  const _ = __ + __
  const msg = [
    n,
    `${c.gray(_)}`,
    `${c.yellow('Server started 🌐')}`,
    `${c.bold('Running in:')} ${c.magenta(env)}`,
    `${c.bold('Listening on:')} ${c.magenta(port)}`,
    `${c.gray(_)}`,
    n,
  ].join(n)
  console.log(msg)
}

function DBConnected() {
  const n = `\n`
  const msg = [
    n,
    `${c.green('DB connected 🖖🏽')}`,
  ].join(n)
  console.log(msg)
}

function DBConnectionError() {
  const n = `\n`
  const msg = [
  n,
  `${c.bgRed.white('Connection error:')}`,
  n
  ].join(n)

  return console.error.bind(console, msg)
}

function serverStartError(err) {
  console.log(c.red(err))
}
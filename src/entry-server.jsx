import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Writable } from 'node:stream'
import App from './App.jsx'

export function renderPage(path, { script, styles }) {
  return new Promise((resolve, reject) => {
    let html = ''
    let failed = false
    const output = new Writable({ write(chunk, _encoding, done) { html += chunk.toString(); done() } })
    output.on('finish', () => failed ? reject(failed) : resolve(html))
    const stream = renderToPipeableStream(<html lang="en"><head><meta charSet="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#111c25"/><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/><link rel="apple-touch-icon" href="/apple-touch-icon.png"/>{styles.map(href => <link key={href} rel="stylesheet" href={href}/>)}</head><body><div id="root" data-route={path}><StaticRouter location={path}><App/></StaticRouter></div><script type="module" src={script}/></body></html>, {
      onAllReady() { stream.pipe(output) },
      onShellError(error) { reject(error) },
      onError(error) { failed = error },
    })
  })
}

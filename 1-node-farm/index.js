const http = require('http')
const url = require('url')
const fs = require('fs')
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8',
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8',
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8',
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  // res.setHeader('Content-Type', 'charset=utf-8')
  // res.write('<h1>My first web server!!!!! 🔥</h1>')

  const { query, pathname } = url.parse(req.url, true)

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

    res.end(output)

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.end(output)

    // api page
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data)

    // not found page
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html;charset=utf-8',
      'my-own-header': 'hellooooooooooo',
    })
    res.end('<h1>My first web server!!!!! 🔥</h1>')
  }
})

server.listen(8080, '127.0.0.1', () => {
  console.log('Listening to requestsssssssssssssssss')
})

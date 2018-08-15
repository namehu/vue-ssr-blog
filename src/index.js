const Vue = require('vue')
const server = require('express')()
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(path.join(__dirname, './index.template.html'), 'utf-8')
})

const context = {
  title: 'hello',
  meta: `
    <meta ...>
    <meta ...>aa
  `
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  renderer.renderToString(app, context, (err, html) => {
    console.log(html) // html 将是注入应用程序内容的完整页面
    res.end(html);
  })

})

const port = 8088;
server.listen(port, () => {
  console.log(`[INFO] Server Start Success And Listen On ${port}`)
})
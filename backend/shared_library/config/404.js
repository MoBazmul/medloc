const notFoundError = (req, res) => {
  res.status(404)

  if(req.accepts('html')) {
    res.sendFile('404.html')
  } else if(req.accepts('json')) {
    res.json({ 'message': '404 page not found' })
  } else {
    res.type('txt').send('404 page not found')
  }
}

module.exports = notFoundError

import './style.css'
import { init as flipbook } from 'flipbook-viewer'
import { init as initPdf } from './book-pdf'
import magni from './books/magni.pdf'

initPdf(magni, (err, book) => {
  console.log('strtsatsts')
  if (err) {
    console.error(err)
    return
  }
  const opts = {
    width: 800,
    height: 600,
  }
  console.log('arseitnaeirs')
  flipbook(book, 'div-id', opts, (err, viewer) => {
    if (err) return console.error(err)
    viewer.on('seen', (n) => console.log('page number: ' + n))
  })
})

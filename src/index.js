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
  const pdfNode = document.querySelector('#flipbookPdf')
  const btnPrev = document.querySelector('#flipbookPrev')
  const btnNext = document.querySelector('#flipbookNext')
  const opts = {}
  console.log('arseitnaeirs')
  flipbook(book, pdfNode, opts, (err, viewer) => {
    if (err) return console.error(err)
    viewer.on('seen', (n) => console.log('page number: ' + n))
    btnNext.onclick = () => viewer.flip_forward()
    btnPrev.onclick = () => viewer.flip_back()
  })
})

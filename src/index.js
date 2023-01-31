import './style.css'
import { init as flipbook } from 'flipbook-viewer'
import { init as initPdf } from './book-pdf'
import test from './books/test.pdf'
import magni from './books/magni.pdf'

const books = {
  test,
  magni,
}

const flipbookNode = document.querySelector('#flipbook')
const pdfNode = document.querySelector('#flipbookPdf')
const btnPrev = document.querySelector('#flipbookPrev')
const btnNext = document.querySelector('#flipbookNext')

flipbookNode.addEventListener('click', ({ target }) => {
  if (target !== flipbookNode && target !== pdfNode) return
  flipbookNode.hidden = true
  pdfNode.innerHTML = ''
})

const openBook = (name) => () =>
  initPdf(books[name], (err, book) => {
    if (err) {
      console.error(err)
      return
    }
    flipbookNode.hidden = false
    const opts = {}
    flipbook(book, pdfNode, opts, (err, viewer) => {
      if (err) return console.error(err)
      viewer.on('seen', (n) => console.log('page number: ' + n))
      btnNext.onclick = () => viewer.flip_forward()
      btnPrev.onclick = () => viewer.flip_back()
    })
  })

document
  .querySelectorAll('[data-book]')
  .forEach((button) =>
    button.addEventListener('click', openBook(button.dataset.book))
  )

import './style.css'
import { init as flipbook } from 'flipbook-viewer'
import { init as initPdf } from './book-pdf'
import test from './books/test.pdf'
import scrapbook from './books/scrapbook.pdf'
import tea from './books/tea-catalog.pdf'

const inDev = window.location.hostname === '127.0.0.1'

const books = {
  test,
  tea: inDev
    ? tea
    : 'https://vesperbirthday.azureedge.net/pdfcdn/tea-catalog.pdf',
  scrapbook: inDev
    ? scrapbook
    : 'https://vesperbirthday.azureedge.net/pdfcdn/scrapbook.pdf',
}

const flipbookNode = document.querySelector('#flipbook')
const pdfNode = document.querySelector('#flipbookPdf')
const closeButton = document.querySelector('#flipbookClose')

const closeBook = () => {
  flipbookNode.hidden = true
  pdfNode.innerHTML = ''
  document.body.classList.remove('modal-open')
}

const openBook = (bookName) => () => {
  document.body.classList.add('modal-open')
  flipbookNode.dataset.loading = true
  flipbookNode.hidden = false
  initPdf(books[bookName], (err, book) => {
    if (err) {
      console.error(err)
      closeBook()
      return
    }
    const opts = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    flipbook(book, pdfNode, opts, (err, viewer) => {
      if (err) {
        console.error(err)
        closeBook()
        return
      }
      flipbookNode.dataset.loading = false
      const canvas = pdfNode.querySelector('canvas')
      canvas.onclick = (e) => {
        if (e.clientX - canvas.offsetLeft >= canvas.offsetWidth / 2)
          viewer.flip_forward()
        else viewer.flip_back()
      }
    })
  })
}

document
  .querySelectorAll('[data-book]')
  .forEach((button) =>
    button.addEventListener('click', openBook(button.dataset.book))
  )

flipbookNode.addEventListener('click', ({ target }) => {
  if (target !== flipbookNode && target !== pdfNode) return
  closeBook()
})
closeButton.addEventListener('click', closeBook)

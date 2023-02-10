import './style.css'
import { init as flipbook } from 'flipbook-viewer'
import Axios from 'axios'
import fileDownload from 'js-file-download'
import { init as initPdf } from './book-pdf'
import test from './books/test.pdf'
import scrapbook from './books/scrapbook.pdf'

const books = {
  test,
  scrapbook,
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

const downloadBook = (bookName) => () =>
  Axios.get(books[bookName], { responseType: 'blob' }).then((res) =>
    fileDownload(res.data, `${bookName}.pdf`)
  )

document
  .querySelectorAll('[data-book]')
  .forEach((button) =>
    button.addEventListener('click', openBook(button.dataset.book))
  )

document
  .querySelectorAll('[data-bookdl]')
  .forEach((button) =>
    button.addEventListener('click', downloadBook(button.dataset.bookdl))
  )

flipbookNode.addEventListener('click', ({ target }) => {
  if (target !== flipbookNode && target !== pdfNode) return
  closeBook()
})
closeButton.addEventListener('click', closeBook)

class Search {
  constructor () {
    this.apiURL = 'https://www.googleapis.com/books/v1/volumes'
    this.parameters = {
      filter: 'full',
      maxResults: 12,
      q: null,
      apiKey: 'AIzaSyCm0v_8QzEma6Es_yqJdw42W4PbvqFjOKM'
    }
    this.results = null
    this.elements = {
      'form': $('#search-form'),
      'queryInput': $('#query'),
      'results': $('#results'),
      'subtitle': $('#main-thing p'),
      'title': $('#main-thing h1'),
      'body': $('body'),
      'titleID': $('#title-id'),
      'viewDiv': $('#view-div'),
      'otherButtons': $('#other-buttons a'),
      'again': $('#again'),
      'back': $('#back'),
      'loading': $('#loading')
    }
    this.viewer = null
  } // end of constructor

  init () {
    this.elements.otherButtons.hide()
    this.elements.results.hide()
    this.elements.viewDiv.hide()
    this.getInput()
    google.books.load()
  }

  getInput () {
    this.elements.form.on('submit', (e) => {
      e.preventDefault()
      this.parameters.q = this.elements.queryInput.val().trim()
      console.log(this.parameters.q)
      this.getResultsByQuery()
    })
  } // end of registerEvents

  getResultsByQuery (callback) {
    $.getJSON(this.apiURL, this.parameters)
      .done((data) => {
        console.log(data)
        this.displayResults(data)
      })
  } // end of getResultsByQuery

  displayResults (data) {
    this.hideForm()
    data.items.forEach((item) => {
      const title = item.volumeInfo.title
      // const subtitle = item.volumeInfo.subtitle
      const authors = item.volumeInfo.authors
      // const category = item.volumeInfo.categories
      const description = item.volumeInfo.description
      const thumbnail = item.volumeInfo.imageLinks.thumbnail
      let gbid = item.id

      this.elements.results.append(
        `<div class="col col-sm-6 col-md-4 col-lg-3">
          <div class="card" data-gbid="${gbid}">
            <div id="thumbnail-link">
             <img src=${thumbnail} alt="thumbnail">
            </div>
              <h4 class="card-title">${title}<br>
              By ${authors}</h4>
            <p class="card-text">${description}</p>
          </div>
        </div>`)
    })
    this.elements.results.delay(350).fadeIn(800)
    this.openPreview()
  } // end of displayResults

  hideForm () {
    this.elements.body.css({ 'background-image': 'url("../../../assets/dist/img/background-blank.png")' })
    this.elements.form.fadeOut(300)
    this.elements.subtitle.fadeOut(300)
    this.elements.again.append(`AGAIN!`)
    if ($(window).width() > 768 ) {
      this.elements.titleID.animate({ 'left': '-=29vw' }, 800)
    }
    this.elements.otherButtons.fadeIn(2800)
  } // end hide form

  openPreview () {
    $('.card').on('click', (e) => {
      e.preventDefault()
      const gbid = $(e.currentTarget).data('gbid')
      this.elements.viewDiv.show()
      this.elements.results.hide()
      this.preview(gbid)
    })
  } // end of openPreview

  preview (gbid) {
    this.viewer = new google.books.DefaultViewer(
      document.querySelector('#view-div')
    )
    this.viewer.load(gbid, null, ()=> {
      this.elements.loading.hide()
      window.setTimeout (()=> {
          this.elements.back.append(`back to results`)
        },
        500
      )
    })
  }
} // end of Search class

const createSearch = new Search()

createSearch.init()

/* 
  아래에 코드를 작성해주세요.
*/

const searchBtn = document.querySelector(".search-box__button")
const API_KEY = '5d74cdce2c16c1a3cd8765b972c5a405'

const fetchAlbums = function (page=1, limit=10) {
  const keyword = document.querySelector('.search-box__input ').value
  axios({
    method : 'GET',
    url : 'https://ws.audioscrobbler.com/2.0/',
    params : {
      method: 'album.search',
      album : keyword,
      api_key : API_KEY,
      format: 'json',
    }
  })
    .then((response) => {
      console.log(response.data.results.albummatches.album)
      const albums = response.data.results.albummatches.album
      albums.forEach((album) => {
        const { artist } = album
        const { name } = album
        const image = album.image[1]['#text']
        const { url } = album

        const divTag = document.createElement('div')
        divTag.classList.add('search-result__card')
        divTag.addEventListener('click', () => {
          window.location.href = url
        })

        const albumImage = document.createElement('img')
        albumImage.src = image
        albumImage.url

        const divText = document.createElement('div')
        divText.classList.add('search-result__text')

        const albumArtist = document.createElement('h2')
        albumArtist.textContent = artist

        const albumName = document.createElement('p')
        albumName.textContent = name

        divText.appendChild(albumArtist)
        divText.appendChild(albumName)

        divTag.appendChild(albumImage)
        divTag.appendChild(divText)

        const resultArea = document.querySelector('.search-result')
        resultArea.appendChild(divTag)
      });
    })

    .catch((response) => {
      alert('잠시 후 다시 시도해주세요')
    })
}
searchBtn.addEventListener('click', fetchAlbums)


// Application name	localhost
// API key	5d74cdce2c16c1a3cd8765b972c5a405
// Shared secret	5919291b8825f97120d8e91731b26a84
// Registered to	pjhch1009

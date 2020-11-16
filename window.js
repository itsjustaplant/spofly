const spotify = require('spotify-node-applescript')
let base_api_url = "http://colorflyv1.herokuapp.com/v1/color/"
const genius = require('genius-lyrics-api')

const getColor = (api_url) =>{
    const xhr = new XMLHttpRequest()
    xhr.open('GET', api_url)
    xhr.onload = () =>{
        const data = JSON.parse(xhr.response)
        let background_color = data['color_0']
        let text_color = data['color_1']
        document.getElementById('body').style.backgroundColor = background_color
        document.getElementById('song_title').style.color = text_color
        document.getElementById('song_title').style.backgroundColor = background_color
        document.getElementById('lyrics').style.color = text_color
    }
    xhr.send()
}

const renderPage = () =>{
    spotify.getTrack((err, track) =>{
        let temp_track = track['name']

        if (temp_track !== track_name){
            let track_name = track['name']
            let image_url = track['artwork_url']
            let api_url = base_api_url + image_url
            let artist_name = track['artist']
            getColor(api_url)
            const options = {
                apiKey: '--insert api key here--',
                title: track['name'],
                artist: track['artist'],
                optimizeQuery: true
            }
            genius.getLyrics(options).then((lyrics) => {
                document.getElementById('lyrics').textContent = lyrics
            })
            document.getElementById('cover_art').src = image_url
            document.getElementById('track_name').textContent = track_name
            document.getElementById('artist_name').textContent = artist_name
        }
    })
}
renderPage()
window.setInterval(renderPage, 10000)
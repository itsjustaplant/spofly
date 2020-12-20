const spotify = require('spotify-node-applescript')
let color_base_url = "https://colorflyv1.herokuapp.com/v1/color/"
let lyrics_base_url = "https://colorflyv1.herokuapp.com/v1/lyrics/"

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

const getLyrics = (api_url, opt) =>{
    const xhr = new XMLHttpRequest()
    xhr.open('POST', api_url, true)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
        document.getElementById('lyrics').textContent = data['lyrics']
    }
    xhr.send(JSON.stringify(opt))
}

const renderPage = () =>{
    spotify.getTrack((err, track) =>{
        let track_name = track['name']
        if (document.getElementById('track_name').textContent !== track_name){
            let image_url = track['artwork_url']
            let api_url = color_base_url + image_url
            let artist_name = track['artist']
            const options = {
                artist: track['artist'],
                song: track['name']
            }
            getColor(api_url)
            getLyrics(lyrics_base_url, options)
            document.getElementById('cover_art').src = image_url
            document.getElementById('track_name').textContent = artist_name + " - " + track_name
        }
    })
}
renderPage()
window.setInterval(renderPage, 10000)
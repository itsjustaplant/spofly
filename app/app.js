const spotify = require('spotify-node-applescript')

const api_base_url = "https://colorflyv1.herokuapp.com/v1/"

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
        let check_name = track['artist'] + " - " + track_name
        if (document.getElementById('track_name').textContent !== check_name){
            let image_url = track['artwork_url']
            let api_url = api_base_url + "/color/" + image_url
            let artist_name = track['artist']
            const options = {
                artist: track['artist'],
                song: track['name']
            }
            getColor(api_url)
            getLyrics(api_base_url + "/lyrics/", options)
            document.getElementById('cover_art').src = image_url
            document.getElementById('track_name').textContent = artist_name + " - " + track_name
        } else if(!navigator.onLine){
            document.getElementById('status').textContent = "😞mayday we've lost connection😞"
            document.getElementById('status_bar').style.backgroundColor = '#ff5c5c'
            document.getElementById('status_bar').style.animation = 'reverse-snap 0.5s forwards'
        } else if(navigator.onLine){
            document.getElementById('status_bar').style.animation = 'snap 2s forwards'
        }
    })
}
renderPage()
window.setInterval(renderPage, 10000)
const spotify = require('spotify-node-applescript')
const path = require('path')
const api_base_url = "https://colorflyv1.herokuapp.com/v1/"
const kanye_rest = "https://api.kanye.rest"

const getColor = (api_url) =>{
    const xhr = new XMLHttpRequest()
    const elem_body = document.getElementById('body')
    const elem_song_title = document.getElementById('song_title')
    const elem_lyrics = document.getElementById('lyrics')

    xhr.open('GET', api_url, true)
    xhr.onload = () =>{
        const data = JSON.parse(xhr.response)
        let background_color = data['color_0']
        let text_color = data['color_1']
        elem_body.style.backgroundColor = background_color
        elem_song_title.style.color = text_color
        elem_song_title.style.backgroundColor = background_color
        elem_lyrics.style.color = text_color
    }
    xhr.send()
}

const getKanye = () =>{
    const xhr = new XMLHttpRequest()
    const elem_lyrics = document.getElementById('lyrics')
    console.log(document.getElementById('lyrics').style.color)
    if(document.getElementById('lyrics').style.color !== "rgb(224, 186, 13)"){
        xhr.open('GET', kanye_rest)
        xhr.onload = () =>{
            elem_lyrics.style.marginTop = "65vh"
            elem_lyrics.style.fontSize = "22px"
            elem_lyrics.textContent = "'" + JSON.parse(xhr.response)['quote'] + "'\n\t" + "Kanye West"
            elem_lyrics.style.fontStyle = "Italic"
        }
        xhr.send()
    }

}

const getLyrics = (api_url, opt) =>{
    const xhr = new XMLHttpRequest()
    const elem_lyrics = document.getElementById('lyrics')

    xhr.open('POST', api_url, true)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
        elem_lyrics.textContent = data['lyrics']
    }
    xhr.send(JSON.stringify(opt))
}

const renderPage = () =>{
    spotify.getTrack((err, track) =>{
        let track_name = track['name']
        let check_name = track['artist'] + " - " + track_name

        const elem_lyrics = document.getElementById('lyrics')
        const elem_track_name = document.getElementById('track_name')
        const elem_cover_art = document.getElementById('cover_art')
        const elem_body = document.getElementById('body')
        const elem_song_title = document.getElementById('song_title')

        if (document.getElementById('track_name').textContent !== check_name){
            let artist_name = track['artist']

            const options = {
                artist: track['artist'],
                song: track['name']
            }

            if(artist_name === ""){

                elem_track_name.textContent = track_name
                elem_cover_art.src = path.join(__dirname, "../assets/glitter_slow.gif")
                elem_cover_art.style.backgroundColor = "#343435"
                elem_body.style.backgroundColor = "#343435"
                elem_song_title.style.color = "#E0BA0D"
                elem_song_title.style.backgroundColor = "#343435"
                getKanye()
                elem_lyrics.style.color = "#E0BA0D"

            } else{
                let image_url = track['artwork_url']

                elem_cover_art.src = image_url
                elem_track_name.textContent = artist_name + " - " + track_name

                getColor(api_base_url + "/color/" + image_url)
                getLyrics(api_base_url + "/lyrics/", options)
            }

        } else if(!navigator.onLine){
            document.getElementById('status').textContent = "😞mayday we've lost connection😞"
            document.getElementById('status_bar').style.backgroundColor = '#ff5c5c'
            document.getElementById('status_bar').style.animation = 'reverse-snap 2s forwards'
        } else if(navigator.onLine){
            document.getElementById('status_bar').style.animation = 'snap 2s forwards'
        }
    })
}
renderPage()
window.setInterval(renderPage, 10000)
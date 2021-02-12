const spotify = require('spotify-node-applescript')
const path = require('path')
const API_BASE_URL = "https://colorflyv1.herokuapp.com/v1/"
const KANYE_REST_BASE_URL = "https://api.kanye.rest"

const getColor = (api_url) =>{
    let elem_body = document.getElementById('body')
    let elem_song_title = document.getElementById('song_title')
    let elem_lyrics = document.getElementById('lyrics')
    fetch(api_url, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }).then(response => response.json())
        .then(data =>{
            let background_color = data['color_0']
            let text_color = data['color_1']
            elem_body.style.backgroundImage = "url('')"
            elem_body.style.backgroundColor = background_color
            elem_song_title.style.backgroundColor = background_color
            elem_song_title.style.color = text_color
            elem_lyrics.style.color = text_color
        })
}

const getKanye = () =>{
    const xhr = new XMLHttpRequest()
    const elem_lyrics = document.getElementById('lyrics')
    const elem_logo_div = document.getElementById('intro')
    const elem_app = document.getElementById('app')
    const elem_body = document.getElementById('body')

    if(document.getElementById('lyrics').style.color !== "rgb(224, 186, 13)"){
        xhr.open('GET', KANYE_REST_BASE_URL)
        xhr.onload = () =>{
            elem_body.style.backgroundImage = "url('')"
            elem_lyrics.style.marginTop = "65vh"
            elem_lyrics.style.fontSize = "22px"
            elem_lyrics.textContent = "'" + JSON.parse(xhr.response)['quote'] + "'\n\t" + "Kanye West"
            elem_lyrics.style.fontStyle = "Italic"
            elem_logo_div.style.animation = "fade-out 1s forwards"
            elem_app.style.animation = "fade-in 1s forwards"
        }
        xhr.send()
    }
}

const getLyrics = (opt) =>{
    const elem_lyrics = document.getElementById('lyrics')
    const elem_logo_div = document.getElementById('intro')
    const elem_app = document.getElementById('app')
    const elem_body = document.getElementById('body')

    fetch("https://colorflyv1.herokuapp.com/v1//lyrics/", {
        headers: {
            "accept": "*/*",
            "accept-language": "en-US",
            "content-type": "application/json; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        body: JSON.stringify(opt),
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    }).then(response => response.json())
        .then(data =>{
            elem_lyrics.textContent = data['lyrics']
            elem_body.style.overflow = "visible"
            elem_logo_div.style.animation = "fade-out 1s forwards"
            elem_app.style.animation = "fade-in 1s forwards"
        })
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
                elem_cover_art.src = path.join(__dirname, "../assets/images/glitter_slow.gif")
                elem_cover_art.style.backgroundColor = "#343435"
                elem_body.style.backgroundColor = "#343435"
                elem_song_title.style.color = "#E0BA0D"
                elem_song_title.style.backgroundColor = "#343435"
                getKanye()
                elem_lyrics.style.color = "#E0BA0D"

            } else{
                let artwork_url = track['artwork_url']

                elem_cover_art.src = artwork_url
                elem_track_name.textContent = artist_name + " - " + track_name

                getColor(API_BASE_URL + "/color/" + artwork_url)
                getLyrics(options)
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
window.setInterval(renderPage, 10000)
const SPOTIFY_URL = "https://accounts.spotify.com"
const SPOTIFY_API_URL = "https://api.spotify.com"
const CLIENT_ID = "94bc89eaaa30437aba608352e9de4565"
const REDIRECT_URI = "https://colorflyv1.herokuapp.com/callback"
const API_BASE_URL = "https://colorflyv1.herokuapp.com/v1/"

const electron = require('electron')

const loginBtn = document.getElementById('login-button')
const exitBtn = document.getElementById('exit-button')

const remote = electron.remote
const BrowserWindow = remote.BrowserWindow

const postAuth = (opt) =>{
    const xhr = new XMLHttpRequest()

    xhr.open('POST', API_BASE_URL + "auth", true)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
        sessionStorage.setItem('token', data['token'])
    }
    xhr.send(JSON.stringify(opt))
}
const getSong = async () =>{
    const xhr = new XMLHttpRequest()
    const elem_track_name = document.getElementById('song-title')

    xhr.open('GET', SPOTIFY_API_URL + "/v1/me/player/currently_playing", true)
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    xhr.onload = () => {
        if(xhr.response === ""){
            const logo_text = document.getElementById('landing__logo')
        } else {
            const data = JSON.parse(xhr.response)
            let artist = data['item']['artists'][0]['name']
            let song = data['item']['name']
            let title = artist + " - " + song
            let artwork_url = data['item']['album']['images'][0]['url']
            if(title !== elem_track_name.textContent){

                const options = {
                    artist: artist,
                    song: song,
                }
                getColor(API_BASE_URL + "/color/" + artwork_url)
                getLyrics(options, artwork_url)
            }
        }
    }
    xhr.send()
}

const getLyrics = (opt, url) =>{
    const elem_lyrics = document.getElementById('lyrics')
    const elem_landing = document.getElementById('landing-div')
    const elem_app = document.getElementById('app-div')
    const elem_body = document.getElementById('body')
    const elem_track_name = document.getElementById('song-title')
    const elem_artwork = document.getElementById("artwork")

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
            elem_track_name.textContent = opt['artist'] +"-" + opt['song']
            elem_artwork.src = url
            elem_landing.style.animation = "snap 1s forwards"
            elem_app.style.animation = "iron-snap 1s forwards"
        })
}

const getColor = (api_url)  =>{
    let elem_body = document.getElementById('body')
    let elem_song_title = document.getElementById('song-title')
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
loginBtn.addEventListener('click', function (event) {
    let spotify = new BrowserWindow({
        width: 500,
        height: 500,
        frame: true,
        x:0,
        y:0,
        alwaysOnTop:true,
        resizable:false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const url = SPOTIFY_URL + "/authorize?client_id=" + CLIENT_ID + "&response_type=code&redirect_uri=" + REDIRECT_URI + "&scope=user-read-private%20user-read-email%20user-read-currently-playing%20user-modify-playback-state"
    spotify.loadURL(url)
    spotify.show()
    spotify.webContents.on('did-redirect-navigation', function (event, newUrl) {
        event.preventDefault();
        if (newUrl.includes('https://colorflyv1.herokuapp.com/callback')) {
            if (newUrl.includes('code=')) {
                let code = newUrl.split('code=')[1];
                code = code.split('#')[0];
                spotify.close()
                let options = {
                    token: code
                }
                document.getElementById('artwork').style.visibility = "revert"
                document.getElementById('song-title').style.visibility = "revert"
                document.getElementById('lyrics').style.visibility = "revert"
                postAuth(options)
                document.getElementById('body').style.backgroundImage = "url('')"
                setInterval(getSong, 5000)
            } else {
                spotify.close();
            }
        }
    });
})
exitBtn.addEventListener('click', function (){
    const window = remote.getCurrentWindow()
    window.close()
})
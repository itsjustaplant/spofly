const {app, BrowserWindow} = require('electron') // http://electronjs.org/docs/api
const path = require('path') // https://nodejs.org/api/path.html
const url = require('url') // https://nodejs.org/api/url.html

let window = null

// Wait until the app is ready
app.once('ready', () => {
    // Create a new window
    window = new BrowserWindow({
        // Set the initial width to 400px
        width: 480,
        // Set the initial height to 500px
        height: 800,
        // Don't show the window until it ready, this prevents any white flickering
        minWidth: 480,
        maxWidth: 600,
        minHeight:800,
        show: false,
        frame: false,
        icon: __dirname + "/icon/spofly_512x512.icns",
        // Don't allow the window to be resized.
        resizable: true,
        webPreferences: {
            webSecurity: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            allowRunningInsecureContent: false,
            experimentalFeatures: false,
            devTools: true
        }
    })

    // Load a URL in the window to the local index.html path
    window.loadURL(url.format({
        pathname: path.join(__dirname, './app/app.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Show window when page is ready
    window.once('ready-to-show', () => {
        console.log("we are here")
        window.show()
    })
})
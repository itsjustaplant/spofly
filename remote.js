const electron = require('electron')

const remote = electron.remote

const closeBtn = document.getElementById('close-button')

closeBtn.addEventListener('click', function (event) {
    const window = remote.getCurrentWindow();
    window.close();
})
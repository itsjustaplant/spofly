const electron = require('electron')

const remote = electron.remote

const closeBtn = document.getElementById('close-button')
const minimizeBtn = document.getElementById("minimize-button")

closeBtn.addEventListener('click', function (event) {
    const window = remote.getCurrentWindow();
    window.close();
})

minimizeBtn.addEventListener("click", function (event){
    const window = remote.getCurrentWindow();
    window.minimize()
})

const closeBtn = document.getElementById('close-button')
const minimizeBtn = document.getElementById("minimize-button")
const emptyBtn = document.getElementById('empty-button')

closeBtn.addEventListener('click', function (event) {
    const window = remote.getCurrentWindow();
    window.close();
})

minimizeBtn.addEventListener("click", function (event){
    const window = remote.getCurrentWindow();
    window.minimize()
})

emptyBtn.addEventListener("click", function (){
    const elem_bubble_text = document.getElementById('bubble_text')
    const url = "https://github.com/itsjustaplant/spofly"
    document.execCommand("copy")
    elem_bubble_text.textContent = "COPIED!"
})
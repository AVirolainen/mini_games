const character = document.getElementById("character")
const block = document.getElementById("block")

setTimeout(()=>{
    block.classList.add("block-animation")
}, 1000)

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate")
    }
    setTimeout(
        ()=>{
            character.classList.remove("animate")
        }, 500
    )
}

const render = setInterval(function(){

    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"))
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"))

    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none"
        block.style.display = "none"
        alert("gg")
    }
}, 10)
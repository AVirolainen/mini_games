const character = document.getElementById("character")
const block = document.getElementById("block")

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

const startGame = ()=>{
    setTimeout(()=>{
        block.classList.add("block-animation")
    }, 1000) 
}
startGame()

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

    if(blockLeft<20 && blockLeft>-80 && characterTop>=130){
        block.style.display = "none"
        block.classList.remove("block-animation")
        modal.style.display = "block";
    }
}, 10)


span.onclick = function() {
  modal.style.display = "none";
  block.style.display = "inline"
  startGame()
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    block.style.display = "inline"
    startGame()
  }
}
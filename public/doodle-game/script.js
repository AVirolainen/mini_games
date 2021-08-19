const wrapper =()=>{initGame()}

function initGame(){
const grid = document.querySelector(".grid")
const doodler = document.createElement("img")
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

let startPoint = 150
let doodlerLeftSpace = 50
let doodlerBottomSpace = startPoint

let isGameOver = false

let platformAmount = 5
let platforms = []

let upperId
let downId

let isJumping = true
let isGoingLeft
let isGoingRight
let leftTimerId
let rightTimerId

let score = 0

class Platform{
    constructor(newPlatBottom){
        this.left = Math.random()*315
        this.bottom = newPlatBottom
        this.visual = document.createElement('img')

        const visual = this.visual
        visual.setAttribute('src', './assets/platform.png')
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom +'px'
        grid.appendChild(visual)
    }
}

function createDoodler(){
    grid.appendChild(doodler)
    doodler.setAttribute('src', '../assets/doodle.png')
    doodler.classList.add("doodler")

    doodlerLeftSpace = platforms[0].left

    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
}


function createPlatforms(){
    for(let i=0; i<platformAmount; i++){
        let platformGap = 600/platformAmount

        let newPlatBottom = 100+i*platformGap
        let newPlatform = new Platform(newPlatBottom)

        platforms.push(newPlatform)
        console.log(platforms)
    }
}

function movePlatform(){
    if(doodlerBottomSpace > 200){
        platforms.forEach(platform=>{
            platform.bottom -= 4
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'

            if(platform.bottom < 10){
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                firstPlatform.removeAttribute('src')
                grid.removeChild(firstPlatform)
                platforms.shift()
                let newPlatform = new Platform(600)
                platforms.push(newPlatform)
                score +=1

            }
        })
    }
}

function jump(){
    clearInterval(downId)
    isJumping = true
    upperId = setInterval(function(){
        doodlerBottomSpace +=20
        doodler.style.bottom = doodlerBottomSpace+'px'

        if(doodlerBottomSpace>startPoint+200){
            fall()
        }
    }, 30)
}

function fall(){
    clearInterval(upperId)
    isJumping = false
    downId = setInterval(function(){
        doodlerBottomSpace -=6
        doodler.style.bottom = doodlerBottomSpace+'px'
        if(doodlerBottomSpace<=0){
            gameOver()
        }
        platforms.forEach(platform => {
            if (
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= (platform.bottom + 15)) &&
                ((doodlerLeftSpace + 90) >= platform.left) && 
                (doodlerLeftSpace <= (platform.left + 85)) &&
                !isJumping
                ) {
                console.log('tick')
                startPoint = doodlerBottomSpace
                jump()
                }
            })
    }, 30)

}

function control(e){
    if(e.key === 'ArrowLeft'){
        moveLeft()
    }
    else if(e.key === 'ArrowRight'){
        moveRight()
    }else if(e.key === 'ArrowUp'){
        moveStraight()
    }
}

function moveStraight(){
    isGoingLeft = false
    isGoingRight = false
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
}



function moveLeft(){
    if(isGoingRight){
        clearInterval(rightTimerId)
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(() => {
        if(doodlerLeftSpace>=0){
            doodlerLeftSpace -=1
            doodler.style.left = doodlerLeftSpace+'px'
        } else moveRight()
    }, 1);
}

function moveRight(){
    if(isGoingLeft){
        clearInterval(leftTimerId)
        isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(() => {
        if(doodlerLeftSpace<=313){
            doodlerLeftSpace +=1
            doodler.style.left = doodlerLeftSpace+'px'
        } else moveLeft()
    }, 1);
}

function gameOver(){
    console.log('gameOver')
    isGameOver = true
    while(grid.firstChild){
        grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score
    clearInterval(upperId)
    clearInterval(downId)
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)

    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        grid.innerHTML = ""
        wrapper()
    }
}

span.onclick = function() {
    modal.style.display = "none";
    grid.innerHTML = ""
    wrapper()
}

function start(){
    if(!isGameOver){
        createPlatforms()
        createDoodler()
        
        setInterval(movePlatform, 30)  
        jump()
        
        document.addEventListener('keyup', control)
    }
}


start()
}

initGame()



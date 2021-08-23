const grid = document.querySelector(".grid")
const resultsContainer = document.getElementById('results')
let currentShooterId = 202
const width = 15
let invadersId
let direction = 1
let goingRight = true

for(let i=0; i<225; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39

]

function draw(){
    for (let i = 0; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.add('invader')
    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove('invader')
    }
  }

squares[currentShooterId].classList.add('shooter')
draw()


function moveShooter(e){
    squares[currentShooterId].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterId % width !== 0) currentShooterId -=1
            break
        case 'ArrowRight':
            if(currentShooterId % width < width -1) currentShooterId +=1
            break
    }
    squares[currentShooterId].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    
    remove()

    if(rightEdge && goingRight){
        for(let i=0; i<alienInvaders.length; i++){
            alienInvaders[i] += width+1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight){
        for(let i=0; i<alienInvaders.length; i++){
            alienInvaders[i] += width-1
            direction = 1
            goingRight = true
        }
    }
 
    for(let i=0; i<alienInvaders.length; i++){
        alienInvaders[i] +=direction
    }

    draw()

    if(squares[currentShooterId].classList.contains('invader', 'shooter')){
        resultsContainer.innerHTML = "Game Over"
        clearInterval(invadersId)
    }
}

invadersId = setInterval(moveInvaders, 100)



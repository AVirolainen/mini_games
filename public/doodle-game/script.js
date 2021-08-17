document.addEventListener("DOMContentLoaded", ()=>{
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div")

    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150

    let isGameOver = false

    let platformAmount = 5
    let platforms = []

    let upperId
    let downId

    let isJumping = true



    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add("doodler")

        doodlerLeftSpace = platforms[0].left

        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class Platform{
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random()*315

            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom +'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms(){
        for(let i=0; i<platformAmount; i++){
            let platformGap = 600/platformAmount

            let newPlatBottom = 100+(i*platformGap)
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
            })
        }
    }

    function jump(){
        clearInterval(downId)
        isJumping = true
        upperId = setInterval(function(){
            doodlerBottomSpace +=20
            doodler.style.bottom = doodlerBottomSpace+'px'

            if(doodlerBottomSpace>350){
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
        }, 30)

        platforms.forEach(platform => {
            if (
              (doodlerBottomSpace >= platform.bottom) &&
              (doodlerBottomSpace <= (platform.bottom + 15)) &&
              ((doodlerLeftSpace + 60) >= platform.left) && 
              (doodlerLeftSpace <= (platform.left + 85)) &&
              !isJumping
              ) {
                console.log('tick')
                jump()
              }
          })
    }

    function control(e){
        if(e.key === 'ArrowLeft'){
            //move left
        }
        else if(e.key === 'ArrowRight'){
            //move right
        }
    }

    function gameOver(){
        console.log('gameOver')
        isGameOver = true
        clearInterval(upperId)
        clearInterval(downId)
    }

    function start(){
        if(!isGameOver){
            createPlatforms()
            createDoodler()
            
            setInterval(movePlatform, 30)  
            jump()      
        }
    }

    start()
})

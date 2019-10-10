const canvas = document.getElementById("board")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)

//Intro creation
document.addEventListener("DOMContentLoaded", function() {
  const introBlock =  document.getElementById('intro')

  introBlock.style.width = `${canvas.width}px` 
  introBlock.style.top = `${canvas.offsetTop}px` 
  introBlock.style.left = `${canvas.offsetLeft}px` 

  document.querySelector('button').addEventListener("click", function() {
    game.start()
    introBlock.remove()
  })
})
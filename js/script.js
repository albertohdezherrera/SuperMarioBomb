const canvas = document.getElementById("board")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
game.start()
const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearEl = document.getElementById('clear')
const undo = document.getElementById('undo')
const redo = document.getElementById('redo')

let ctx = canvas.getContext('2d')

let size = 10
let color = 'black'
let isPressed = false
let x
let y
let restore_array = []
let index = -1

canvas.addEventListener('mousedown', e => {
  isPressed = true

  x = e.offsetX
  y = e.offsetY

  // console.log(isPressed, x, y)
})

canvas.addEventListener('mouseup', e => {
  isPressed = false

  x = undefined
  y = undefined

  // console.log(isPressed, x, y)

  restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
  index += 1

  console.log(restore_array)
})

canvas.addEventListener('mousemove', e => {
  const x2 = e.offsetX
  const y2 = e.offsetY
  if (isPressed) {
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)

    x = x2
    y = y2
  }
})

function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

function updateSizeOnScreen() {
  sizeEl.innerText = `${size}`
}

increaseBtn.addEventListener('click', () => {
  size += 5

  if (size > 50) {
    size = 0
  }

  updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
  size -= 5

  if (size <= 5) {
    size = 5
  }

  updateSizeOnScreen()
})

clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  restore_array = []
  index = -1
})

colorEl.addEventListener('change', e => (color = e.target.value))

undo.addEventListener('click', () => {
  if (index <= 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    restore_array = []
    index = -1
  } else {
    index -= 1
    restore_array.pop()
    ctx.putImageData(restore_array[index], 0, 0)
  }
})

redo.addEventListener('click', () => {
  console.log(123)
})

const konami = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]

class App {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.icon = document.getElementById('icon')
    this.ctx = this.canvas.getContext('2d')
    this.mouse = { x: 0, y: 0 }
    this.mousein = false
    this.keys = []
    this.smileys = ['😍', '🙃', '😉', '🌝', '😸', '🌈', '☀️', '🔥']

    this.now = Date.now()
    this.lastTime = this.now
    this.deltaTime = 0
    this.currentTime = 0

    this.log()

    window.addEventListener('resize', this.onResize.bind(this))
    document.addEventListener('mouseenter', () => (this.mousein = true))
    document.addEventListener('mouseleave', () => (this.mousein = false))
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    this.onResize()
  }

  onMouseMove(e) {
    if (!this.mousein) this.mousein = true
    this.mouse = {
      x: e.x,
      y: e.y
    }
  }

  animate() {
    this.raf = requestAnimationFrame(this.animate.bind(this))

    this.now = Date.now()
    this.deltaTime = (this.now - this.lastTime) / 1000
    this.lastTime = this.now
    const lastTime = this.currentTime
    this.currentTime += this.deltaTime

    if (
      this.mousein &&
      Math.floor(lastTime * 10) < Math.floor(this.currentTime * 10)
    ) {
      this.draw()
    }
  }

  draw() {
    const i = Math.round(Math.random() * (this.smileys.length - 1))
    const smiley = this.smileys[i]
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(this.mouse.x, this.mouse.y)
    this.ctx.font = '30px sans-serif'
    this.ctx.fillText(smiley, -15, 15)
    this.ctx.closePath()
    this.ctx.restore()
  }

  log() {
    console.log(
      '%c Hi you little curious! ',
      'background: #C1EDF5; color: #EA4C64'
    )
    console.log("There's some easter eggs, try to find them all 😘")
  }

  konami() {
    console.log('%c Ho yeah 😎 ', 'background: #C1EDF5; color: #EA4C64')
    this.onResize()
    this.smileys = ['🍆', '💎', '😏', '👃', '💦', '😈']
    this.icon.innerHTML = '🍑'
  }

  onKeyDown(e) {
    this.keys.push(e.key)
    const i = this.keys.length - 1
    if (this.keys[i] !== konami[i]) this.keys = []
    if (this.keys.length === konami.length) this.konami()
  }

  onResize() {
    if (this.raf) cancelAnimationFrame(this.raf)

    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth

    this.animate()
  }
}

new App()

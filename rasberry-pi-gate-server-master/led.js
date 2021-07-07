const Gpio = require('onoff').Gpio;

// Configure LED (real or simulated)
const LED_GPIO = 4
let led
if (Gpio.accessible) { // Use real LED
  led = new Gpio(LED_GPIO, 'out');
} else { // Simulate LED
  led = {
    value: 0,
    writeSync: value => {
      console.log(`virtual led now has value: ${value}`)
      this.value = value
    },
    readSync: () => this.value,
    unexport: _ => _,
  }
}

// LED Blinking
let blinking = false
const performLEDBlink = (duration) => {
  blinking = true
  // Toggle the state of the LED connected to GPIO4 every 250ms
  blinkLED()
  // End blinking after <duration> ms
  setTimeout(() => blinking = false, duration)
}

const blinkLED = () => {
  if (!blinking) {
    return led.writeSync(0)
  }
  try {
    const value = led.readSync()
    led.writeSync(value ^ 1)
    setTimeout(blinkLED, 250)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  unexport: led.unexport,
  performLEDBlink,
}

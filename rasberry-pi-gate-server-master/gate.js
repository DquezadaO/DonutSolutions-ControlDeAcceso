const led = require('./led')

class GateController {
  open() {
    led.performLEDBlink(3000) // blink LED for 3 seconds total
  }
}

const gate = new GateController()

module.exports = gate
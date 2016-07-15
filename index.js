// --------------------------------------------------------------------------------------------------------------------

"use strict"

// --------------------------------------------------------------------------------------------------------------------

class LogDis {
  constructor() {
    this.inputs = []
    this.filters = []
    this.outputs = []
  }

  input(input) {
    // remember this for later
    this.inputs.push(input)

    // wait for 'data' events
    input.on('data', (data) => {
      // filter first
      for(let i = 0; i < this.filters.length; i++) {
        data = this.filters[i](data)

        // check if something went wrong or nothing was returned
        if ( !data ) {
          // don't do anything, since the filter should have logged it
          return
        }
      }

      // then output
      for(let i = 0; i < this.outputs.length; i++) {
        this.outputs[i](data, (err) => {
          console.log('Output done:', err)
        })
      }
    })

    return this
  }

  filter(filter) {
    this.filters.push(filter)
    return this
  }

  output(output) {
    this.outputs.push(output)
    return this
  }
}

function logdis() {
  return new LogDis()
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = logdis

// --------------------------------------------------------------------------------------------------------------------

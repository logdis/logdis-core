# LogDis #

LogDis is a logging framework which allows you to do whatever the hell you want. It's kinda like logstash, but easier
to configure and use.

Seriously. Just try it.

It has inputs, filters and outputs.

## Inputs ##

Are event emitters.

## Filters ##

Are synchronous. Take data, return data.

## Outputs ##

Are asynchronous. Take data, calls back when complete.

## Example ##

This example will read from StdIn, remove blank lines, convert each line to JSON, scrub the 'username' field, add a
timestamp to each line, then write each line to stdout. The program will quit when `stdin` closes:

```js
// core
var logdis = require('./logdis-core')

// inputs
var fromStdIn  = require('./logdis-input-stdin')()

// filters
var removeBlankLines = require('./logdis-filter-remove-blank-lines')()
var convertToJson = require('./logdis-filter-to-json')()
var scrub = require('./logdis-filter-scrub')({ scrub : { 'username' : true } })
var timestamp = require('./logdis-filter-timestamp')({ fieldname : 'timestamp', format : 'epoch' })

// outputs
var toStdOut = require('./logdis-output-stdout')()

logdis()
  .input(fromStdIn)
  .filter(removeBlankLines)
  .filter(convertToJson)
  .filter(scrub)
  .filter(timestamp)
  .output(toStdOut)
```

## Getting Started ##

You can use logdis programmatically, or through a configurable command line program.

### Command Line ###

Install the `logdis-cli` package (which depends on `logdis-core`). Install any inputs, filters and outputs you'd like
to use.

Then just run the command line and point to the config file:

```sh
$ logdis config.json
```

To mimick the above example, `config.json` would look like:

```
{
    "error" : "stderr",
    "pipeline" : [
        {
            "type" : "input",
            "plugin" : "stdin"
        },
        {
            "type" : "filter",
            "plugin" : "remove-blank-lines" },
        {
            "type" : "filter",
            "plugin" : "to-json"
        },
        {
            "type" : "filter",
            "plugin" : "scrub",
            "opts" : { scrub : [ 'username' ] }
        },
        {
            "type" : "filter",
            "plugin" : "to-json",
            "opts" : { "fieldname" : "timestamp", "format" : "epoch" },
        {
            "type" : "output",
            "plugin" : "stdout"
        },
    ]
}
```

### Programmatic API ###

Decide what kinds of inputs, filters and outputs you'd like to use, then install them:

```
npm install --save logdis-core logdis-input-stdin logdis-filter-timestamp logdis-output-stdout
```

Then just create a `logdis` instance, configure and add those same inputs, filters and outputs.

## License ##

ISC.

(Ends)

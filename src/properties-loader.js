const Path = require('path')
var propertiesPath = null
process.argv.forEach(function(val, i){
    if(/^.*properties.json$/.test(val)) propertiesPath = val
})
var props = require(propertiesPath ? propertiesPath : './properties.json')
var callsite = require('callsite')

module.exports = props


for(let m in props.p4ngModules)
    module.exports[m+'Path'] = makePathSolver(Path.resolve(__dirname, props.p4ngModules[m]),Path)

// makes relative path finder
// closures yay
function makePathSolver(absolutePath, pathModule){
    return function(){
        var stack = callsite()
        requester = stack[1].getFileName()
        var found = pathModule.relative(pathModule.dirname(requester), absolutePath)
        return './'+found
    }
}

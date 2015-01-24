var q = require('q');

function waitFor(condition, timeout, frequency){
  timeout = timeout || 1000
  frequency = frequency || 10
  var now = new Date().getTime()

  var check = function(error){
    if((new Date().getTime() - now) > timeout) { throw error }
    return justWait(frequency)
             .then(condition)
             .then(null, check)
  }

  return check()
}

function justWait(timeout){
  return new q.promise(function(resolve, reject){
    setTimeout(resolve, timeout)
  })
}


module.exports = {
  waitFor: waitFor,
  justWait: justWait
}

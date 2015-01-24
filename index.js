var q = require('q');
module.exports = {
  waitFor: function(condition, timeout, frequency){
    timeout = timeout || 1000
    frequency = frequency || 10
    var now = new Date().getTime()
    
    var try = function(error){
      if((new Date().getTime() - now) > timeout) { throw error }
      return this.justWait(frequency)
                .then(condition)
                .then(null, try)
    }.bind(this)
    
    return try()
  },
  justWait: function(timeout){
    return new q.promise(function(resolve, reject){
      setTimeout(resolve, timeout)
    })
  }
}

var q = require('q');
module.exports = {
  waitFor: function(condition, timeout, frequency){
    timeout = timeout || 1000
    frequency = frequency || 10
    return new q.promise(function(resolve, reject){
      var timedout = false, it = setInterval(function(){
        try {
          condition()

          resolve()
          clearInterval(it)
        } catch(e){
          if(timedout) {
            reject(e)
            clearInterval(it)
          }
        }
      }, frequency)
      setTimeout(function(){
        timedout=true
      }, timeout)
    })
  },
  justWait: function(timeout){
    return new q.promise(function(resolve, reject){
      setTimeout(resolve, timeout)
    })
  }
}

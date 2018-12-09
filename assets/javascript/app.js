// Game Controller
var gameController = (function() {
  var test = 'hello'

  return {
    testfunc: function() {
      return test
    }
  }
})();




// UI Controller
var uiController = (function () {

  var cacheDom = {
    $startBtn: $('#start')
  }

  return {
    
    // Method to retreive all the DOM items
    getDom: function() {
      return cacheDom;
    }
  }

})();


// Global App Controller
var controller = (function (gameCtrl, uiCtrl) {
  
  // sets up event listeners for game
  var setupEventListeners = function() {
    var dom = uiCtrl.getDom();

    dom.$startBtn.on('click', function() {
      console.log('clicked');
    })
  }


  return {
    // initializes game
    init: function() {
      setupEventListeners();
    }
  }

})(gameController, uiController);


// initilize game
controller.init();
// Game Controller
var gameController = (function () {

  // Object containing all questions
  var questions = [{
    question: 'What will be alerted?',
    choices: ['undefined', '2', '6', '8'],
    src: 'azxfLt8w',
    answer: 1
  }, {
    question: 'What will this code alert?',
    choices: ['function', 'object', 'number', 'undefined'],
    src: 'or2u09hb',
    answer: 1
  }, {
    question: 'What is the result?',
    choices: ['true', 'false', 'TypeError', 'NaN'],
    src: 'ke4qa10v',
    answer: 1
  }, {
    question: 'What is alerted?',
    choices: ['number', 'undefined', 'string', 'function'],
    src: '3dat51zn',
    answer: 3
  }, {
    question: 'What will be printed to the console?',
    choices: ["['foo', 'bar', 'baz']", "['foo', 'bar', 'baz', 'bin']", "['bin', 'foo', 'bar', 'baz']", "bin"],
    src: 'mzosabd8',
    answer: 3
  }, {
    question: 'What will be printed to the console?',
    choices: ['TypeError', 'undefined', 'NaN', '4'],
    src: 'c7fuzqy5',
    answer: 2
  }, {
    question: 'What value will be alerted?',
    choices: ['1', '2', '3', 'undefined'],
    src: 'u7vnw6zb',
    answer: 1
  }, {
    question: 'What will be printed to the console?',
    choices: ['5', 'Runtime error', 'Nothing', 'Compilation Error'],
    src: '2h95g04p',
    answer: 0
  }, {
    question: 'What will happen after executing this code?',
    choices: ['Nothing', "alert '>undefined'", "alert '>1'", "alert '>2'"],
    src: 'zLk2dpwv',
    answer: 0
  }]

  var data = {

  }

  return {
    testfunc: function () {
      return test
    }
  }
})();





// UI Controller
var uiController = (function () {

  var cacheDom = {
    $startBtn: $('#start'),
    $gamePage: $('.game-page')
  }


  return {

    // Method to retreive all the DOM items
    getDom: function () {
      return cacheDom;
    },

    


    removeStartBtn: function () {
      cacheDom.$startBtn.animateCss('fadeOut', function() {
        cacheDom.$gamePage.empty();
      })
    }
  }

})();





// Global App Controller
var controller = (function (gameCtrl, uiCtrl) {

  // sets up event listeners for game
  var setupEventListeners = function () {
    var dom = uiCtrl.getDom();

    dom.$startBtn.on('click', uiCtrl.removeStartBtn)
  }


  return {
    // initializes game
    init: function () {
      setupEventListeners();
    }
  }

})(gameController, uiController);


// initilize game
controller.init();



// extend jquery to include animateCss with a callback function
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

// var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"],
//   list = $("ul.people"),
//   dynamicItems = "";

// $.each(localArr, function (index, value) {

//   dynamicItems += "<li id=" + index + ">" + value + "</li>";

// });

// list.append(dynamicItems);
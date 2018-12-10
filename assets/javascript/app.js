// global variable for timer
var timer;

// Game Controller
var gameController = (function () {

  // Object containing all questions
  var questions = [{
    question: 'What will be alerted?',
    choices: ['undefined', '2', '6', '8'],
    src: 'azxfLt8w',
    answer: 3
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
    currentQuestion: 0,
    correct: 0,
    incorrect: 0,
    timer: 90
  }

  return {
    getQuestion: function () {
      return questions[data.currentQuestion]
    },

    updateGame: function (result) {
      if (result) {
        data.correct++
      } else {
        data.incorrect++
      }

      data.currentQuestion++
    },

    getGameData: function () {
      var holder = [questions.length, data.currentQuestion]
      return holder;
    },

    getTime: function () {
      return data.timer;
    },

    resetTime: function () {
      data.timer = 90;
    }

  }
})();





// UI Controller
var uiController = (function () {

  var cacheDom = {
    $startBtn: $('#start'),
    $gamePage: $('.game-page'),
    $answers: $('.answers'),
    $question: $('.question-header'),
    $startPage: $('.start-page'),
    $answers: $('.answers'),
    $answerChoice: $('.answer-choice'),
    $result: $('#result'),
    $correctAnswer: $('#correct-answer'),
    $time: $('.time'),
    $results: $('.results'),
    $timer: $('#timer')
  }


  return {

    // Method to retreive all the DOM items
    getDom: function () {
      return cacheDom;
    },

    // loads code and question
    loadQuestion: function (code, q) {
      var htmlCode, htmlQ, newHtmlCode, newHtmlQ

      htmlCode = "<iframe src='//jsfiddle.net/chriskhalifaa/%src%/embedded/js/dark/' allowfullscreen='allowfullscreen' frameborder='0'></iframe>"
      htmlQ = "<h2 id='question'>%question%</h2>"

      newHtmlCode = htmlCode.replace('%src%', code)
      newHtmlQ = htmlQ.replace('%question%', q)

      cacheDom.$question.append(newHtmlCode).append(newHtmlQ);

    },

    // loads all choices for user to answer
    loadAnswers: function (arr) {
      var answers = "";

      $.each(arr, function (index, value) {
        answers += "<button class='button draw-border answer-choice' data-answer=" + index + ">" + value + "</button>"
      })

      cacheDom.$answers.append(answers);
    },

    displayResult: function (result, answer) {
      cacheDom.$results.show()

      if (result) {
        cacheDom.$result.text('Correct!').css('color', 'green');
      } else {
        cacheDom.$result.text('Incorrect!').css('color', 'red');
      }
      cacheDom.$correctAnswer.text('The answer is: ' + answer)

    },

    removeQuestion: function () {
      cacheDom.$answers.empty();
      cacheDom.$results.hide();
      cacheDom.$question.empty();
    },


    removeStartBtn: function () {
      cacheDom.$startBtn.hide();
      cacheDom.$time.css('visibility', 'visible')
    }
  }

})();





// Global App Controller
var controller = (function (gameCtrl, uiCtrl) {
  var dom = uiCtrl.getDom();
  var counter;

  // sets up event listeners for game
  var setupEventListeners = function () {
    // var dom = uiCtrl.getDom();

    dom.$startBtn.on('click', function () {
      uiCtrl.removeStartBtn();
      getNextQuestion();
      setTimer();
    })

    $(document).on('click', '.answer-choice', function (e) {
      dom.$answers.children().attr('disabled', true)
      $(this).css({
        'background': '#ffd93a',
        'color': 'black'
      });

      checkAnswer(e)
    })
  }

  // Gets next question in question array and then loads the question and choices
  var getNextQuestion = function () {
    var nextQuestion = gameCtrl.getQuestion();

    uiCtrl.loadQuestion(nextQuestion.src, nextQuestion.question);
    uiCtrl.loadAnswers(nextQuestion.choices);
  }

  var checkAnswer = function (e) {
    var question = gameCtrl.getQuestion();

    clearInterval(timer);

    if ($(e.target).attr('data-answer') == question.answer) {
      gameCtrl.updateGame(true);
      uiCtrl.displayResult(true);
    } else {
      gameCtrl.updateGame(false)
      uiCtrl.displayResult(false, question.choices[question.answer])
    }

    gameCtrl.resetTime();
    setTimeout(checkGame, 3500);
  }

  var checkGame = function () {
    var questionsAmt = gameCtrl.getGameData();
    uiCtrl.removeQuestion();

    if (questionsAmt[0] - 1 == questionsAmt[1]) {
      console.log('gameover')
    } else {
      getNextQuestion();
      setTimer();
    }
  }

  var timerCountDown = function () {
    // var counter = gameCtrl.getTime();
    counter--
    dom.$timer.text(counter);

    if (counter == 0) {
      console.log("times up")
      clearInterval(timer);
    }
  }

  var setTimer = function () {
    counter = gameCtrl.getTime();
    timer = setInterval(timerCountDown, 1000)
  }


  // var setTimer = function () {
  //   timer = setInterval(timerCountDown, 1000)
  // }


  return {
    // initializes game
    init: function () {
      setupEventListeners();
    }
  }

})(gameController, uiController);


// initilize game
controller.init();
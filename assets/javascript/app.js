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
    timer: 45
  }

  return {
    // returns current question data
    getQuestion: function () {
      return questions[data.currentQuestion]
    },

    // update correct/incorrect amount and proceeds with increasing currentQuestion
    updateGame: function (result) {
      if (result) {
        data.correct++
      } else {
        data.incorrect++
      }

      data.currentQuestion++
    },

    // returns data for global controller
    getGameData: function () {
      var holder = [questions.length, data.currentQuestion, data.correct, data.incorrect]
      return holder;
    },

    getTime: function () {
      return data.timer;
    },

    resetTime: function () {
      data.timer = 45;
    },

    resetGameData: function () {
      data.currentQuestion = 0;
      data.correct = 0;
      data.incorrect = 0;
    }
  }
})();





// UI Controller
var uiController = (function () {

  var cacheDom = {
    $startBtn: $('.start'),
    $gamePage: $('.game-page'),
    $answers: $('.answers'),
    $question: $('.question-header'),
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

    // displays if user got the correct answer or not
    displayResult: function (result, answer) {
      cacheDom.$results.show()

      if (result) {
        cacheDom.$result.text('Correct!').css('color', 'green');
      } else {
        cacheDom.$result.text('Incorrect!').css('color', 'red');
      }
      cacheDom.$correctAnswer.text('The answer is: ' + answer)

    },

    // removes question and answers
    removeQuestion: function () {
      cacheDom.$answers.empty();
      cacheDom.$results.hide();
      cacheDom.$question.empty();
    },

    // removes start button and displays timer
    removeStartBtn: function () {
      cacheDom.$startBtn.hide();
      cacheDom.$time.css('visibility', 'visible')
    },

    // displays times up on page if timer has run to 0
    displayTimesUp: function (answer) {
      cacheDom.$results.show()
      cacheDom.$result.text("Time's up!").css('color', 'red');
      cacheDom.$correctAnswer.text('The answer is: ' + answer)
    },

    // restarts game and presents score with restart button
    restartGame: function (right, wrong) {
      cacheDom.$question.append("<button class='draw-border start'>Restart</button>")
      cacheDom.$question.append("<h3 class='score-correct'>Correct: " + right + "</h3>")
      cacheDom.$question.append("<h3 class='score-incorrect'>Incorrect: " + wrong + "</h3>")
    }
  }

})();





// Global App Controller
var controller = (function (gameCtrl, uiCtrl) {
  var dom = uiCtrl.getDom();
  var counter;

  // sets up event listeners for game
  var setupEventListeners = function () {

    // click event listener for start/restart button
    $(document).on('click', '.start', function () {
      uiCtrl.removeQuestion();
      uiCtrl.removeStartBtn();
      getNextQuestion();
      setTimer();
    })

    // click event listener for whichever option user chooses
    $(document).on('click', '.answer-choice', function (e) {
      dom.$answers.children().attr('disabled', true)
      $(this).css({
        'background': '#ffd93a',
        'color': 'black'
      });

      checkAnswer(e);
    })
  }

  // Gets next question in question array and then loads the question and choices
  var getNextQuestion = function () {
    var nextQuestion = gameCtrl.getQuestion();

    uiCtrl.loadQuestion(nextQuestion.src, nextQuestion.question);
    uiCtrl.loadAnswers(nextQuestion.choices);
  }

  // checks answer or if time ran out
  var checkAnswer = function (e) {
    var question = gameCtrl.getQuestion();

    clearInterval(timer);

    if (counter == 0) {
      uiCtrl.displayTimesUp(question.choices[question.answer]);
      gameCtrl.updateGame(false);

    } else if ($(e.target).attr('data-answer') == question.answer) {
      gameCtrl.updateGame(true);
      uiCtrl.displayResult(true);

    } else {
      gameCtrl.updateGame(false)
      uiCtrl.displayResult(false, question.choices[question.answer])
    }

    gameCtrl.resetTime();
    setTimeout(checkGame, 3500);
  }

  // checks if game has reached the end
  var checkGame = function () {
    var gameData = gameCtrl.getGameData();
    uiCtrl.removeQuestion();

    if (gameData[0] - 1 == gameData[1]) {
      uiCtrl.restartGame(gameData[2], gameData[3])
      gameCtrl.resetGameData();
    } else {
      getNextQuestion();
      setTimer();
    }
  }

  // counter for timer and also displays on page
  var timerCountDown = function () {
    counter--
    dom.$timer.text(counter);

    if (counter == 0) {
      checkAnswer();
    }
  }

  // sets up timer
  var setTimer = function () {
    counter = gameCtrl.getTime();
    timer = setInterval(timerCountDown, 1000)
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
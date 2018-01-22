$(document).ready(function() {
$('#replay').hide();
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 15;
var intervalId;
var timeoutId;
var currentQuestion = 0;

    var questions = {

    1: {
        question: "What is the name of the dog in The Sandlot?",
        answer1: "Max", 
        correctAnswer: "Hercules", 
        answer2: "Lucky",
        answer3:"Charlie"
    },
    2: {
        question: "What is the name of the good dog in Up?",
        correctAnswer: "Dug",
        answer1: "Bailey", 
        answer2: "Spot",
        answer3: "Dog"

    },
    3: {
        question: "What is the name of the dog in Garfield?",
        answer1: "Rex",
        answer2: "Jeffrey",
        correctAnswer: "Odie",
        answer3: "Garfield"    
  
    },
    4: {
        question: "What is the name of the dog in The Little Rascals?",
        answer1: "Barksworth",
        correctAnswer: "Petey",
        answer2: "Benny",
        answer3: "Conan"
    },
    5: {
        question: "What is the name of the dog in Toy Story?",
        correctAnswer: "Slink",
        answer1: "Link",
        answer2: "Rex",
        answer3: "Buzz"
    },
    6: {
        question: "What is the name of the dog in A Dogs Purpose?",
        answer1: "Chance",
        answer2: "Ally",
        answer3: "Molly",
        correctAnswer: "Bailey"
    },
    7: {   
        question: "What is the name of the dog in Family Guy?",
        answer1: "Chris",
        correctAnswer: "Brian",
        answer2: "Adam",
        answer3: "Chuck"
    },
    8: {
        question: "What is the name of the dog in Air Bud?",
        answer1: "Muddy",
        answer2: "Lucky",
        correctAnswer: "Buddy",
        answer3: "Rocky"
    }
};

function insertImage () {
    $('.answers').append('<img src"' + questions[currentQuestion].image + '/>');
};

var numberOfQuestions = Object.keys(questions).length;
 
function lowTime() {
    if(time < 5){
        $('#timeRem').css({'color': 'red'});
    } else {
        $('#timeRem').css({ 'color': 'white'});
    }
}

function showTime() {
    $('#timeRem').html("Time Remaining: " + time);
}

function hideTime() {
    $('#timeRem').html('');
}

function gameTimer() {
    clearStatus();
    time = 15;
    lowTime();
    showTime();
    intervalId = setInterval(decrement, 1000);
    $('#start').hide();
};

function fiveSec() {
    timeoutId = setTimeout(run, 3000);
}

function decrement() {
    if (time === 0 && currentQuestion < numberOfQuestions) {
        answerScreen();
        displayStatus("Correct Answer: " + questions[currentQuestion].correctAnswer, "Out of Time");
        unanswered++;
    } else if (time > 0) {
        showTime();
        time--;
        lowTime();
    } else {
        unanswered++
        displayStatus("Correct Answer: " + questions[currentQuestion].correctAnswer, "Out of Time");
        finalAnswer();
    }
};


function insertQuestion(question) {
    for (var k in question) {
        answer = $("<div>");
        answer.addClass(k);
        answer.html(question[k]);
        $('.answers').append(answer)
    }
};

function displayQuestion() {
    currentQuestion++;
    insertQuestion(questions[currentQuestion])
};

function displayStatus(correctAnswer, status) {
    $('#status').html(status);
    $('#correctAnswer').html(correctAnswer);
};

function answerScreen() {
    clearInterval(intervalId);
    hideTime();
    fiveSec();
};

function finalAnswer() {
    clearInterval(intervalId);
    hideTime();
    timeoutId = setTimeout(finalScreen(), 5000);
};

function finalScreen() {
    clearInterval(intervalId);
    hideTime();
    endReset();
};

function endReset() {
        $('.answers').html('');
        $('#status').html('Game Over!');
        $('#stats').html("Correct: " + correct + ", Incorrect: " + incorrect + ", Unanswered: " + unanswered);
        $('#replay').show();
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        currentQuestion = 0;
    };
function clearStatus() {
        $('#status').html('');
        $('#correctAnswer').html('');
        $('#stats').html('');
        $('#replay').hide();
    };
  
    function run() {
        clearStatus();
        gameTimer();
        displayQuestion();
        $('.correctAnswer, .answer1, .answer2, .answer3').on('click', userChoice);
    };
    //
    function userChoice() {
        if ($(this).hasClass('correctAnswer') && (currentQuestion < numberOfQuestions)) { //if correct answer and not last question
            correct++;
            answerScreen();
            displayStatus("Correct Answer: " + questions[currentQuestion].correctAnswer, 'Correct!');
        }
        else if (currentQuestion < numberOfQuestions) { // if incorrect and not last question
            incorrect++;
            answerScreen();
            displayStatus("Correct Answer: " + questions[currentQuestion].correctAnswer, 'Incorrect...');
        }
        else if ($(this).hasClass('correctAnswer') && (currentQuestion === numberOfQuestions)) { //if correct and last question
            correct++;
            finalAnswer();
            displayStatus("Correct Answer: " + questions[currentQuestion].correctAnswer, 'Correct!');
        }
        else if (currentQuestion === numberOfQuestions) { //if incorrect and last question
            incorrect++;
            finalAnswer();
           // displayStatus("Correct Answer: " + questions[currentQuestion].correctAnswer, 'Incorrect');
        }
    };

    $('#start').on("click", run);
    $('#replay').on('click', run);





});

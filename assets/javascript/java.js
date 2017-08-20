//make a start button
//make a timer set at 120 seconds
//make a function for each question
//allow each of the questions ansers to be counted correct or incorrect (hidden)
//make sure each question can only have one button pressed
//make a done button that stops the game / also if the time runs out, the game ends
//alert the final score / answers correct and answers incorrect

var questions = [{
	question: "What is the name of the dog in The Sandlot?",
	choices: ["Max","Lucky","Hercules","Charlie"],
	correctAnswer: 2},
	{question: "What is the name of the good dog in Up?",
	choices: ["Bailey","Dug","Spot","Doug"],
	correctAnswer: 1},
	{question: "What is the name of the dog in Garfield?",
	choices: ["Rex","Jeffrey","Garfield","Odie"],
	correctAnswer: 3},
	{question: "What is the name of the dog in The Little Rascals?",
	choices: ["Barksworth","Benny","Petey","Conan"],
	correctAnswer: 2},
	{question: "What is the name of the dog in Toy Story?",
	choices: ["Slink","Link","Rex","Buzz"],
	correctAnswer: 0},
	{question: "What is the name of the dog in A Dogs Purpose?",
	choices: ["Chance","Ally","Molly","Bailey"],
	correctAnswer: 3},
	{question: "What is the name of the dog in Family Guy?",
	choices: ["Chris","Brian","Adam","Chuck"],
	correctAnswer: 1},
	{question: "What is the name of the dog in Air Bud?",
	choices: ["Muddy","Lucky","Buddy","Rocky"],
	correctAnswer: 2
}];

var currentQuestion = 0
var correctAnswers = 0
var quizOver = false;

//var messages = ["Great job!","Ehh, you could do better","Are you a cat person?"];
//var gifs = ["assets/images/gooddog.gif","assets/images/crazydog.gif","assets/images/baddog.gif"];

//var range;

//if (correctAnswers < 3){
//	range = 2;
//}
//if (correctAnswers > 5){
	//range = 1;
//}
//if (correctAnswers > 7){
	//range = 0;
//}
// I tried to make the different gifs and messages pop up when the round was over, but I couldn't figure it out.


$(document).ready(function(){
    
    myTimer(60);

	displayCurrentQuestion();
	$(this).find(".quizMessage").hide();

	$(this).find(".nextButton").on("click", function(){
		if (!quizOver) {
			
			value = $("input[type='radio']:checked").val();
		
			if (value == undefined) {
				$(document).find(".quizMessage").text("Please name the dog!");

				$(document).find(".quizMessage").show();
			}
			else {
				$(document).find(".quizMessage").hide();
			

			if (value == questions[currentQuestion].correctAnswer) {

				correctAnswers++;

				}

				currentQuestion++;

				if (currentQuestion < questions.length)  {
					displayCurrentQuestion();
				} else { 
					displayScore();



					$(document).find(" .nextButton").text("Another round??");
					clearInterval(timer);
					quizOver = true;
					
				
					}
				} 

			} else { 
				quizOver = false;
				$(document).find(" .nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
				myTimer(60);

			}

	});
});




function displayCurrentQuestion(){

	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;

	$(questionClass).text(question);

	$(choiceList).find("li").remove();

	var choice;
	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		$('<li><input type="radio" value=' + i + ' name="dynradio" />'
			+ choice + '</li>').appendTo(choiceList);
	}
}

function resetQuiz(){
	currentQuestion = 0;
	correctAnswers = 0;
	hideScore();


}

function displayScore(){
	$(document).find(".quizContainer > .result").text("Score: " + correctAnswers + " out of " + questions.length);
	$(document).find(".quizContainer > .result").show();
}

function hideScore() {
	$(document).find(".result").hide();
}

var timer;
function myTimer(sec) {
    if (timer) clearInterval(timer);
    timer = setInterval(function() { 
        $('#timer').text(sec--);
        if (sec < 0) {
            clearInterval(timer);
            displayScore();
            $(document).find(" .nextButton").text("Another Round?");
            quizOver = true 
        }   
    }, 1000);
}





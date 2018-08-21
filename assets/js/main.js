var questions = [];
var currentQuestionIndex = 0;

$(document).ready(function() {
    $(document).keypress(function(e) {
        var keyCode = e.which || e.keyCode;
        var NEWLINE = 13, // Enter keyCode
            NEXT = "n".charCodeAt(0),
            PREV = "p".charCodeAt(0);
        if (keyCode === NEWLINE)
            showAnswer();
        else if (keyCode === NEXT || keyCode === PREV) {
            let dir = (keyCode === NEXT) ? 1 : -1;
            updateQuestion(currentQuestionIndex + dir);
        }
    });

	$.get("./data/lab2.txt", function(text) {
		questions = text.split('\n');
		console.log(questions);
		shuffle(questions);
		updateQuestion(0);
	});

	$(".showButton").click(function() {
		showAnswer();
	});

	$(".nextButton").click(function() {
		updateQuestion(currentQuestionIndex + 1);
	});

	$(".prevButton").click(function() {
		updateQuestion(currentQuestionIndex - 1);
	});

	console.error("Doc loaded");
});

var shuffle = function(array) {
	if (array.length <= 1)
		return
    for (var i=array.length-1 ; i>0 ; --i) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

var showAnswer = function() {
	if (!$(".showButton").hasClass("showButton-hidden")) {
		$(".showButton").toggleClass("showButton-hidden");
		$(".answer").toggleClass("answer-hidden");
	}
};

var updateQuestion = function(index) {
	index = index % questions.length;
	if (index < 0)
		index += questions.length;

	currentQuestionIndex = index;
	currentQuestion = questions[currentQuestionIndex].split('@');

	$(".questionTag").text(currentQuestion[0]);
	$(".question").text(currentQuestion[1]);
	$(".answer").text(currentQuestion[2]);
	if ($(".showButton").hasClass("showButton-hidden"))
		$(".showButton").removeClass("showButton-hidden");
	if (!$(".answer").hasClass("answer-hidden"))
		$(".answer").addClass("answer-hidden");
};
function Quiz(questions) {
    this.score = 0;
    this.questions = questions
    this.questionIndex = 0
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices= choices;
    this.answer = answer;
}

let questions = [
    new Question("What datatype is used in Java to store string?", ["string", "myString", "txt", "String"], "String"),
    new Question("Javascript Supports", ["Functions", "XHTML", "XML", "CSS"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which one is a Java framework?", ["Laravel", "Spring", "Django", "React"], "Spring"),
    new Question("Where is Java used in Web development?", ["Client-side logic", "Front-End view", "Back-End logic", "Database operation"], "Back-End logic"),
    new Question("Which one is not a JS Framework?", ["Express.js", "Django", "JQuery", "Node.js"], "Django"),
    new Question("Which one is not a linear Data Structure?", ["Array", "Stack", "Tree", "LinkedList"], "Tree"),
    new Question("Which one is used to connect with Database?", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("Which one defines structure of webpage?", ["XHTML", "XML", "CSS", "HTML"], "HTML"),
    new Question("Functions in JS are", ["1st class citizen", "2nd class citizen", "3rd class citizen", "4th class citizen"], "1st class citizen")
]

Quiz.prototype.getQuestionByIndex = function() {
return this.questions[this.questionIndex]
}

Question.prototype.isCorrectAnswer= function(choice) {
    return this.answer === choice
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

function handleOptionButton(id, choice) {
let btn = document.getElementById(id)
btn.onclick= function() {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
    }
}

function showProgress() {
let currntQues = quiz.questionIndex +1;
let elem = document.getElementById("footer")
elem.innerHTML = `Question ${currntQues} of ${quiz.questions.length}`;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length
}

function showScores() {
    let gameEnded = "<header><h1>Result</h1></header>"
    gameEnded += "<h2 id=\"result\">Your score: " 
                + quiz.score 
                + "<br>Percentage: "
                + (quiz.score/questions.length*100) +"</h2>" 
                + "<button id=\"try\"><a href=\"quiz.html\">Try again</a></button>";
    document.getElementById("quiz-box").innerHTML = gameEnded
}

let quiz = new Quiz(questions);

function loadQuestions() {
    if(quiz.isEnded()) {
        showScores();
    } else {
        let questionText = document.getElementById("question")
        questionText.innerHTML= quiz.getQuestionByIndex().text
        let choices = quiz.getQuestionByIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            let element = document.getElementById("choice"+i)
            element.innerHTML = choices[i];
            handleOptionButton("btn"+i, choices[i])
        }
        showProgress();
    }
}

loadQuestions();

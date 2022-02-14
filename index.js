const question = document.getElementById("question");
const start = document.getElementById("start");

availableQuestion = [...questionPool];
let questionPool = [
    {
        question:"JavaScript code is inserted between which of the following?",
        answers: {
            a: "scribble",
            b: "script",
            c: "source"
        },
        correctAnswer: "b" 
    },
    {
    question: "How many fingers are on the foot of a man?",
      answers: {
        a: "one",
        b: "Five",
        c: "Three"
       },
      correctAnswer: "c" 
    
    }
];
let currentQuestion = {};
start.addEventListener("onclick", startGame);
function startGame(){
    getQuestion()
};
//Randomly get questions from the array of objects.
function getQuestion (){
   const questionIndex = Math.floor(Math.random * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;
    console.log("question.innerText");
}
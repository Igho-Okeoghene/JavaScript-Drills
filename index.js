const questionContainer = document.getElementById("question");
const start = document.getElementById("start");
const next = document.getElementById("next");
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQueIndex;
const scoreText = document.getElementById("score");
let score;

function startGame(){
    score = 0;
    getQuestion();
    
};

window.onload = startGame;
next.addEventListener('click', () => {
    questionPool.splice(currentQueIndex, 1);
    currentQueIndex++
    getQuestion()
  })

//Questions Pool

let questionPool = [
    {
        question: "How many tongues are on the foot of a man?",
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
          ] 
        },
    {
    question: "How many fingers are on the foot of a man?",
    answers: [
        { text: '16', correct: true },
        { text: '30', correct: false }
      ] 
    },
    {
        question: "How many toes are on the foot of a man?",
        answers: [
            { text: '9', correct: false },
            { text: '90', correct: true }
          ] 
        },
];

const POINTS = 1;
const MAX_QUESTIONS = 10;

function getQuestion (){
    //At the end of the questions, go to the end page
    if(questionPool.length === 0){
        localStorage.setItem("recentScore", score);
        return window.location.assign("end.html");
    };
    //remove child elements(answer options) created by the previous question
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      };
      //Randomly get an index
    currentQueIndex = Math.floor(Math.random() * questionPool.length);
    shuffledQuestions = questionPool.sort(() => Math.random - .5);//Randomly get questions from the array of objects.
    //Display the Question
    showQuestion(shuffledQuestions[currentQueIndex]);
    
};

function showQuestion(question){
    questionContainer.innerText = question.question;
    //Create Child Elements for the questions, basically options.
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('option')
        //Display if the option chosen is correct or wrong
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
      })
    
};
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
  
  };

  function setStatusClass(element, correct) {
   
    if (correct) {
      element.classList.add('correct')
    increaseScore()
    }else {
      element.classList.add('wrong')
    }
    setTimeout( () => {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }, 2000);
    
};





  
 
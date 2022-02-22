//selecting all required elements
const start_btn = document.querySelector("#start");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const countTag = document.querySelector(".total_que");
const header = document.querySelector(".header");
const section = document.querySelector("section");
const resultContainer = document.querySelector(".result");
const container = document.querySelector(".container");

function startGame(){
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(15); //calling startTimer function
    
};

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;

window.onload = startGame;
next.addEventListener('click', () => {
  if(que_count < questions.length - 1){ //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
   }else{
    clearInterval(counter); //clear counter
    showResult(); //calling showResult function
}
});
    
  
  // getting questions and options from array
function showQuetions(index){
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = '<span>'+ questions[index].question +'</span>';
  let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag
  
  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for(i=0; i < option.length; i++){
      option[i].setAttribute("onclick", "optionSelected(this)");
  }
}


//if user clicked on option
function optionSelected(answer){
  clearInterval(counter); //clear counter
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items
  
  if(userAns == correcAns){ //if user selected option is equal to array's correct answer
      userScore += 1; //upgrading score value with 1
      answer.classList.add("correct"); //adding green color to correct selected option
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);
  }else{
      answer.classList.add("wrong"); //adding red color to correct selected option
       console.log("Wrong Answer");

      for(i=0; i < allOptions; i++){
          if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
              option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
              console.log("Auto selected correct answer.");
          }
      }
  }
  for(i=0; i < allOptions; i++){
      option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
}


function showResult(){
  container.classList.add("hideDisplay"); //hide header
 resultContainer.classList.remove("hideDisplay"); 
 resultContainer.classList.add("showDisplay"); // show result container
  const scoreText = document.querySelector(".score_text");
  console.log(scoreText)
  if (userScore > 3){ // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
  }
  else if(userScore > 1){ // if user scored more than 1
      let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
  else{ // if user scored less than 1
      let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if(time < 9){ //if timer is less than 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if(time < 0){ //if timer is less than 0
          clearInterval(counter); //clear counter
           const allOptions = option_list.children.length; //getting all option items
          let correcAns = questions[que_count].answer; //getting correct answer from array
          for(i=0; i < allOptions; i++){
              if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                  option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                   console.log("Time Off: Auto selected correct answer.");
              }
          }
          for(i=0; i < allOptions; i++){
              option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
          }
             }
  }
}

function queCounter(index){
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
  countTag.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

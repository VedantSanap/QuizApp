const startBtn = document.querySelector(".startBtn button");
const infoBox = document.querySelector(".infoBox");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeLine = document.querySelector("header .timeLine");
const timeText = document.querySelector(".timer .timeTxt");
const timeCount = document.querySelector(".timer .timerSec");

startBtn.addEventListener('click' ,function(){
    infoBox.classList.add("activeInfo");
})

exitBtn.addEventListener('click' ,function(){
    infoBox.classList.remove("activeInfo");
})

continueBtn.addEventListener('click' ,function(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(0);
})


let queCount = 0;  
let queNumb = 1;
let counter;
let timeValue =  15;
let counterLine;
let widthValue = 0;
let userScore =0;

const nextBtn = quizBox.querySelector(".nextBtn");
const restartQuiz = resultBox.querySelector(".buttons .restart")
const quitQuiz = resultBox.querySelector(".buttons .quit")

restartQuiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); //show quiz box
    resultBox.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    queCount = 0;
    queNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount); //calling showQestions function
    queCounter(queNumb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    nextBtn.classList.remove("show"); //hide the next button

}


quitQuiz.addEventListener("click",function(){
    window.location.reload(); //reload the current window
}) 


nextBtn.addEventListener('click',function()
{
    if(queCount< questions.length-1)
    {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
        timeText.textContent = "Time Left";
    }
    else
    {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("questions completed");
        showResultBox();
    }

})

function showQuestions(index)
{
    const queText = document.querySelector(".queText");
    
    let queTag= '<span>'+ questions[index].numb +"."+questions[index].question + '</span>';
    let optionTag= '<div class="option">'+ questions[index].options[0]+ '<span></span></div>'+
                    '<div class="option">'+ questions[index].options[1]+ '<span></span></div>'+
                    '<div class="option">'+ questions[index].options[2]+ '<span></span></div>'+
                    '<div class="option">'+ questions[index].options[3]+ '<span></span></div>';
                    '<div class="option">'+ questions[index].options[0]+ '<span></span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML= optionTag;

    const option = optionList.querySelectorAll(".option")
    for(let i=0; i<option.length;i++)
    {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon= '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon='<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer)
{
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOption = optionList.children.length;
    if(userAns==correctAns)
    {
        userScore +=1;
        console.log(userScore);
        answer.classList.add("correct");
        answer.insertAdjacentHTML('beforeend',tickIcon)
        console.log("Correct Answer");
    }
    else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML('beforeend',crossIcon)
        console.log("Wrong Answer");

        for(let i=0; i < allOption; i++)
        {
            if(optionList.children[i].textContent == correctAns)
            { //if there is an option which is matched to an array answer 
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML('beforeend',tickIcon)
            }
        }
    }   

    for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add("disabled");
    }

    nextBtn.style.display = "block";
}

function queCounter(index)
{
    const bottomQuesCounter = quizBox.querySelector(".totalQue");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+questions.length+'</p>Questions</span>'
    bottomQuesCounter.innerHTML = totalQuesCountTag;

}

function showResultBox(){
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show result box
    const scoreText = resultBox.querySelector(".scoreText");
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
        if(time < 0)
        { //if timer is less than 0
                clearInterval(counter); //clear counter
                timeText.textContent = "Time Off"; //change the time text to time off
                const allOption = optionList.children.length; //getting all option items
                let correctAns = questions[queCount].answer; //getting correct answer from array
                for(i=0; i < allOption; i++)
                {
                    if(optionList.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer
                        optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
                        console.log("Time Off: Auto selected correct answer.");
                    }
                }
                for(i=0; i < allOption; i++)
                {
                    optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
                }
                nextBtn.style.display = 'block';
                // nextBtn.classList.add("show"); //show the next button if user selected any option
            }
        }
        
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        timeLine.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}
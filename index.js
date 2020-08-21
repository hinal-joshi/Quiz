let questions = [
    {
        question: 'What is an angle less than 90 degree called?',
        choices: ['Right angle', 'Acute Angle', 'Obtuse Angle', 'Reflex angle'],
        correctAnswer: 1
    },
    {
        question: 'A triangle with two sides equal is known as?',
        choices: ['Right angle triangle', 'Isosceles triangle', 'Equilateral triangle', 'Scalene Triangle'],
        correctAnswer: 1
    },
    {
        question: 'The sum of all angles of a triangle is ?',
        choices: ['180 degree', '360 degree', '240 degree', '90 degree'],
        correctAnswer: 0
    },
    {
        question: 'Two lines at an angle of 90 degree is known as?',
        choices: ['Perpendicular lines', 'Parallel lines', 'Intersecting lines', 'Concurrent lines'],
        correctAnswer: 0
    },
    {
        question: 'Two lines at an angle of 0 degree is known as?',
        choices: ['Perpendicular lines', 'Parallel lines', 'Intersecting lines', 'Concurrent lines'],
        correctAnswer: 1
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;

function displayCurrentQuestion(){
    let question = questions[currentQuestion].question;
    let questionClass = document.querySelector('.quizContainer > .question');
    let choiceList = document.querySelector('.quizContainer > .choiceList');
    let numChoices = questions[currentQuestion].choices.length;

    //set the current question to question class
    questionClass.innerText = question;

    //Remove all current <li> elements 
    choiceList.innerHTML = '';
    //displaying choices
    let choice;
    for(let i=0;i<numChoices;i++){
        choice = questions[currentQuestion].choices[i];
        let li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);
    }
}

window.addEventListener('DOMContentLoaded', function(e){
    displayCurrentQuestion();
    let quizMessage = document.querySelector('.quizMessage');
    quizMessage.style.display = 'none';
    let nextButton = document.querySelector('.nextButton');
    nextButton.addEventListener('click',function(){
        if(!quizOver){
           let radioBtnsChecked = document.querySelector('input[type=radio]:checked');
           if(radioBtnsChecked == null){
               quizMessage.innerText = 'Please select any option';
               quizMessage.style.display = 'block';
           }
           else{
               console.log(radioBtnsChecked.value);
               quizMessage.style.display = 'none';
               if(parseInt(radioBtnsChecked.value)== questions[currentQuestion].correctAnswer){
                   correctAnswers++;
               }
            currentQuestion++;
            if(currentQuestion<questions.length){
                displayCurrentQuestion();
            }
            else{
                displayScore();
                document.querySelector('.nextButton').innerText = 'Play Again?';
                quizOver = true;
            }
           }
        }
        else{
               quizOver = false;
               document.querySelector('.nextButton').innerText = 'Next Question';
               resetQuiz();
               displayCurrentQuestion();
               hideScore();
        }
    });
})

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function hideScore(){
    document.querySelector('.result').style.display = 'none';
}

function displayScore(){
    document.querySelector('.result').innerText = 'You Scored: '+correctAnswers+" out of "+questions.length;
    document.querySelector('.result').style.display = 'block';
}
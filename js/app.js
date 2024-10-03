let percent = 0;
let correctAnswers = 0;
let currentQuestion = 1;

let percentContainer = document.querySelector('#process');
let questionContainer = document.querySelector('#question');
let answerContainer = document.querySelector('#answers');
var answers = answerContainer.querySelectorAll('.answer');
let button = document.querySelector('.next');
let reload = document.querySelector('.reload');

// Write required question amount to frontend
document.querySelector('#totalQuestions').innerText = questionAmount;

// Fetch questions
let questions = getRandomQuestions(catalog, questionAmount);

// Set first question
writeQuestion(currentQuestion);


function next() {
    answers.forEach((el) => {
        el.classList.remove('disable');
        el.dataset.state = "neutral";
        el.classList.remove('checked');
    });

    button.classList.add('disabled');
    currentQuestion++;
    document.querySelector('#currentQuestion').innerText = currentQuestion;

    if (currentQuestion <= questionAmount) {
        writeQuestion(currentQuestion);

        answers.forEach((el) => {
            el.classList.remove('disabled');
        });
    } else {
        showCorrection();

        let quizParts = document.querySelectorAll('.quiz');
        quizParts.forEach((el) => {
            el.classList.add('hide');
        });
        document.querySelector('#result').classList.add('show');

        let resultText = percent > 50 ? "Glückwunsch!" : "Nicht geschafft.";
        document.querySelector('#result-message').innerText = resultText;

        if (percent > 50) {
            document.querySelector('.confetti').classList.add("show");
            initConfetti();
            render();
        }
    }
}


function evaluate(el) {
    let correctAnswer = parseInt(questionContainer.dataset.answerNumber);
    let checkedIndex = Array.from(answers).findIndex(answer => answer.classList.contains('checked'));

    //console.log("Correct Answer: ", correctAnswer);
    //console.log("Selected Answer: ", checkedIndex);

    // Write given answer index to the question
    questions[currentQuestion-1]["givenAnswer"] = checkedIndex;

    if (correctAnswer === checkedIndex) {
        el.dataset.state = "success";
        correctAnswers++;
    } else {
        el.dataset.state = "error";
        answers[correctAnswer].dataset.state = "success";
    }

    // Calculate new percent
    percent = Math.round((correctAnswers / currentQuestion) * 100);
    percent = percent < 10 ? 10 : percent;

    // Adjust the percent
    percentContainer.querySelector('.handle').style.width = percent + "%";

    if (percent != 10) {
        percentContainer.querySelector('.percent span').innerText = percent;
    }

    // Enable button
    button.classList.remove('disabled');
}


button.addEventListener('click', () => {
    next();
});

reload.addEventListener('click', () => {
    window.location.reload();
});

answers.forEach((el) => {
    el.addEventListener('click', () => {
        
        answers.forEach((el) => {
            el.classList.add('disabled');
        });

        el.classList.add('checked');
        evaluate(el);
    });
});
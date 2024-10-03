function showCorrection() {    
    // Print out wrong answers with correct answer
    questions.forEach((el, idx) => {
        let question = questions[idx];

        if (question.correctAnswerIndex !== question.givenAnswer) {
            let questionText = question.question;
            let answerGiven = question.answers[question.givenAnswer];
            let answerCorrect = question.answers[question.correctAnswerIndex];

            let questionPhraseContainer = document.createElement('div');
            questionPhraseContainer.classList.add('question-phrase');
            questionPhraseContainer.innerText = questionText;

            let correctAnswerContainer = document.createElement('div');
            correctAnswerContainer.classList.add('question-correct-answer');
            correctAnswerContainer.innerHTML = "<span>Richtige Antwort:</span><br>" + answerCorrect;

            let giveAnswerContainer = document.createElement('div');
            giveAnswerContainer.classList.add('question-your-answer');
            giveAnswerContainer.innerHTML = "<span>Deine Antwort:</span><br>" + answerGiven;

            let answerContainer = document.createElement('div');
            answerContainer.classList.add("question-answer");

            answerContainer.append(questionPhraseContainer);
            answerContainer.append(correctAnswerContainer);
            answerContainer.append(giveAnswerContainer);

            document.querySelector('#question-answers').append(answerContainer);
        }
    });
}
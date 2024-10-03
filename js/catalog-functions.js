// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to get random questions, shuffle answers, and return the index of the correct answer
function getRandomQuestions(catalog, amount) {
    // Shuffle the catalog to pick random questions
    const shuffledCatalog = [...catalog].sort(() => 0.5 - Math.random());
    
    // Pick the specified number of questions
    const selectedQuestions = shuffledCatalog.slice(0, amount);

    // Prepare the result
    const result = selectedQuestions.map(question => {
        // Ensure that the answers property is an array
        if (!Array.isArray(question.answers)) {
            window.location.reload();
            throw new TypeError('Question answers is not an array');

        }

        // Get the index of the correct answer
        const correctAnswerIndex = question.answers.indexOf(question.correct_answer);

        // Shuffle the answers
        shuffle(question.answers);

        // Find the new index of the correct answer after shuffling
        const newCorrectAnswerIndex = question.answers.indexOf(question.correct_answer);

        // Return the question with the new correct answer index
        return {
            category: question.category,
            question: question.question,
            answers: question.answers,
            correctAnswerText: question.correct_answer,
            correctAnswerIndex: newCorrectAnswerIndex
        };
    });

    return result;
}


function writeQuestion(numberOfQuestion) {
    const questionindex = numberOfQuestion-1; // we need to reduce one because we are in an array
    const newQuestion = questions[questionindex];

    questionContainer.querySelector('.type').innerText = newQuestion.category;
    questionContainer.querySelector('.text').innerText = newQuestion.question;
    questionContainer.dataset.answerText = newQuestion.correctAnswerText;
    questionContainer.dataset.answerNumber = newQuestion.correctAnswerIndex;
    
    answerContainer.querySelector('.answer:nth-child(1) .text').innerText = newQuestion.answers[0];
    answerContainer.querySelector('.answer:nth-child(2) .text').innerText = newQuestion.answers[1];
    answerContainer.querySelector('.answer:nth-child(3) .text').innerText = newQuestion.answers[2];
}
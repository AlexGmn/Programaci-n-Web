const quizForm = document.getElementById('quiz-form');
const quizContainer = document.getElementById('quiz');
const answersTextarea = document.getElementById('answers');

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    generateQuiz(numQuestions);
});

function generateQuiz(numQuestions) {
    let quizHTML = '';

    for (let i = 1; i <= numQuestions; i++) {
        quizHTML += `<div id="question-${i}" class="question">
                        <h3>Pregunta ${i}</h3>
                        <label for="question-${i}-text">Escriba la pregunta:</label>
                        <input type="text" id="question-${i}-text" required>
                        <select id="question-${i}-type" onchange="showOptions(${i})">
                            <option value="text">Pregunta de texto</option>
                            <option value="true-false">Pregunta de Verdadero/Falso</option>
                            <option value="multiple-choice">Opción Múltiple</option>
                        </select>
                        <div id="question-${i}-options-container"></div>
                    </div>`;
    }

    quizHTML += '<button id="submit-answers" onclick="submitAnswers()">Aceptar</button>';
    quizContainer.innerHTML = quizHTML;
}

function showOptions(questionNumber) {
    const questionType = document.getElementById(`question-${questionNumber}-type`).value;
    const optionsContainer = document.getElementById(`question-${questionNumber}-options-container`);
    
    if (questionType === 'multiple-choice') {
        optionsContainer.innerHTML = `
            <label for="question-${questionNumber}-options">Ingrese las opciones separadas por comas:</label>
            <input type="text" id="question-${questionNumber}-options" required>
        `;
    } else {
        optionsContainer.innerHTML = '';
    }
}

function showAnswers(numQuestions) {
    let answers = '';

    for (let i = 1; i <= numQuestions; i++) {
        const questionType = document.getElementById(`question-${i}-type`).value;
        const questionText = document.getElementById(`question-${i}-text`).value;

        answers += `Pregunta ${i}: ${questionText} - Tipo ${questionType}`;

        if (questionType === 'multiple-choice') {
            answers += ' - Opciones: ';
            const options = document.querySelectorAll(`#question-${i} input[type="text"]`);
            options.forEach((option, index) => {
                if (index > 0) {
                    answers += ', ';
                }
                answers += option.value;
            });
        }

        answers += '\n';
    }

    answersTextarea.value = answers;
}
function submitAnswers() {
    let answers = '';

    const numQuestions = parseInt(document.getElementById('num-questions').value);

    for (let i = 1; i <= numQuestions; i++) {
        const questionText = document.getElementById(`question-${i}-text`).value;
        const questionType = document.getElementById(`question-${i}-type`).value;

        answers += `Pregunta ${i}: ${questionText} - Tipo ${questionType}`;

        if (questionType === 'multiple-choice') {
            answers += ' - Opciones: ';
            const options = document.getElementById(`question-${i}-options`).value.split(',');
            answers += options.join(', ');
        }

        answers += '\n';
    }

    answersTextarea.value = answers;
}

const quizForm = document.getElementById('quiz-form');
const studentQuizContainer = document.getElementById('student-quiz-container');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results-container');
const submitConfigBtn = document.getElementById('submit-config');


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
        <textarea id="question-${i}-text" required></textarea>
        <select id="question-${i}-type" onchange="showOptions(${i})">
            <option value="text">Pregunta de texto</option>
            <option value="true-false">Pregunta de Verdadero/Falso</option>
            <option value="multiple-choice">Opción Múltiple</option>
        </select>
        <div id="question-${i}-options-container"></div>
    </div>`;}

    // boton aceptar para enviar el cuestionario
    quizHTML += '<button id="submit-answers" onclick="submitConfig()">Aceptar</button>';
    quizContainer.innerHTML = quizHTML;
    
    // Mostramos el contenedor de preguntas y ocultamos el formulario de configuración
    quizContainer.style.display = 'block';
    answersTextarea.style.display = 'none';
    // Mostramos el botón de configuración
    quizForm.style.display = 'inline-block';
    }

    function generateStudentQuiz(questions) {
        let studentQuizHTML = '';
    
        questions.forEach((question, index) => {
            studentQuizHTML += `<div class="question">
                                    <h3>Pregunta ${index + 1}</h3>
                                    <p>${question}</p>
                                    <textarea id="answer-${index + 1}" rows="4" cols="50" required></textarea>
                                </div>`;
        });
    
        document.getElementById('student-quiz').innerHTML = studentQuizHTML;
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('quiz-form').style.display = 'none';
        document.getElementById('student-quiz-container').style.display = 'block';
    }
    
    function submitStudentAnswers() {
        const numQuestions = parseInt(document.getElementById('num-questions').value);
        let studentAnswersHTML = '';

        for (let i = 1; i <= numQuestions; i++) {
            const answer = document.getElementById(`answer-${i}`).value;
            studentAnswersHTML += `<p><strong>Respuesta ${i}:</strong> ${answer}</p>`;
        }

        // Mostrar las respuestas del estudiante
        resultsContainer.innerHTML = studentAnswersHTML;
        resultsContainer.style.display = 'block';
    }
    
    function submitConfig() {
        const numQuestions =  parseInt(document.getElementById('num-questions').value);
        const questions = [];
        
        // Recopilar las preguntas configuradas
        for (let i = 1; i <= numQuestions; i++) {
            const question = document.getElementById(`question-${i}-text`).value;
            questions.push(question);
        }
    
        // Generar el cuestionario del estudiante
        generateStudentQuiz(questions);
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

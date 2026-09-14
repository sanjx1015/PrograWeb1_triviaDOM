
//================FUNCTIONS================

//Crear la función de cuestionario
function buildQuiz(){
    //variable para almacenar el HTMl del cuestionario
    const output = [];

    //for each question
    questions.forEach((currentQuestion, questionNumber) => { //flecha para recorrer cada pregunta y su numero de pregunta
            //Variable para almacenar las opciones de respuesta
            const answers = [];

            //y para cada opcion de respuesta
            for(let letter in currentQuestion.answers){
                //agrega un HTML radio button
                answers.push(
                    //la interpolación de cadenas permite incrustar expresiones JS directamente en sus cadenas usando${expresion}
                    `<label>
                        <input type="radio" name= "question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                        </label>`
                );}
                
                //agrega la pregunta y sus opciones al output
                output.push(
                    `<div class= "slide">
                    <div class="question"> ${currentQuestion.question}</div>
                    <div class= "answers"> ${answers.join("")}</div>
                    </div>`
                );
            }
        
    );
    quizContainer.innerHTML = output.join('');

}

//Mostrar los resultados
function showResults(){
    //contenedor de respuesetas
    const answerContainers = quizContainer.querySelectorAll('.answers');

    //almacenar la cantidad de respuestas correctas
    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) =>{
        //encontrar la respuesta seleccionada
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //si la respuesta es correcta
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;

            //pintar la respuesta correcta en verde
            answerContainers[questionNumber].style.color = 'lightgreen';
        }//si es incorrecta
        else{
            //pintar rojo
            answerContainers[questionNumber].style.color = 'red';
        }


    });
    
    //mostrar el resultado
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
    
    //Para el boton Restart
    restartContainer.innerHTML = `<button id="restart-btn"> Volver a jugar</button>`;
    
    document.getElementById('restart-btn').addEventListener('click', () => {
        showScreen('start-screen');
        
        //Para que no sigan apareciendo, luego del Restart
        resultsContainer.innerHTML = "";
        restartContainer.innerHTML = "";
    });
;

}

function showSlide(n){
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    if (currentSlide === 0){
        previousButton.style.display = 'none'
    }
    else{
        previousButton.style.display = 'inline-block';

    }
    if (currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showScreen(screenId){
    document.getElementById("start-screen").style.display = 'none';
    document.getElementById("quiz-screen").style.display = 'none';
    document.getElementById("edit-screen").style.display = 'none';

    document.getElementById(screenId).style.display = 'block';
}

function renderEditor(){
    const editor = document.getElementById('question-editor');
    editor.innerHTML = "";

    questions.forEach((q, i) => {
        editor.innerHTML += `<div>
        <input type="text" value="${q.question}" id="q${i}">
        <input type="text" value="${q.answers.a}" id="q${i}a">
        <input type="text" value="${q.answers.b}" id="q${i}b">
        <input type="text" value="${q.answers.c}" id="q${i}c">
        <input type="text" value="${q.answers.d}" id="q${i}d">
        <input type="text" value="${q.correctAnswer}" id="q${i}correct">
        </div>`;
    });
}


//================ VARIABLES ================
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const playButton = document.getElementById('play-btn');
const editButton = document.getElementById('edit-btn');

const addButton = document.getElementById('add-question');
const saveButton = document.getElementById("save-question");

const restartContainer = document.getElementById("restart");

//PAGINATION
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");


let slides;
let currentSlide = 0;

// ================ PREGUNTAS ================
const questions=[
    {
        question: "Quien es Darth Vader en Star Wars?",
        answers:{
            a: "Anakin Skywalker", 
            b: "Luke Skywalker", 
            c: "Yoda", 
            d: "Obi-Wan"
        },
        correctAnswer: "a"
    },
    {
        question: "Cual es el poder del Profesor Javier en X-Men?",
        answers:{
            a:"Inmortalidad", 
            b: "Telepatia", 
            c: "Super Fuerza", 
            d: "Teletransportacion"
        },
        correctAnswer: "b"
    },
    {
        question: "Cual mascota perdio John Wick?",
        answers:{
            a: "Gato", 
            b: "Sapo", 
            c: "Perro", 
            d: "Lemur"
        },
        correctAnswer: "c"
    },
    {
        question: "Quien es el director de la pelicula Interstellar?",
        answers:{
            a: "Christopher Nolan", 
            b: "Steven Spielberg", 
            c: "James Cameron", 
            d: "Silvester Stallone"
        },
        correctAnswer: "a"
    },
    {
        question: "Cual es el nombre de un villano de Batman?",
        answers:{
            a: "Flash", 
            b: "Thanos", 
            c: "Joker", 
            d: "Alfred"
        },
        correctAnswer: "c"
    }];




//================ MOSTRAR PRIMER SLIDE ================

function showNextSlide(){
    showSlide(currentSlide +1);
}

function showPreviousSlide(){
    showSlide(currentSlide -1);
}




//================Event listeners================
submitButton.addEventListener('click', showResults);

previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);


playButton.addEventListener('click', () => {
        //Por si tocan el 'restart'. Se tiene que limpiar las variables
    showScreen('quiz-screen');
    buildQuiz();
    slides = document.querySelectorAll(".slide");
    currentSlide = 0;

    showSlide(currentSlide);
});

editButton.addEventListener('click', () => {
    showScreen('edit-screen');
    renderEditor();
});


addButton.addEventListener('click', () => {
    questions.push({
        question: 'Nueva Pregunta',
        answers: {a: '', b: '', c: '', d: ''},
        correctAnswer: 'a'
    });
    renderEditor();
});

saveButton.addEventListener('click', () =>{
    questions.forEach((q, i) => {
        q.question = document.getElementById(`q${i}`).value;
        q.answers.a = document.getElementById(`q${i}a`).value;
        q.answers.b = document.getElementById(`q${i}b`).value;
        q.answers.c = document.getElementById(`q${i}c`).value;
        q.answers.d = document.getElementById(`q${i}d`).value;
        q.correctAnswer = document.getElementById(`q${i}correct`).value;
    });
    alert('Se guardo correctamente la pregunta');
    showScreen('start-screen');
});

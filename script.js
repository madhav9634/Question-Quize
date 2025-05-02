const questions = [
  {
    question: 'Which of the following is not a core component of ASP.NET MVC architecture...?',
    answers: [
      {text: 'Model', correct: false},
      {text: 'View', correct: false},
      {text: 'Session', correct: true},
      {text: 'Controller', correct: false},
    ],
  },
  {
    question: 'What is the primary role of the Model in ASP.NET MVC ...?',
    answers: [
      {text: 'Handels user interactions', correct: false},
      {text: 'Represents data and business logic', correct: true},
      {text: 'Display data to the user', correct: false},
      {text: 'Defines the apllication routes', correct: false},
    ],
  },
  {
    question: 'The View in ASP.NET MVC is primarily responsible for:',
    answers: [
      {text: 'Processing user input', correct: false},
      {text: 'Retrieving data from the database', correct: false},
      {text: 'Presenting data to the user', correct: true},
      {text: 'Managing application state', correct: false},
    ],
  },
  {
    question: 'What is the purpose of a Controller in ASP.NRT MVC...?:',
    answers: [
      {text: 'To store data persistently', correct: false},
      {text: 'To handle user input and interact with the Model', correct: true},
      {text: 'To render HTML to the browser', correct: false},
      {text: 'To defines the application routing rules', correct: false},
    ],
  },
  {
    question: 'Which technology is commonly used for creating Views in ASP.NET MVC...?:',
    answers: [
      {text: 'C#', correct: false},
      {text: 'Razor', correct: true},
      {text: 'JavaScript', correct: false},
      {text: 'SQL', correct: false},
    ],
  },
  {
    question: 'What does the term "CRUD" operation refer to in the context of a Model...?:',
    answers: [
      {text: 'Create, Read, Update, Delete', correct: true},
      {text: 'Configure, Route, Update, Debug', correct: false},
      {text: 'Compile, Run, Update, Debug', correct: false},
      {text: 'Connect, Request, Update, Display', correct: false},
    ],
  },
  {
    question: 'How are routes define in ASP.NET MVC...?:',
    answers: [
      {text: 'In the web.config file', correct: false},
      {text: 'In the Controller class', correct: false},
      {text: 'In the routeConfig.cs file', correct: true},
      {text: 'In the View file', correct: false},
    ],
  },
  {
    question: 'What is the purpose of ViewData in ASP.NET MVC...?:',
    answers: [
      {
        text: 'To store data passed from the Controller to the View',
        correct: true,
      },
      {text: 'To manage user authentication', correct: false},
      {text: 'To define database connections', correct: false},
      {text: 'To handle routing requests', correct: false},
    ],
  },
];

const questionElement = document.getElementById ('question');
const answerButtons = document.getElementById ('answer-buttons');
const nextButton = document.getElementById ('next-btn');
const backButton = document.getElementById ('back-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion ();
}

function showQuestion () {
  resetState ();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach (answer => {
    const button = document.createElement ('button');
    button.innerHTML = answer.text;
    button.classList.add ('btn');
    answerButtons.appendChild (button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener ('click', selectAnswer);
  });

  // Show back button only if not on the first question
  if (currentQuestionIndex > 0) {
    backButton.style.display = 'block';
  }
}

function resetState () {
  nextButton.style.display = 'none';
  backButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild (answerButtons.firstChild);
  }
}

function selectAnswer (e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add ('correct');
    score++;
  } else {
    selectedBtn.classList.add ('incorrect');
  }
  Array.from (answerButtons.children).forEach (button => {
    if (button.dataset.correct === 'true') {
      button.classList.add ('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore () {
  resetState ();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion ();
  } else {
    showScore ();
  }
}

function handleBackButton () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion ();
  }
}

nextButton.addEventListener ('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton ();
  } else {
    startQuiz ();
  }
});

backButton.addEventListener ('click', handleBackButton);

startQuiz ();

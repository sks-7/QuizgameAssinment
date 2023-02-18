const quizDB = [
  {
    question: 'Q1: Who is the prime minister of India ?',
    a: 'Modi',
    b: 'indira Gandhi',
    c: 'Yogi',
    d: 'none of this',
    ans: 'ans1',
  },

  {
    question:
      'Q2: Which one of the following river flows between Vindhyan and Satpura ranges?',
    a: 'Narmada',
    b: 'Mahanadi',
    c: 'Son',
    d: 'Netravati',
    ans: 'ans1',
  },

  {
    question: 'Q3: The Central Rice Research Station is situated in?',
    a: 'Chennai',
    b: 'Cuttack',
    c: 'Bangalore',
    d: 'Quilon',
    ans: 'ans2',
  },

  {
    question: 'Q4: Who among the following wrote Sanskrit grammar?',
    a: ' Kalidasa',
    b: 'Charak',
    c: ' Panini',
    d: 'Aryabhatt',
    ans: 'ans1',
  },
  {
    question:
      'Q5: Which among the following headstreams meets the Ganges in last?',
    a: 'Alaknanda',
    b: 'Pindar',
    c: 'Mandakini',
    d: 'Bhagirathi',
    ans: 'ans4',
  },
  {
    question: 'Q6: The metal whose salts are sensitive to light is?',
    a: 'Zink',
    b: 'Silver',
    c: 'Copper',
    d: 'Aluminum',
    ans: 'ans2',
  },

  {
    question: 'Q7: Patanjali is well known for the compilation of –',
    a: 'Yoga Sutra',
    b: 'Panchatantra',
    c: 'Brahma Sutra',
    d: 'Ayurveda',
    ans: 'ans1',
  },

  {
    question:
      'Q8:  River Luni originates near Pushkar and drains into which one of the following?',
    a: 'Rann of Kachchh',
    b: 'Arabian Sea',
    c: 'Gulf of Cambay',
    d: 'Lake Sambhar',
    ans: 'ans1',
  },

  {
    question:
      'Q9:  Which one of the following rivers originates in Brahmagiri range of Western Ghats?',
    a: 'Pennar',
    b: 'Cauvery',
    c: 'Krishna',
    d: 'Tapti',
    ans: 'ans2',
  },

  {
    question: 'Q10:  The country that has the highest in Barley Production?',
    a: 'China',
    b: 'India',
    c: 'Russia',
    d: 'France',
    ans: 'ans3',
  },
];

// ------------------geting userdata------------------------

let userData = JSON.parse(localStorage.getItem('signin'));

let user = userData.username;

// -----logic----------

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');

const skip = document.querySelector('#skip');

const next = document.querySelector('#submit');

const answers = document.querySelectorAll('.answer');

const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score = 0;

let responses = [];

const loadQuestion = () => {
  const questionList = quizDB[questionCount];
  question.innerText = questionList.question;
  option1.innerText = questionList.a;
  option2.innerText = questionList.b;
  option3.innerText = questionList.c;
  option4.innerText = questionList.d;
};

loadQuestion();

const getCheckedAnswer = () => {
  let answer;

  answers.forEach((curAnsElem) => {
    if (curAnsElem.checked) {
      answer = curAnsElem.id;
    }
  });
  return answer;
};

function generateQuizQuestion() {
  const selectedAnswer = getCheckedAnswer();

  if (selectedAnswer === quizDB[questionCount].ans) {
    score++;
  }

  if (!selectedAnswer) {
    responses.push(null); // mark question as skipped
  } else {
    responses.push(selectedAnswer);
  }

  clearSelection();
  questionCount++;
  if (questionCount < quizDB.length) {
    loadQuestion();
  } else {
    let reportCardHTML = `
    <div class="reportCard">
      <h1 class="reportCardHeading">${user} your attempted quiz report card</h1>
      <h3 class="scoreNum">${user} your attempted quiz score is <span class="getScore">${score}/${quizDB.length}</span></h3>
      <ul class="responseList">
  `;

    reportCardHTML += `
      </ul>
      <button class="btn" onclick="location.reload()">play again</button>
    </div>
  `;

    showScore.innerHTML = reportCardHTML;
    showScore.classList.remove('scoreArea');
  }
}

function clearSelection() {
  answers.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

next.addEventListener('click', generateQuizQuestion);
skip.addEventListener('click', generateQuizQuestion);

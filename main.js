// select elements
let countSpan = document.querySelector(".counts span");
let bulletsSoanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersAreea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let results = document.querySelector(".results");

// options
let currentIndex = 0;
let rightAnswers = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questinObject = JSON.parse(this.responseText);
      let qCount = questinObject.length;

      // create bullets and set questions count
      createBullets(qCount);

      // Add data function
      addData(questinObject[currentIndex], qCount);

      // click submit
      submitButton.onclick = () => {
        // get right answer
        let correctAnswer = questinObject[currentIndex].right_answer;
        currentIndex++;

        //check answer
        chechkAnswer(correctAnswer, qCount);

        // remove previouse question
        quizArea.innerHTML = "";
        answersAreea.innerHTML = "";

        addData(questinObject[currentIndex], qCount);

        // handle bullets class
        handleBullets();

        //showResults
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "html-question.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // create spans

  for (let i = 0; i < num; i++) {
    // create bullet
    let bullet = document.createElement("span");

    if (i === 0) {
      bullet.className = "on";
    }

    // append bullets to main bullets container
    bulletsSoanContainer.appendChild(bullet);
  }
}

function addData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h2");

    // create question text

    let qText = document.createTextNode(obj.title);

    questionTitle.appendChild(qText);

    quizArea.appendChild(questionTitle);

    //create asnswers
    for (let i = 1; i <= 4; i++) {
      // create main div
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      // create radio input

      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // make first answer selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // create label

      let label = document.createElement("label");

      label.htmlFor = `answer_${i}`;

      let labelText = document.createTextNode(obj[`answer_${i}`]);
      label.appendChild(labelText);

      // add input + label to main div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(label);

      answersAreea.appendChild(mainDiv);
    }
  }
}

function chechkAnswer(cAnswer, count) {
  let answers = document.getElementsByName("question");
  let choosenAnswer;

  for (let i = 0; i < answers.length; i++)
    if (answers[i].checked) {
      choosenAnswer = answers[i].dataset.answer;
    }

  if (cAnswer === choosenAnswer) {
    rightAnswers++;
  } else {
  }
}

function handleBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  let spansArray = Array.from(bulletsSpan);
  spansArray.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersAreea.remove();
    submitButton.remove();
    bullets.remove();
  }
  if (rightAnswers > count / 2 && rightAnswers < count) {
    theResults = ` <span class= "good"> Good </span> ${rightAnswers} from ${count}`;
  } else if (rightAnswers === count) {
    theResults = ` <span class= "perfect"> perfect </span>, Congratulations`;
  } else {
    theResults = ` <span class= "bad"> Good Luck </span>, ${rightAnswers} from ${count}`;
  }

  results.innerHTML = theResults;
}

class User {
  constructor(id, username, salary) {
    this.i = id;
    this.u = username;
    this.s = salary;
  }
}

let userOne = new User(100, "abdo", 6000);

console.log( userOne.constructor === User);

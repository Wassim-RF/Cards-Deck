function fillQuizTemplate() {
    const quizTitle = document.getElementById("quizTitle");
    const quizDiscription = document.getElementById("quizDiscription");
    const nbrQuizQuestion = document.getElementById("nbrQuizQuestion");
    const quizDifficulte = document.getElementById("quizDifficulte");
    const lastScore = document.getElementById("lastScore");
    const dateOfCreationQuiz = document.getElementById("dateOfCreationQuiz");
    const selectedQuizId = localStorage.getItem("selectedQuizId");
    fetch('/data/quiz/quizzes.json').then(response => response.json()).then(data => {
        let thisQuiz = data.Quizzes.find(quiz => quiz.id === selectedQuizId);
        if (thisQuiz) {
            quizTitle.innerText = thisQuiz.title;
            quizDiscription.innerText = thisQuiz.discription;
            nbrQuizQuestion.innerText = thisQuiz.questions.length + " Questions";
            quizDifficulte.innerText = thisQuiz.difficulty;
            lastScore.innerText = thisQuiz.last_score;
            dateOfCreationQuiz.innerText = thisQuiz.date_creation;
        }
    })
}

window.addEventListener("DOMContentLoaded" , () => {
    fillQuizTemplate();
});

const startQuizButton1 = document.getElementById("start_Quiz--button1");
const startQuizButton2 = document.getElementById("start_Quiz--button2");

startQuizButton1.addEventListener("click" , () => {
    window.location.href = "/startQuiz.html";
});

startQuizButton2.addEventListener("click" , () => {
    window.location.href = "/startQuiz.html";
})
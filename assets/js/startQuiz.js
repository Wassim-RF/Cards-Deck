let trueAnswer = 0;
let falseAnswer = 0;
let currentQuiz = 0;

function questionShow() {
    const QCM_Section = document.getElementById("QCM_Section");
    const True_False_Section = document.getElementById("True_False_Section");
    const text_Section = document.getElementById("text_Section");
    const selectedQuizId = localStorage.getItem("selectedQuizId");
    const continueBtn = document.getElementById("continueQUestionQuiz");
    continueBtn.classList.add("hidden");
    document.getElementById("isCorrectText").classList.add("hidden");

    fetch('/data/quiz/quizzes.json').then(response => response.json()).then(data => {
        let thisQuiz = data.Quizzes.find(quiz => quiz.id === selectedQuizId);
        if (!thisQuiz) return;

        const question = thisQuiz.questions[currentQuiz];
        QCM_Section.classList.add("hidden");
        True_False_Section.classList.add("hidden");
        text_Section.classList.add("hidden");
        if (question.type === "QCM") {
            QCM_Section.classList.remove("hidden");
            QCM_Section.classList.add("flex");
            document.getElementById("quizQcmQuestion").innerText = question.question;

            question.reponses.forEach((rep, index) => {
                let btn = document.getElementById(`quizQcmReponse${index + 1}`);
                btn.innerText = rep.reponse;
                btn.style.backgroundColor = "";
                btn.disabled = false;
                btn.replaceWith(btn.cloneNode(true));
            });

            question.reponses.forEach((rep, index) => {
                let btn = document.getElementById(`quizQcmReponse${index + 1}`);
                btn.addEventListener("click", () => {
                    if (rep.correct) {
                        trueAnswer++;
                        document.getElementById("isCorrectText").classList.remove("hidden");
                        document.getElementById("isCorrectText").innerText = "Votre reponse est correct !";
                        document.getElementById("isCorrectText").classList.add("text-[#22c55e]");
                    }
                    else falseAnswer++;

                    continueBtn.classList.remove("hidden");
                    continueBtn.classList.add("flex");

                    question.reponses.forEach((r, i) => {
                        let b = document.getElementById(`quizQcmReponse${i + 1}`);
                        if (r.correct) b.style.backgroundColor = "#22c55e";
                        else if (i === index) b.style.backgroundColor = "#ef4444";
                        b.disabled = true;
                    });
                });
            });
        } else if (question.type === "True_False") {
            True_False_Section.classList.remove("hidden");
            True_False_Section.classList.add("flex");
            document.getElementById("quizTFQuestion").innerText = question.question;
            const trueBtn = document.getElementById("trueBtn");
            const falseBtn = document.getElementById("falseBtn");

            [trueBtn, falseBtn].forEach(btn => {
                btn.style.backgroundColor = "";
                btn.disabled = false;
                const newBtn = btn.cloneNode(true);
                btn.replaceWith(newBtn);

                newBtn.addEventListener("click", () => {
                    const userAnswer = btn.id === "trueBtn";
                    if (userAnswer === question.correct) trueAnswer++;
                    else falseAnswer++;

                    continueBtn.classList.remove("hidden");
                    continueBtn.classList.add("flex");

                    const otherBtn = newBtn.id === "trueBtn" ? document.getElementById("falseBtn") : document.getElementById("trueBtn");

                    [newBtn, otherBtn].forEach(b => {
                        if ((b.id === "trueBtn" && question.correct) || (b.id === "falseBtn" && !question.correct)) {
                            b.style.backgroundColor = "#22c55e";
                        } else if (b === btn) {
                            b.style.backgroundColor = "#ef4444";
                        }
                        b.disabled = true;
                    });
                });
            });
        }
    });
}

document.getElementById("continueQUestionQuiz").addEventListener("click", () => {
    currentQuiz++;
    questionShow();
});

window.addEventListener("DOMContentLoaded", () => {
    questionShow();
});

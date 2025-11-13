function quizIdToLocalStorage() {
    const quizLink = document.querySelectorAll("#Quiz_div--container>a");
    quizLink.forEach(element => {
        element.addEventListener("click" , (e) => {
            e.preventDefault();
            try {
                localStorage.setItem("selectedQuizId", element.id);
                window.location.href = "/oneQuiz.html";
            } catch {
                console.log("Errore");
            }
        })
    })
}

window.addEventListener("DOMContentLoaded" , () => {
    quizIdToLocalStorage();
});
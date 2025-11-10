let currentCard = 0;

window.addEventListener("load" , () => {
    const selectedCollectionId = localStorage.getItem("selectedCollectionId");

    let collections = JSON.parse(localStorage.getItem("collectionsData")) || [];

    let thisCollection = collections.find(col => col.id === selectedCollectionId);

    if (thisCollection) {
        if (thisCollection.cards.length === 0) {
            window.location.href = "/oneCollection.html";
            alert("Cette collection est vide");
            return;
        }
        document.getElementById("front_Card").innerText = thisCollection.cards[currentCard].question;
        document.getElementById("back_Card").innerText = thisCollection.cards[currentCard].reponse;
    } else {
        console.log("Cette collection est n'existe pas");
    }
});



const flip_Card = document.getElementById("flip_Card");

flip_Card.addEventListener("click" , () => {
    flip_Card.classList.toggle("transform-[rotateY(180deg)]");
    document.getElementById("easyMediumHard_Buttons").style.display = "flex";
    document.getElementById("Continue_Button").style.display = "flex";
});

document.querySelector("#Continue_Button>button").addEventListener("click" , () => {
    currentCard++;
    const selectedCollectionId = localStorage.getItem("selectedCollectionId");
    let collections = JSON.parse(localStorage.getItem("collectionsData")) || [];
    let thisCollection = collections.find(col => col.id === selectedCollectionId);
    if (currentCard < thisCollection.cards.length) {
        flip_Card.classList.toggle("transform-[rotateY(180deg)]");
        document.getElementById("easyMediumHard_Buttons").style.display = "none";
        document.getElementById("Continue_Button").style.display = "none";
        document.getElementById("front_Card").innerText = thisCollection.cards[currentCard].question;
        document.getElementById("back_Card").innerText = thisCollection.cards[currentCard].reponse;
    } else {
        console.log("Stop");
        window.location.href = "/oneCollection.html";
    }
});

document.getElementById("retourStartCollection").addEventListener("click" , () => {
    window.location.href = "/oneCollection.html";
})
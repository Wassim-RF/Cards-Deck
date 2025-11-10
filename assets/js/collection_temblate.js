const collectionTitle = document.getElementById("collectionTitle");
const collectionDiscription = document.getElementById("collectionDiscription");

function displayCards(card) {
    cardsContainer.innerHTML = "";

    card.forEach(cardData => {
        const card = document.createElement("div");
        card.classList.add("w-full" , "h-[150px]" , "perspective-[1000px]");
        document.getElementById("cardsContainer").appendChild(card);

        const frontBack = document.createElement("div");
        frontBack.classList.add("relative" , "w-full" , "h-full" , "transition-transform" , "duration-500" , "transform-3d" , "hover:transform-[rotateY(180deg)]");
        card.appendChild(frontBack);

        const front = document.createElement("div");
        front.classList.add("absolute" , "w-full" , "h-full" , "bg-[#F0F0F2]" , "rounded-md" , "shadow-[1px_1px_5px_#c0c0c0]" , "flex" , "items-center" , "justify-center" , "backface-hidden");
        frontBack.appendChild(front);

        const question = document.createElement("p");
        question.classList.add("text-lg" , "font-semibold");
        question.innerText = cardData.question;
        front.appendChild(question);

        const back = document.createElement("div");
        back.classList.add("absolute" , "w-full" , "h-full" , "bg-[#E0E0E5]" , "rounded-md" , "shadow-[1px_1px_5px_#b0b0b0]" , "flex" , "items-center" , "justify-center" , "transform-[rotateY(180deg)]" , "backface-hidden");
        frontBack.appendChild(back);

        const reponse = document.createElement("p");
        reponse.classList.add("text-lg" , "font-semibold");
        reponse.innerText = cardData.reponse;
        back.appendChild(reponse);
    })
}

window.addEventListener("load" , () => {
    const selectedCollectionId = localStorage.getItem("selectedCollectionId");

    let collections = JSON.parse(localStorage.getItem("collectionsData")) || [];

    let thisCollection = collections.find(col => col.id === selectedCollectionId);

    if (thisCollection) {
        collectionTitle.innerText = thisCollection.title;
        collectionDiscription.innerText = thisCollection.description;
        displayCards(thisCollection.cards || []);
        document.getElementById("nbrCollectionCards").innerText = thisCollection.cards.length + " Cards";
    } else {
        console.log("Cette collection don't existe");
    }
});

const createFlashcards = document.getElementById("createFlashcards");
const pageContent = document.getElementById("pageContent");
const CreateCardForm = document.getElementById("Create_card--Form");
const retourCreateCardsButton = document.getElementById("retour_create_cards--button");

createFlashcards.addEventListener("click" , () => {
    CreateCardForm.classList.remove("hidden");
    pageContent.classList.add("blur-2xl");
});

retourCreateCardsButton.addEventListener("click" , () => {
    CreateCardForm.classList.add("hidden");
    pageContent.classList.remove("blur-2xl");
});

const saveCardButton = document.getElementById("save_card--Button");
const frontFlashcards = document.getElementById("front-Flashcards");
const backFlashcards = document.getElementById("back-Flashcards");

function createCard() {
    const card = document.createElement("div");
    card.classList.add("w-full" , "h-[150px]" , "perspective-[1000px]");
    document.getElementById("cardsContainer").appendChild(card);

    const frontBack = document.createElement("div");
    frontBack.classList.add("relative" , "w-full" , "h-full" , "transition-transform" , "duration-500" , "transform-3d" , "hover:transform-[rotateY(180deg)]");
    card.appendChild(frontBack);

    const front = document.createElement("div");
    front.classList.add("absolute" , "w-full" , "h-full" , "bg-[#F0F0F2]" , "rounded-md" , "shadow-[1px_1px_5px_#c0c0c0]" , "flex" , "items-center" , "justify-center" , "backface-hidden");
    frontBack.appendChild(front);

    const question = document.createElement("p");
    question.classList.add("text-lg" , "font-semibold");
    question.innerText = frontFlashcards.value;
    front.appendChild(question);

    const back = document.createElement("div");
    back.classList.add("absolute" , "w-full" , "h-full" , "bg-[#E0E0E5]" , "rounded-md" , "shadow-[1px_1px_5px_#b0b0b0]" , "flex" , "items-center" , "justify-center" , "transform-[rotateY(180deg)]" , "backface-hidden");
    frontBack.appendChild(back);

    const reponse = document.createElement("p");
    reponse.classList.add("text-lg" , "font-semibold");
    reponse.innerText = backFlashcards.value;
    back.appendChild(reponse);

    frontFlashcards.value = "";
    backFlashcards.value = "";
}

saveCardButton.addEventListener("click" , (e) => {
    e.preventDefault();

    let card = {
        question: frontFlashcards.value,
        reponse: backFlashcards.value
    }

    const selectedCollectionId = localStorage.getItem("selectedCollectionId");
    let collection = JSON.parse(localStorage.getItem("collectionsData")) || [];
    let thisCollection = collection.find(col => col.id === selectedCollectionId);

    if (thisCollection) {
        thisCollection.cards.push(card);
        localStorage.setItem("collectionsData" , JSON.stringify(collection));
    }


    createCard();

    CreateCardForm.classList.add("hidden");
    pageContent.classList.remove("blur-2xl");
});

const retourIdOneCollection = document.getElementById("retourIdOneCollection");

retourIdOneCollection.addEventListener("click" , () => {
    localStorage.removeItem("selectedCollectionId");
    collectionTitle.innerText = "";
    collectionDiscription.innerText = "";
    document.getElementById("cardsContainer").innerHTML = "";

    setTimeout(() => {
        window.location.href = "/collections.html"
    } , 100);
})



const startCollectionButton = document.getElementById("start_collection--button");

startCollectionButton.addEventListener("click" , () => {
    window.location.href = "/startCollection.html";
})
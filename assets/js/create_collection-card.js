// create collection form display
const CreateCollectionButon = document.getElementById("Create_collection--Buton");
const CreateCollectionForm = document.getElementById("Create_collection--Form");
const pageContent = document.getElementById("pageContent");
const retourCreateCollectiomButton = document.getElementById("retour_create_collectiom--button");

CreateCollectionButon.addEventListener("click" , () => {
    CreateCollectionForm.classList.remove("hidden");
    pageContent.classList.add("blur-2xl");
});

retourCreateCollectiomButton.addEventListener("click" , () => {
    CreateCollectionForm.classList.add("hidden");
    pageContent.classList.remove("blur-2xl");
});



// Collection info 
const CollectionNameUpload = document.getElementById("Collection_Name");
const CollectionDescriptionUpload = document.getElementById("Collection_description");
const CollectionDivContainer = document.getElementById("Collection_div--container"); // div de container collection
const saveCollectionButton = document.getElementById("save_collection--Button"); // save collection buton
let collectionNumber = 0;
let collectionCardNumber = 0;

function creerCollectionDiv() {
    const collectionLinks = document.createElement("a");
    collectionLinks.classList.add("w-full" , "h-[120px]" , "p-1.5" , "border" , "border-[#c0c0c0]" ,  "rounded-2xl" , "shadow-[1px_1px_4px_#c0c0c0]" , "hover:scale-[1.02]" , "cursor-pointer");
    collectionLinks.id = CollectionNameUpload.value.toLowerCase().replace(/ /g, "_");
    // collectionLinks.setAttribute("href" , "oneCollection.html");
    CollectionDivContainer.appendChild(collectionLinks);

    const collectionLinkHeader = document.createElement("div");
    collectionLinkHeader.classList.add("flex" , "justify-between" , "items-center");
    collectionLinks.appendChild(collectionLinkHeader);

    const collectionLinkDescription = document.createElement("p");
    collectionLinkDescription.classList.add("text-xs" , "mt-1" , "mb-1" , "w-full" , "whitespace-normal", "wrap-break-word");
    collectionLinkDescription.innerText = CollectionDescriptionUpload.value;
    collectionLinks.appendChild(collectionLinkDescription);

    const collectionLinkBody = document.createElement("div");
    collectionLinkBody.classList.add("flex" , "justify-between" , "items-center");
    collectionLinks.appendChild(collectionLinkBody);

    const collectionTitle = document.createElement("h1");
    collectionTitle.classList.add("text-2xl" , "font-medium");
    collectionTitle.innerText = CollectionNameUpload.value;
    collectionLinkHeader.appendChild(collectionTitle);

    const collectionMiniSetting = document.createElement("p");
    collectionMiniSetting.classList.add("text-[20px]");
    collectionMiniSetting.innerText = "...";
    collectionLinkHeader.appendChild(collectionMiniSetting);

    const collectionNumberCards = document.createElement("p");
    collectionNumberCards.classList.add("w-1/3" , "bg-[#c0c0c0]" , "text-center" , "rounded-3xl" , "mt-2");
    collectionNumberCards.innerText = collectionCardNumber + " Cards";
    collectionLinkBody.appendChild(collectionNumberCards);

    collectionLinks.addEventListener("click", (e) => {
        e.preventDefault();
        try {
            localStorage.setItem("selectedCollectionId", collectionLinks.id);
            console.log(collectionLinks.id);
            setTimeout( () => {
                window.location.href = "/oneCollection.html";
            } , 100);
        } catch {
            console.log("Le localstorage , travaille pas .");
            return;
        }
    });

    CollectionNameUpload.value = "";
    CollectionDescriptionUpload.value = "";
}

function saveCollectionsToLocalStorage() {
    localStorage.setItem("collectionsHTML", CollectionDivContainer.innerHTML);
}

function loadCollectionsFromLocalStorage() {
    const saved = localStorage.getItem("collectionsHTML");
    if (saved) {
        CollectionDivContainer.innerHTML = saved;

        const collectionLinks = CollectionDivContainer.querySelectorAll("a");
        collectionLinks.forEach(element => {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                try {
                    localStorage.setItem("selectedCollectionId", element.id);
                    window.location.href = "/oneCollection.html";
                } catch {
                    console.log("LocalStorage ne fonctionne pas");
                }
            });
        });
    }
}

function creationCollectionLink() {
    let collections = JSON.parse(localStorage.getItem("collectionsData")) || [];

    let collection = {
        id: CollectionNameUpload.value.toLowerCase().replace(/ /g, "_"),
        title: CollectionNameUpload.value,
        description: CollectionDescriptionUpload.value,
        cards: []
    };

    let existe = collections.some(col => col.id === collection.id);
    if (existe) {
        alert("Cette collection est existe");
        return;
    }
    collections.push(collection);
    localStorage.setItem("collectionsData", JSON.stringify(collections));


    creerCollectionDiv();

    saveCollectionsToLocalStorage();

    CreateCollectionForm.classList.add("hidden");
    pageContent.classList.remove("blur-2xl");
}

window.addEventListener("load", loadCollectionsFromLocalStorage);

saveCollectionButton.addEventListener("click", (e) => {
    e.preventDefault();

    collectionNumber++;
    localStorage.setItem("numberOfCollection" , collectionNumber);

    creationCollectionLink();
});





// collection name number of words
CollectionNameUpload.addEventListener("input" , () => {
    const collectionNumberWords = document.getElementById("collection_number--words");
    collectionNumberWords.textContent = CollectionNameUpload.value.length + "/32";
});

// window.addEventListener("load" , () => {
//     localStorage.clear();
// });
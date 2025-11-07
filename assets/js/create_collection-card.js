// create collection form display
const CreateCollectionButon = document.getElementById("Create_collection--Buton");
const CreateCollectionForm = document.getElementById("Create_collection--Form");
const pageContent = document.getElementById("pageContent");
const retourCreateCollectiomButton = document.getElementById("retour_create_collectiom--button");

CreateCollectionButon.addEventListener("click" , () => {
    CreateCollectionForm.classList.remove("hidden");
    pageContent.classList.add("blur-2xl");
    console.log("Click");
});

retourCreateCollectiomButton.addEventListener("click" , () => {
    CreateCollectionForm.classList.add("hidden");
    pageContent.classList.remove("blur-2xl");
});



// Collection info 
const CollectionNameUpload = document.getElementById("Collection_Name");
const CollectionImagesUpload = document.getElementById("Collection_images");
const CollectionDescriptionUpload = document.getElementById("Collection_description");
const CollectionDivContainer = document.getElementById("Collection_div--container"); // div de container collection
const saveCollectionButton = document.getElementById("save_collection--Button"); // save collection buton
let collectionNumber = 0 ;

function uploadImage() {
    const upload_image_cover = document.getElementById("upload_image_cover");
    let imgLink = URL.createObjectURL(CollectionImagesUpload.files[0]);
    return imgLink;
}

CollectionImagesUpload.addEventListener("input" , uploadImage);


saveCollectionButton.addEventListener("click" , (e) => {
    e.preventDefault();


    const collectionLinks = document.createElement("a");
    collectionLinks.classList.add("w-full" , "h-[310px]" , "border" , "border-[#c0c0c0]" ,  "rounded-2xl" , "shadow-[1px_1px_4px_#c0c0c0]" , "hover:scale-[1.02]" , "cursor-pointer");
    collectionLinks.setAttribute("href" , "oneCollection.html");
    CollectionDivContainer.appendChild(collectionLinks);

    const collectionLinkDiv = document.createElement("div");
    collectionLinks.appendChild(collectionLinkDiv);

    const collectionDivImage = document.createElement("div");
    collectionDivImage.classList.add("w-full" , "flex" , "justify-center" , "items-center" , "mt-2.5");
    collectionLinkDiv.appendChild(collectionDivImage);

    const collectionImage = document.createElement("img");
    collectionImage.classList.add("w-[90%]" , "max-h-[150px]");
    let imgLink = uploadImage();
    collectionImage.setAttribute("src" , imgLink);
    collectionDivImage.appendChild(collectionImage);

    const collectionDivText = document.createElement("div");
    collectionDivText.classList.add("ml-2.5" , "mt-2.5");
    collectionLinkDiv.appendChild(collectionDivText);

    const CollectionName = document.createElement("h1");
    CollectionName.classList.add("text-xl" , "font-medium");
    CollectionName.textContent = CollectionNameUpload.value;
    collectionDivText.appendChild(CollectionName);

    const collectionDescription = document.createElement("h1");
    collectionDescription.classList.add("text-xs" , "mt-1" , "mb-1" , "w-full" , "whitespace-normal" , "wrap-break-word");
    collectionDescription.textContent = CollectionDescriptionUpload.value;
    collectionDivText.appendChild(collectionDescription);

    const cardsNumber = document.createElement("h1");
    cardsNumber.classList.add("w-1/3" , "bg-[#c0c0c0]" , "text-center" , "rounded-3xl" , "mt-2");
    cardsNumber.textContent = collectionNumber + " cards";
    collectionDivText.appendChild(cardsNumber);
    collectionNumber++;


    fetch("/data/collection/collections.json").then(response => response.json()).then(data => {
        data.collection.push({
            id : CollectionNameUpload.value.toLowerCase(),
            title : CollectionNameUpload.value,
            card : []
        });
    });




    CollectionNameUpload.value = "";
    CollectionDescriptionUpload.value = "";
    CollectionImagesUpload.value = "";

    CreateCollectionForm.classList.add("hidden");
    pageContent.classList.remove("blur-2xl");
});




// collection name number of words
CollectionNameUpload.addEventListener("input" , () => {
    const collectionNumberWords = document.getElementById("collection_number--words");
    collectionNumberWords.textContent = CollectionNameUpload.value.length + "/32";
});
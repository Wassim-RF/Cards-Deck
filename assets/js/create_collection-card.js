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
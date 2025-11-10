window.addEventListener("load" , () => {
    let numberOfCollection = localStorage.getItem("numberOfCollection");
    if (numberOfCollection !== 0) {
        document.getElementById("numberOfCollectionHome").innerText = numberOfCollection;
    }
})
document.addEventListener("DOMContentLoaded", function () {

    // Select the button and popup elements
    var butns = document.querySelector(".StartInvide");
    var popupboxs = document.querySelector(".inviting-popup");

    if (!butns || !popupboxs) {
        return;
    }

    butns.addEventListener("click", function () {
        popupboxs.classList.add("active");
    });

    document.addEventListener("click", function (e) {
        if (!popupboxs.contains(e.target) && e.target !== butns) {
            popupboxs.classList.remove("active");
        }
    });

    popupboxs.addEventListener("click", function (e) {
        e.stopPropagation();
    });
    
});
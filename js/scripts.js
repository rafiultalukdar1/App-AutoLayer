// JavaScript for Popup and Redirect
document.addEventListener("DOMContentLoaded", function () {
    var popupButtons = document.querySelectorAll(".ConnectWalletBtn");
    var popup = document.getElementById("ConnectWalletPopup");
    var popupContent = document.querySelector(".popup-dialog");
    var closePopup = document.querySelector(".closePopup");

    let linkHref = "";

    popupButtons.forEach(function (popupButton) {
        popupButton.addEventListener("click", function (event) {
            event.preventDefault();
            linkHref = popupButton.getAttribute("href");
            popup.style.display = "flex";
        });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        if (linkHref) {
            window.location.href = linkHref;
        }
    });
    popup.addEventListener("click", function (event) {
        if (!popupContent.contains(event.target)) {
            popup.style.display = "none";
            if (linkHref) {
                window.location.href = linkHref;
            }
        }
    });
});

function slideToggle(element, duration = 300) {
    if (!element) return;

    let computedStyle = window.getComputedStyle(element);
    let display = computedStyle.display;

    if (display === "none") {
        element.style.display = "block";
        let height = element.scrollHeight + "px";
        element.style.height = "0";
        element.offsetHeight;
        element.style.transition = `height ${duration}ms ease-in-out`;
        element.style.height = height;

        setTimeout(() => {
            element.style.height = "";
            element.style.transition = "";
        }, duration);
    } else {
        let height = element.scrollHeight + "px";
        element.style.height = height;
        element.offsetHeight;
        element.style.transition = `height ${duration}ms ease-in-out`;
        element.style.height = "0";

        setTimeout(() => {
            element.style.display = "none";
            element.style.height = "";
            element.style.transition = "";
        }, duration);
    }
}

document.getElementById("toggleButton").addEventListener("click", function (event) {
    event.stopPropagation();
    let content = document.querySelector(".setting-dropdown-card");
    slideToggle(content, 500);
});

document.addEventListener("click", function (event) {
    let content = document.querySelector(".setting-dropdown-card");
    let button = document.getElementById("toggleButton");

    if (content.style.display === "block" && !content.contains(event.target) && !button.contains(event.target)) {
        slideToggle(content, 500);
    }
});

// JavaScript for Popup and Redirect

document.addEventListener("DOMContentLoaded", function () {
    const popupButtons = document.querySelectorAll(".lang-change-btn");
    const popup = document.getElementById("LanguasePopup");
    const closePopup = popup.querySelector(".popup-close-btn");

    popupButtons.forEach(function (popupButton) {
        popupButton.addEventListener("click", function (event) {
            event.preventDefault();
            popup.style.display = "flex";
        });
    });

    if (closePopup) {
        closePopup.addEventListener("click", function () {
            popup.style.display = "none";
        });
    }

    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    menuToggleBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        mobileNav.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
        if (!mobileNav.contains(event.target) && !menuToggleBtn.contains(event.target)) {
            mobileNav.classList.remove("show");
        }
    });
});


// network change popup

document.addEventListener("DOMContentLoaded", function () {
    const popupButtons = document.querySelectorAll(".NetworkChangeBtn");
    const popup = document.getElementById("NetworkChangePopup");
    const closePopup = popup.querySelector(".popup-close-btn");

    popupButtons.forEach(function (popupButton) {
        popupButton.addEventListener("click", function (event) {
            event.preventDefault();
            popup.style.display = "flex";
        });
    });

    if (closePopup) {
        closePopup.addEventListener("click", function () {
            popup.style.display = "none";
        });
    }

    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});

// Function to handle the click behavior
document.addEventListener("DOMContentLoaded", function () {
    const networkArea = document.querySelector(".select-network");
    const selectNetwork = document.querySelector(".SelectNetwork");

    selectNetwork.addEventListener("click", function (event) {
        event.stopPropagation();
        networkArea.classList.toggle("active");
    });

    document.addEventListener("click", function () {
        if (networkArea.classList.contains("active")) {
            networkArea.classList.remove("active");
        }
    });
});

// tab js
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".deshboard-tab-button");
    const tabContents = document.querySelectorAll(".deshboard-tab-content");

    tabs[0].classList.add("active");
    tabContents[0].style.display = "block";

    tabs.forEach((tab) => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();

            tabs.forEach((t) => t.classList.remove("active"));

            tabContents.forEach((content) => (content.style.display = "none"));

            this.classList.add("active");

            const tabId = this.getAttribute("data-tab");
            document.getElementById(tabId).style.display = "block";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const mobileHeaders = document.querySelectorAll(".pool-mobile-header");

    mobileHeaders.forEach(function (header) {
        header.addEventListener("click", function () {
            const mobileExpanded = header.nextElementSibling;

            if (mobileExpanded && mobileExpanded.classList.contains("pool-mobile-expanded")) {
                document.querySelectorAll(".pool-mobile-header.active").forEach(function (item) {
                    if (item !== header) {
                        item.classList.remove("active");
                    }
                });

                document.querySelectorAll(".pool-mobile-expanded.active").forEach(function (item) {
                    if (item !== mobileExpanded) {
                        item.classList.remove("active");
                    }
                });

                header.classList.toggle("active");
                mobileExpanded.classList.toggle("active");
            }
        });
    });
});

// rafer tabs js start hare

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".rafer-tab-nav button");
    const tabContents = document.querySelectorAll(".rafer-tab-content");

    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));
            this.classList.add("active");

            const targetTab = this.getAttribute("data-tabs");

            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });
});

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const serviceShowBtn = document.getElementById("ServiceShowBtn");
    const serviceWrapper = document.getElementById("ServiceWrapper");
    serviceShowBtn.addEventListener("click", function () {
        serviceWrapper.classList.toggle("hide");
        serviceShowBtn.classList.toggle("active");
    });
});


// Function to handle tooltip toggle and click outside
document.addEventListener("DOMContentLoaded", function () {
    const tooltipButtons = document.querySelectorAll(".tooltip-action");
    const riskCards = document.querySelectorAll(".risk-card-right");

    tooltipButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            const riskCard = this.closest(".risk-card-right");
            if (riskCard) {
                riskCard.classList.toggle("active");
            }
        });
    });

    // Remove 'active' class when clicking outside the tooltip
    document.addEventListener("click", function (event) {
        riskCards.forEach((card) => {
            if (!card.contains(event.target)) {
                card.classList.remove("active");
            }
        });
    });
});

document.getElementById("ShereBtn").addEventListener("click", function (event) {
    event.stopPropagation();
    const shereWrapper = document.querySelector(".shere-wrapper");
    shereWrapper.classList.toggle("active");
});

// Add a global click listener to remove the "active" class when clicking outside
document.addEventListener("click", function (event) {
    const shereWrapper = document.querySelector(".shere-wrapper");
    const shereButton = document.getElementById("ShereBtn");

    if (!shereWrapper.contains(event.target) && !shereButton.contains(event.target)) {
        shereWrapper.classList.remove("active");
    }
});

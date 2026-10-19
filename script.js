/* =========================================================
   SHIVAM SINGH — PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================================================
   01. HERO LOADING ANIMATION
   ========================================================= */

function firstPageAnim() {

    if (typeof gsap === "undefined") {

        console.warn(
            "GSAP was not loaded."
        );

        return;
    }


    const timeline =
        gsap.timeline();


    /*
        Navigation entrance
    */

    timeline.from(
        "#nav",
        {
            y: "-10",

            opacity: 0,

            duration: 1.2,

            ease: "expo.inOut"
        }
    );


    /*
        Hero text animation
    */

    timeline.to(
        ".boundingelement",
        {
            y: 0,

            ease: "expo.inOut",

            duration: 1.6,

            delay: -1.1,

            stagger: 0.15
        }
    );


    /*
        Hero footer
    */

    timeline.from(
        "#herofooter",
        {
            y: -10,

            opacity: 0,

            duration: 1.2,

            delay: -0.8,

            ease: "expo.inOut"
        }
    );

}


/* =========================================================
   02. CUSTOM MOUSE FOLLOWER
   ========================================================= */

function initMouseFollower() {


    const cursor =
        document.querySelector(
            "#minicircle"
        );


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (
        !cursor ||
        !finePointer ||
        typeof gsap === "undefined"
    ) {

        return;
    }


    /*
        quickSetter avoids creating a new GSAP animation
        every time the mouse moves.
    */

    const setX =
        gsap.quickSetter(
            cursor,
            "left",
            "px"
        );


    const setY =
        gsap.quickSetter(
            cursor,
            "top",
            "px"
        );


    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;


    /*
        Keep the cursor hidden until the user moves.
    */

    cursor.style.opacity = "0";


    /*
        Smooth cursor loop.
    */

    function updateCursor() {

        currentX +=
            (targetX - currentX) * 0.35;


        currentY +=
            (targetY - currentY) * 0.35;


        setX(currentX);

        setY(currentY);


        requestAnimationFrame(
            updateCursor
        );

    }


    /*
        Mouse position.
    */

    window.addEventListener(
        "mousemove",
        function (event) {

            targetX =
                event.clientX;

            targetY =
                event.clientY;


            cursor.style.opacity =
                "1";

        },
        {
            passive: true
        }
    );


    updateCursor();

}


/* =========================================================
   03. PROJECT HOVER
   Only one preview can be visible at a time.
   ========================================================= */

function initProjectHover() {


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!finePointer) {

        return;

    }


    const projects =
        document.querySelectorAll(
            ".elem"
        );


    if (!projects.length) {

        return;

    }


    let activeImage = null;

    let activeProject = null;

    let previousX = 0;


    /*
        Hide currently active image.
    */

    function hideActivePreview() {


        if (!activeImage) {

            return;

        }


        activeImage.style.opacity =
            "0";


        activeImage.style.visibility =
            "hidden";


        activeImage =
            null;


        activeProject =
            null;

    }


    projects.forEach(
        function (project) {


            const image =
                project.querySelector(
                    "img"
                );


            if (!image) {

                return;

            }


            /*
                Initial state.
            */

            image.style.opacity =
                "0";


            image.style.visibility =
                "hidden";


            /*
                Project entered.
            */

            project.addEventListener(
                "mouseenter",
                function () {


                    /*
                        Remove the previous preview
                        before showing the new one.
                    */

                    hideActivePreview();


                    activeProject =
                        project;


                    activeImage =
                        image;


                    previousX =
                        0;


                    image.style.visibility =
                        "visible";


                    image.style.opacity =
                        "1";

                }
            );


            /*
                Project moved over.
            */

            project.addEventListener(
                "mousemove",
                function (event) {


                    if (
                        activeProject !==
                        project
                    ) {

                        return;

                    }


                    const difference =
                        event.clientX -
                        previousX;


                    previousX =
                        event.clientX;


                    /*
                        Small rotation only.
                    */

                    const rotation =
                        Math.max(
                            -8,
                            Math.min(
                                8,
                                difference
                            )
                        );


                    /*
                        Direct positioning avoids
                        unnecessary GSAP animations.
                    */

                    image.style.left =
                        `${event.clientX}px`;


                    image.style.top =
                        `${event.clientY - 20}px`;


                    image.style.transform =
                        `translate(-50%, -50%)
                         rotate(${rotation}deg)`;

                }
            );


            /*
                Project left.
            */

            project.addEventListener(
                "mouseleave",
                function () {


                    if (
                        activeProject ===
                        project
                    ) {

                        hideActivePreview();

                    }

                }
            );

        }
    );


    /*
        Extra safety when the pointer leaves the browser.
    */

    document.addEventListener(
        "mouseleave",
        hideActivePreview
    );

}


/* =========================================================
   04. MOBILE MENU
   ========================================================= */

function initMobileMenu() {


    const menuButton =
        document.querySelector(
            "#menuBtn"
        );


    const menu =
        document.querySelector(
            "#mobileMenu"
        );


    if (
        !menuButton ||
        !menu
    ) {

        return;

    }


    /*
        Close menu.
    */

    function closeMenu() {


        menu.classList.remove(
            "open"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        const icon =
            menuButton.querySelector(
                "span"
            );


        if (icon) {

            icon.textContent =
                "+";

        }

    }


    /*
        Toggle menu.
    */

    menuButton.addEventListener(
        "click",
        function (event) {


            event.stopPropagation();


            const isOpen =
                menu.classList.toggle(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            const icon =
                menuButton.querySelector(
                    "span"
                );


            if (icon) {

                icon.textContent =
                    isOpen
                        ? "×"
                        : "+";

            }

        }
    );


    /*
        Clicks inside the menu should not close it
        before the selected link gets processed.
    */

    menu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    /*
        Clicking anywhere outside closes the menu.
    */

    document.addEventListener(
        "click",
        function () {


            if (
                menu.classList.contains(
                    "open"
                )
            ) {

                closeMenu();

            }

        }
    );


    /*
        Escape closes the menu.
    */

    document.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /*
        Clicking a menu link closes the menu.
    */

    menu.querySelectorAll("a")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            }
        );

}


/* =========================================================
   05. EXPANDABLE SECTIONS
   Experience + Achievements
   ========================================================= */

function initExpandableSections() {


    const triggers =
        document.querySelectorAll(
            ".expand-trigger"
        );


    triggers.forEach(
        function (trigger) {


            const targetId =
                trigger.dataset.target;


            const content =
                document.getElementById(
                    targetId
                );


            if (!content) {

                return;

            }


            trigger.addEventListener(
                "click",
                function () {


                    const currentlyOpen =
                        trigger.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    const nextState =
                        !currentlyOpen;


                    /*
                        Accessibility state.
                    */

                    trigger.setAttribute(
                        "aria-expanded",
                        String(nextState)
                    );


                    /*
                        CSS handles the actual
                        height animation.
                    */

                    content.classList.toggle(
                        "open",
                        nextState
                    );

                }
            );

        }
    );

}


/* =========================================================
   06. LOR PDF PREVIEW
   ========================================================= */

function initLorPreview() {


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    /*
        Hover previews are desktop-only.
    */

    if (!finePointer) {

        return;

    }


    const preview =
        document.querySelector(
            "#lorPreview"
        );


    const frame =
        document.querySelector(
            "#lorPreviewFrame"
        );


    const title =
        document.querySelector(
            "#lorPreviewTitle"
        );


    const lorItems =
        document.querySelectorAll(
            ".lor-item"
        );


    if (
        !preview ||
        !frame ||
        !title ||
        !lorItems.length
    ) {

        return;

    }


    /*
        Show PDF preview.
    */

    function showPreview(item) {


        const pdfPath =
            item.dataset.lorPreview;


        const lorTitle =
            item.dataset.lorTitle;


        if (!pdfPath) {

            return;

        }


        title.textContent =
            lorTitle ||
            "LOR Preview";


        /*
            Set PDF source.
        */

        frame.src =
            pdfPath;


        preview.classList.add(
            "visible"
        );


        preview.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /*
        Hide preview.
    */

    function hidePreview() {


        preview.classList.remove(
            "visible"
        );


        preview.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
        Attach hover events.
    */

    lorItems.forEach(
        function (item) {


            item.addEventListener(
                "mouseenter",
                function () {

                    showPreview(item);

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    hidePreview();

                }
            );

        }
    );

}


/* =========================================================
   07. CURRENT YEAR
   ========================================================= */

function setCurrentYear() {


    const year =
        document.querySelector(
            "#year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   08. START PORTFOLIO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
            Existing loading animation.
        */

        firstPageAnim();


        /*
            Lightweight cursor.
        */

        initMouseFollower();


        /*
            Project previews.
        */

        initProjectHover();


        /*
            Navigation menu.
        */

        initMobileMenu();


        /*
            Expandable sections.
        */

        initExpandableSections();


        /*
            LOR previews.
        */

        initLorPreview();


        /*
            Dynamic year.
        */

        setCurrentYear();

    }
);
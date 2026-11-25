/* =========================================================
   BASHA SHAIK — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const LINKEDIN_URL =
        "https://www.linkedin.com/in/shaik-basha-920785246";

    const GITHUB_URL =
        "https://github.com/Basha-KS";

    // Place resume.pdf in the same folder as your HTML file.
    // Otherwise, update this path to match your PDF location.
    const RESUME_URL = "Basha_Shaik_Resume.pdf";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const html = document.documentElement;
    const body = document.body;

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    const navLinks = [
        ...document.querySelectorAll(".nav-link")
    ];

    const sections = [
        ...document.querySelectorAll("section[id]")
    ];

    const themeButtons = [
        ...document.querySelectorAll(".theme-btn")
    ];

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const backTop =
        document.getElementById("backTop");


    /* =====================================================
       EXTERNAL LINKS
       LINKEDIN, GITHUB AND RESUME
    ===================================================== */

    function configureExternalLink(element, url) {
        if (!element) return;

        element.href = url;
        element.target = "_blank";
        element.rel = "noopener noreferrer";
    }


    /*
       Automatically recognize LinkedIn and GitHub links
       through their icons, classes, or data attributes.
    */

    document.querySelectorAll("a").forEach(link => {
        const icon = link.querySelector("i, svg");

        const iconClasses = icon
            ? icon.className.toString().toLowerCase()
            : "";

        const linkClasses =
            link.className.toString().toLowerCase();

        const dataSocial =
            (link.dataset.social || "").toLowerCase();

        const text =
            link.textContent.trim().toLowerCase();

        const existingHref =
            (link.getAttribute("href") || "").toLowerCase();


        // LinkedIn logo or "Connect With Me" button
        const isLinkedIn =
            dataSocial === "linkedin" ||
            link.dataset.contact === "linkedin" ||
            linkClasses.includes("linkedin") ||
            iconClasses.includes("linkedin") ||
            existingHref.includes("linkedin.com") ||
            text.includes("connect with me");

        if (isLinkedIn) {
            configureExternalLink(link, LINKEDIN_URL);
        }


        // GitHub logo
        const isGitHub =
            dataSocial === "github" ||
            linkClasses.includes("github") ||
            iconClasses.includes("github") ||
            existingHref.includes("github.com");

        if (isGitHub) {
            configureExternalLink(link, GITHUB_URL);
        }


        // Resume / Download CV button
        const isDownloadButton =
            link.hasAttribute("data-download-resume") ||
            linkClasses.includes("download-cv") ||
            linkClasses.includes("download-btn") ||
            linkClasses.includes("resume-download") ||
            (
                text.includes("download") &&
                (
                    text.includes("cv") ||
                    text.includes("resume")
                )
            );

        if (isDownloadButton) {
            configureExternalLink(link, RESUME_URL);
        }
    });


    /* =====================================================
       THEME SWITCHER
       LIGHT / DARK / SYSTEM
    ===================================================== */

    const THEME_KEY = "basha-portfolio-theme";

    function getStoredTheme() {
        try {
            return localStorage.getItem(THEME_KEY) || "system";
        } catch (error) {
            return "system";
        }
    }


    function setTheme(theme) {
        if (!["light", "dark", "system"].includes(theme)) {
            theme = "system";
        }

        html.dataset.theme = theme;

        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Theme still works for the current page session.
        }

        themeButtons.forEach(button => {
            const buttonTheme = button.dataset.themeChoice;

            button.classList.toggle(
                "active",
                buttonTheme === theme
            );

            button.setAttribute(
                "aria-pressed",
                String(buttonTheme === theme)
            );
        });
    }


    setTheme(getStoredTheme());


    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            setTheme(button.dataset.themeChoice);
        });
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {
        if (!navbar || !menuToggle) return;

        navbar.classList.add("open");

        menuToggle.setAttribute("aria-label", "Close navigation");
        menuToggle.setAttribute("aria-expanded", "true");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }


    function closeMenu() {
        if (!navbar || !menuToggle) return;

        navbar.classList.remove("open");

        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.setAttribute("aria-expanded", "false");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }


    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            if (navbar.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }


    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    document.addEventListener("click", event => {
        if (!navbar || !menuToggle) return;

        if (
            !navbar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {
            link.addEventListener("click", event => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 220;

        let currentSection = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );
        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {
        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;

        document.addEventListener(
            "mousemove",
            event => {
                mouseX = event.clientX;
                mouseY = event.clientY;
            },
            { passive: true }
        );


        function animateCursor() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;

            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       CONTACT MODAL
    ===================================================== */

    const contactModal =
        document.getElementById("contactModal");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalClose =
        document.getElementById("modalClose");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalLabel =
        document.getElementById("modalLabel");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalValue =
        document.getElementById("modalValue");

    const modalAction =
        document.getElementById("modalAction");


    const contactData = {
        email: {
            icon: '<i class="fa-solid fa-envelope"></i>',
            label: "EMAIL",
            title: "Send Me a Message",
            value: "bashaik5899@gmail.com",
            actionText: "Send Email",
            action: "mailto:bashaik5899@gmail.com"
        },

        phone: {
            icon: '<i class="fa-solid fa-phone"></i>',
            label: "PHONE",
            title: "Let’s Talk Directly",
            value: "+91 6303960313",
            actionText: "Call Now",
            action: "tel:+916303960313"
        }
    };


    function openContactModal(type) {
        const data = contactData[type];

        if (
            !data ||
            !contactModal ||
            !modalIcon ||
            !modalLabel ||
            !modalTitle ||
            !modalValue ||
            !modalAction
        ) {
            return;
        }

        modalIcon.innerHTML = data.icon;
        modalLabel.textContent = data.label;
        modalTitle.textContent = data.title;
        modalValue.textContent = data.value;

        modalAction.innerHTML =
            `${data.actionText}
             <i class="fa-solid fa-arrow-right"></i>`;

        modalAction.href = data.action;

        contactModal.classList.add("active");

        contactModal.setAttribute("aria-hidden", "false");

        body.classList.add("modal-open");

        if (modalClose) {
            modalClose.focus();
        }
    }


    function closeContactModal() {
        if (!contactModal) return;

        contactModal.classList.remove("active");

        contactModal.setAttribute("aria-hidden", "true");

        body.classList.remove("modal-open");
    }


    document
        .querySelectorAll(".contact-trigger[data-contact]")
        .forEach(trigger => {
            trigger.addEventListener("click", event => {
                const type = trigger.dataset.contact;

                /*
                   LinkedIn is a normal external link.
                   The browser opens it in a new tab.
                */

                if (type === "linkedin") {
                    return;
                }

                event.preventDefault();

                openContactModal(type);
            });
        });


    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeContactModal
        );
    }


    if (modalOverlay) {
        modalOverlay.addEventListener(
            "click",
            closeContactModal
        );
    }


    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            contactModal &&
            contactModal.classList.contains("active")
        ) {
            closeContactModal();
        }
    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackTop() {
        if (!backTop) return;

        backTop.classList.toggle(
            "show",
            window.scrollY > 600
        );
    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );

    updateBackTop();


    if (backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       CLOSE MENU ON RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener("keydown", event => {
        if (event.key === "Tab") {
            body.classList.add("keyboard-user");
        }
    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cBasha Shaik Portfolio",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cFrontend Developer | Angular | TypeScript | JavaScript",
        "font-size:12px;"
    );

});
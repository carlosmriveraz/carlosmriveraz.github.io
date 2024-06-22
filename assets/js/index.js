const headerEl = document.querySelector(".section-header");
const navIconEl = document.querySelector(".nav-toggle");

/************ DARK THEM MODE */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', "dark");
} else {
    document.documentElement.setAttribute('data-theme', "light");
}
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            //dark mode
            document.documentElement.setAttribute('data-theme', "dark")
        } else {
            //light mode
            document.documentElement.setAttribute('data-theme', "light");
        }
    })

/************ SHOW MENU - MOBILE */

navIconEl.addEventListener("click", () => {
    headerEl.classList.toggle("show-menu");
});

/************ GET YEAR */

const yearEl = document.querySelector(".year");
yearEl.innerHTML = new Date().getFullYear();

/************ Smooth Scrolling */

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
        const href = link.getAttribute("href");

        if (!href.startsWith("mailto:") && !href.startsWith("https"))
            e.preventDefault();

        //Scroll back to top
        if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

        // Scroll to other page
        if (href !== "#" && href.startsWith("#")) {
            const sectionEl = document.querySelector(href);

            sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        if (headerEl.classList.contains("show-menu"))
            headerEl.classList.toggle("show-menu");
    });
});

/************ Reveal Section */

const allSectionsEl = document.querySelectorAll("section");

const revealSection = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
});

allSectionsEl.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});




// Cambiar idioma
function toggleLanguage() {
    const language = document.documentElement.lang === 'es' ? 'en' : 'es';
    document.documentElement.lang = language;
    translateContent(language);
}

function translateContent(language) {
    if (language === 'es') {
        document.querySelector('#info h1').innerText = 'Información';
        document.querySelector('#info p').innerText = 'Experiencia en facturación electrónica y participación en equipos de proveedores tecnológicos.';
        document.querySelector('#steps h1').innerText = 'Pasos para la Facturación Electrónica';
        document.querySelector('#steps ul').innerHTML = `
                    <li>Paso 1: Registro en el sistema</li>
                    <li>Paso 2: Configuración del software</li>
                    <li>Paso 3: Generación de facturas</li>
                    <li>Paso 4: Envío de facturas</li>
                    <li>Paso 5: Recepción de confirmaciones</li>`;
        document.querySelector('#achievements h1').innerText = 'Logros y Casos de Éxito';
        document.querySelector('#achievements p').innerText = 'Descripción de los logros y casos de éxito en proyectos de facturación electrónica.';
        document.querySelector('#technologies h1').innerText = 'Tecnologías Usadas';
        document.querySelector('#technologies p').innerText = 'Descripción de las tecnologías utilizadas en el proyecto de facturación electrónica.';
        document.querySelector('footer p').innerText = 'Todos los derechos reservados y fotos protegidas por copyright.';
    } else {
        document.querySelector('#info h1').innerText = 'Information';
        document.querySelector('#info p').innerText = 'Experience in electronic invoicing and participation in technology provider teams.';
        document.querySelector('#steps h1').innerText = 'Steps for Electronic Invoicing';
        document.querySelector('#steps ul').innerHTML = `
                    <li>Step 1: Register in the system</li>
                    <li>Step 2: Software configuration</li>
                    <li>Step 3: Invoice generation</li>
                    <li>Step 4: Invoice sending</li>
                    <li>Step 5: Receiving confirmations</li>`;
        document.querySelector('#achievements h1').innerText = 'Achievements and Success Stories';
        document.querySelector('#achievements p').innerText = 'Description of achievements and success stories in electronic invoicing projects.';
        document.querySelector('#technologies h1').innerText = 'Technologies Used';
        document.querySelector('#technologies p').innerText = 'Description of the technologies used in the electronic invoicing project.';
        document.querySelector('footer p').innerText = 'All rights reserved and photos protected by copyright.';
    }
}
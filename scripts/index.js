/************ DARK THEM MODE */
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
	document.documentElement.setAttribute("data-theme", "dark");
} else {
	document.documentElement.setAttribute("data-theme", "light");
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
	if (event.matches) {
		//dark mode
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		//light mode
		document.documentElement.setAttribute("data-theme", "light");
	}
});

/************ GET YEAR */

const yearEl = document.querySelector(".year");
yearEl.innerHTML = new Date().getFullYear();

/************ Smooth Scrolling */

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
	link.addEventListener("click", function (e) {
		const href = link.getAttribute("href");

		if (!href.startsWith("mailto:") && !href.startsWith("https")) e.preventDefault();

		//Scroll back to top
		if (href === "#") window.scrollTo({top: 0, behavior: "smooth"});

		// Scroll to other page
		if (href !== "#" && href.startsWith("#")) {
			const sectionEl = document.querySelector(href);

			sectionEl.scrollIntoView({behavior: "smooth"});
		}

		if (headerEl.classList.contains("show-menu")) headerEl.classList.toggle("show-menu");
	});
});

/************ Reveal Section */

const allSectionsEl = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
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
// Toggle menu
function toggleMenu() {
	document.querySelector(".header__nav-list").classList.toggle("show-menu");
}

// Active link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".header__nav-list a");

window.addEventListener("scroll", () => {
	let current = "";

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		if (scrollY >= sectionTop - 60) {
			current = section.getAttribute("id");
		}
	});

	navLinks.forEach((link) => {
		link.classList.remove("active");
		if (link.getAttribute("href").includes(current)) {
			link.classList.add("active");
		}
	});
});

// Add click event to nav links to maintain active class
navLinks.forEach((link) => {
	link.addEventListener("click", function () {
		navLinks.forEach((nav) => nav.classList.remove("active"));
		this.classList.add("active");
	});
});

document.querySelectorAll(".header__nav-list a").forEach((link) => {
	link.addEventListener("click", function () {
		document.querySelector(".header__nav-list a.active").classList.remove("active");
		this.classList.add("active");
	});
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		const target = document.querySelector(this.getAttribute("href"));
		target.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	});
});


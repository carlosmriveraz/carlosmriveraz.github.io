/************ DARK THEM MODE */
if (
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches
) {
	document.documentElement.setAttribute("data-theme", "dark");
} else {
	document.documentElement.setAttribute("data-theme", "light");
}
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", (event) => {
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



document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.header__nav-list a');

  // Remove active class from all nav items
  function removeActiveClasses() {
    navItems.forEach(item => {
      item.classList.remove('active');
    });
  }

  // Add active class to the current nav item
  function addActiveClass(sectionId) {
    const currentItem = document.querySelector(`.header__nav-list a[href="#${sectionId}"]`);
    if (currentItem) {
      currentItem.classList.add('active');
    }
  }

  // On click, update the active class
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      removeActiveClasses();
      this.classList.add('active');
    });
  });

  // On scroll, update the active class
  window.addEventListener('scroll', function() {
    let currentSectionId;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    removeActiveClasses();
    addActiveClass(currentSectionId);
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.header__nav-list a');

  // Remove active class from all nav items
  function removeActiveClasses() {
    navItems.forEach(item => {
      item.classList.remove('active');
    });
  }

  // Add active class to the current nav item
  function addActiveClass(sectionId) {
    const currentItem = document.querySelector(`.header__nav-list a[href="#${sectionId}"]`);
    if (currentItem) {
      currentItem.classList.add('active');
    }
  }

  // On click, update the active class
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      removeActiveClasses();
      this.classList.add('active');
    });
  });

  // On scroll, update the active class
  window.addEventListener('scroll', function() {
    let currentSectionId;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    removeActiveClasses();
    addActiveClass(currentSectionId);
  });
});


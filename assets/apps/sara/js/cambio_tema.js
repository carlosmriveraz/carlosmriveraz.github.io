document.getElementById("config-icon").addEventListener("click", function () {
  var menu = document.getElementById("config-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

document.querySelectorAll('input[name="theme"]').forEach((input) => {
  input.addEventListener("change", function () {
    document.body.className = ""; // Elimina clases existentes
    if (this.value === "light") {
      document.body.classList.add("theme-light");
    } else if (this.value === "dark") {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.add("theme-space");
    }
  });
});

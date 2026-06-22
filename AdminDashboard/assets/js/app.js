// Loader
function showLoader() {
  $("#loader").removeClass("hidden");
}
function hideLoader() {
  $("#loader").addClass("hidden");
}

// Theme toggle
$(document).ready(function () {
  const body = $("body");
  const themeToggle = $("#themeToggle");
// read from local storage
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.addClass("theme-dark");
    themeToggle.text("☀️");
  } else {
    themeToggle.text("🌙");
  }

  themeToggle.on("click", () => {
    body.toggleClass("theme-dark");
    if (body.hasClass("theme-dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.text("☀️");
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.text("🌙");
    }
  });
});

// Toastr setup
toastr.options = {
  positionClass: "toast-top-right",
  timeOut: 2000,
};

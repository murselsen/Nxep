document.addEventListener("DOMContentLoaded", (e) => {
  let urlFile =
    e.target.location.pathname.split("/")[
      e.target.location.pathname.split("/").length - 1
    ];
  document.querySelectorAll(".menu-link").forEach((menuItem) => {
    let href = menuItem.getAttribute("href");
    if (href === urlFile) {
      menuItem.parentElement.classList.add("active");
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-container').innerHTML = html;
    });
});

window.addEventListener("DOMContentLoaded", () => {
  fetch('/components/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-container').innerHTML = html;
    });
});

// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1

var burger = document.querySelector('.burger');
var menu = document.querySelector('#' + burger.dataset.target);
burger.addEventListener('click', function () {
  burger.classList.toggle('is-active');
  menu.classList.toggle('nav-menu-center');
  menu.classList.toggle('is-active');
});
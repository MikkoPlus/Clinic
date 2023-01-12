'use strict';

window.addEventListener('DOMContentLoaded', () => {
    function openMenuHandler () {
        const hamburger = document.querySelector('.hamburger'),
              menu = document.querySelector('.menu'),
              header = document.querySelector('.header');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('hamburger_open');
                
                if (hamburger.classList.contains('hamburger_open')) {
                    menu.classList.add('menu_open');
                    header.classList.add('header_menu-open');
                } else {
                    menu.classList.remove('menu_open');
                    header.classList.remove('header_menu-open');
                }
            });
    }
    openMenuHandler ();
});
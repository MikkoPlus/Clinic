'use strict';

window.addEventListener('DOMContentLoaded', () => {
    function openMenuHandler () {
        const hamburger = document.querySelector('.hamburger'),
              header = document.querySelector('.header'),
              menu = header.querySelector('.menu');


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

    function sliderHandler() {
        const sliderWrapper = document.querySelector('.chech-up__wrapper'),
              sliderInner = sliderWrapper.querySelector('.check-up__inner'),
              slides = sliderWrapper.querySelectorAll('.card'),
              prev = document.querySelector('.controls__arr_left'),
              next = document.querySelector('.controls__arr_right'),
              currentCount = document.querySelector('#current'),
              totalCount = document.querySelector('#total'),
              width = window.getComputedStyle(sliderWrapper).width;



        function startInnerSlider () {

            let slideIndex = 1,
                offset = 0;

            function deliteNoteDigits(str) {
                return +str.replace(/\D/g, '');
            }
    
            function showCurrentSlide (currSlide) {
                currentCount.textContent = currSlide;
            }
    
            totalCount.textContent = slides.length;
    
            sliderInner.style.width = 100 * slides.length + '%';
    
            next.addEventListener('click', () => {
                if (offset >= (deliteNoteDigits(width) * slides.length - 1 + 1) - deliteNoteDigits(width)) {
                    offset = 0;
                    slideIndex = 0;
                    currentCount.textContent = slideIndex;
                } else {
                    offset += deliteNoteDigits(width);
                    currentCount.textContent = slideIndex;
                }
                sliderInner.style.transform = `translateX(-${offset}px)`;
    
                if (slideIndex == slides.length) {
                    slideIndex = 1;
                } else {
                    slideIndex++;
                }
                showCurrentSlide (slideIndex);
            });
    
            
        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = deliteNoteDigits(width) * (slides.length - 1);
            } else {
                offset -= deliteNoteDigits(width);
            }
    
            sliderInner.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
            showCurrentSlide (slideIndex);
        });
        }

        if (slides.length > 1) {
            startInnerSlider();
        }
    }

    sliderHandler();
    openMenuHandler ();
});
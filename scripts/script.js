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
        const sliderWrapper = document.querySelector('.check-up__wrapper'),
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

    function popupHandler () {
      const buttons = document.querySelectorAll('button.button'),
            popup = document.querySelector('.popup'),
            page = document.querySelector('.page'),
            pageWidth = page.getBoundingClientRect().width; 
    
      function bodyLock () {
        page.classList.add('page_lock');
    
        const openPopupPageWidth = page.getBoundingClientRect().width,
              sideScrollWidth = openPopupPageWidth - pageWidth + 'px';
    
            page.style.paddingRight = sideScrollWidth;
      }
    
      function bodyUnlock () {
        page.style.paddingRight = 0;
        page.classList.remove('page_lock');
      }
      function openPopup (targetPopup) {
        targetPopup.parentElement.classList.add('popup_open');
        targetPopup.classList.add('popup__window_open');
        
        closePopupOnIconClick(targetPopup);
        bodyLock();
      }
    
      function closePopupOnIconClick (targetPopup) {
        const closeIcon = targetPopup.querySelector('.popup__close'); 
    
        closeIcon.addEventListener('click', closePopup);
      }
      
      function clearInputsValueAfterClosePopup (popup) {
        const form = popup.querySelector('form');
        form.querySelectorAll('input').forEach(input => {
          input.value = '';
        });
      }
    
      function closePopup (event) {
        const targetPopup = event.target.parentElement;
    
        targetPopup.parentElement.classList.remove('popup_open');
    
        setTimeout(() => {
          targetPopup.classList.remove('popup__window_open');
        }, 400);
        bodyUnlock();
        clearInputsValueAfterClosePopup(targetPopup);
      }
    
      buttons.forEach(btn => {
        if (btn.hasAttribute('data-popup')) {
          btn.addEventListener('click', e => {
            e.preventDefault();
    
            const targetBtn = e.target,
                  popupId = targetBtn.getAttribute('data-popup'),
                  targetPopup = popup.querySelector(`#${popupId}`);
    
            openPopup(targetPopup);
          });
        }
      });
    }

    function submitFormHandler () {
      const form = document.querySelector('#appointment-form');
    
      form.addEventListener('submit', formSend);
    
      async function formSend (e) {
        e.preventDefault();
    
        let error = formValidate(),
            formData = new FormData(form);
    
            if (error === 0) {
              form.classList.add('form_sending');
    
              let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
              });
              if (response.ok) {
                let result = await response.json();
      
                alert(result.message);
                form.reset();
                form.classList.remove('form_sending');
              } else {
                alert('Ошибка!');
                form.classList.remove('form_sending');
              }
            } else {
              alert('Заполните обязательные поля!');
            }
      }
    
      function formValidate() {
        let error = 0,
            formReq = document.querySelectorAll('._req');
    
        for (let i = 0; i < formReq.length; i++) {
          const input = formReq[i];
          formRemoveError(input);

          if (input.classList.contains('form__input_type_email')) {
            if (emailTest(input)) {
              formAddError(input);
              error++;
            }
          } else if (input.classList.contains('form__input_type_number')) {
              let length = input.value.length;
              if (length !== 18) {
                formAddError(input);
                error++;
              }
          }
           else {
            if (input.value === '') {
              formAddError(input);
              error++;
            }
          }
        }
        return error;
      }

      function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
      }
    
      function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
      }

      // Функция теста email        
      function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
    
    }

    sliderHandler();
    openMenuHandler ();
    popupHandler ();
    submitFormHandler ();
});

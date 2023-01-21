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

    function sliderHandler () {
        const sliderWrapper = document.querySelector('.check-up__wrapper'),
              sliderInner = sliderWrapper.querySelector('.check-up__inner'),
              slides = sliderWrapper.querySelectorAll('.card'),
              controlsBar = document.querySelector('.controls'),
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
        } else {
          controlsBar.style.display = 'none';
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

    function checkUpCardsHandler () {


      const checkUpBase = [
        {
          title: "check-up",
          gender: "для мужчин",
          tests: ['Гормональный скрининг', 'Тестостерон', 'Свободный тестостерон', 'Глобулин, связывающий половые гормоны'],
          price: {
            total: 2800,
            ex: 3500
          }
        },
        {
          title: "check-up",
          gender: "для мужчин",
          tests: ['Гормональный скрининг', 'Тестостерон', 'Свободный тестостерон', 'Глобулин, связывающий половые гормоны'],
          price: {
            total: 3000,
            ex: 5000
          }
        },
        {
          title: "check-up",
          gender: "для женщин",
          tests: ['Гормональный скрининг', 'Глобулин, связывающий половые гормоны'],
          price: {
            total: 3000,
            ex: 4000
          }
        },
      ];

      

      checkUpBase.forEach(checkUp => {
        const {title, gender, tests} = checkUp;
        const {total, ex} = checkUp.price;

        const newCard = createCard(title, gender, tests, total, ex);

        renderCard(newCard);
      });


    //   class MenuCard {
    //     constructor(title, descr, price, parentSelector, ...classes) {
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price; 
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 27;
    //         this.changeToUAH();
    //     }
    //     render() {
    //         const element = document.createElement('div');
    //         if(this.classes.length === 0) {
    //             this.element = 'menu__item';
    //             element.classList.add(this.element);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));
    //         }
    //         element.innerHTML = `
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">${this.descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //             </div>
    //         `;
    //         this.parent.append(element);
    //     }
    // }

      function createCard (title, gender, tests, total, ex) {
        const cardTemplate = document.querySelector('#card').content,
               cardElement = cardTemplate.querySelector('.card').cloneNode(true),
               cardTitle = cardElement.querySelector('.card__title'),
               cardGender = cardElement.querySelector('.card__gender'),
               cardTestsList = cardElement.querySelector('.card__tests'),
               cardPrice = cardElement.querySelector('.card__total-price'),
               cardExPrice = cardElement.querySelector('.card__ex-price');
              
        cardTitle.textContent = title;
        cardGender.textContent = gender;

        tests.forEach(test => {
          const cardTestElement = document.createElement('li');

          cardTestElement.classList.add('card__test');
          cardTestElement.textContent = test;
          cardTestsList.append(cardTestElement);
        });

        cardPrice.textContent = `Всего: ${total}`;
        cardExPrice.textContent = ex;

        return cardElement;
      }

      function renderCard (card) {
        const checkUpInner = document.querySelector('.check-up__inner');

        console.log(card);

        checkUpInner.prepend(card);
      }

    }

    checkUpCardsHandler ();

    sliderHandler();
    openMenuHandler ();
    popupHandler ();
    submitFormHandler ();
});

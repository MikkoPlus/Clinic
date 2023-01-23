<?php require 'database.php' ?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./pages/index.css">
    <title>Клиника</title>
</head>
<body class="page">
        <header class="header">
            <div class="header__top-bar container">
                <div class="header__item">
                    <div class="hamburger">
                        <span class="hamburger__line"></span>
                      </div>
                    <a href="#" class="header__logo-link link">
                        <img src="./images/icons/logo.svg" alt="Логотип" class="logo">
                    </a>

                <div class="header__geoposition">
                    <p class="header__town">Ростов-на-Дону</p>
                    <p class="header__street">ул. Ленина, 2Б</p>
                </div>
                </div>
    
                <div class="header__item header__item_type_fullscreen">
                    <div class="header__call">
                        <a href="#"><img src="./images/icons/social/whatsapp.svg" alt="WhatsApp" class="header__num-icon link"></a>
                        <a href="tel:88630000000" class="header__number link">+7(863) 000 00 00</a>
                    </div>
                    <button data-popup="appointment" class="button">Записаться на прием</button>        
                </div>

                <div class="header__item header__item_type_mobile">
                    <a href="tel:88630000000" class="header__number link">+7(863) 000 00 00</a>
                    <p class="header__town">Ростов-на-Дону</p>
            </div>
            </div>
        </div>

            <nav class="header__menu-bar menu">
                <ul class="menu__list container">
                    <li class="menu__item"><a href="#" class="menu__link link">О клинике</a></li>
                    <li class="menu__item"><a href="#" class="menu__link link">Услуги</a></li>
                    <li class="menu__item"><a href="#" class="menu__link link">Специалисты</a></li>
                    <li class="menu__item"><a href="#" class="menu__link link">Цены</a></li>
                    <li class="menu__item"><a href="#" class="menu__link link">Контакты</a></li>
                </ul>

                <button data-popup="appointment" class="button button__menu">Записаться на прием</button>   
            </nav>
        </header>

        <main class="main">
            <section class="about">
                <div class="about__text-content container">
                    <h1 class="title about__title">Многопрофильная клиника для&nbsp;детей и&nbsp;взрослых</h1>
                    <p class="about__descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi totam doloremque tempore doloribus voluptatem facere sint rerum aliquam fugit illum.</p>
                </div>
                <img src="./images/content-pic/main-pic.webp" alt="Холл клиники" class="about__img">
            </section>

            <section class="check-up">
                <div class="check-up__wrapper container">
                    <div class="check-up__inner">
                    <?php 
                        $check_ups = get_check_up_all();
                        forEach($check_ups as $check_up):?>
                        <div data-card-id="<?= $check_up["id"]?>" class="card">
                         <div class="card__content">
                            <div class="card__text-content">
                                <h2 class="card__title"><?= $check_up["title"]?></h2>
                                <p class="card__gender"><?= $check_up["gender"]?></p>
                                <ul class="card__tests">
                                    <?php 
                                    $tests = get_check_up_tests($check_up["id"]);

                                    
                                    forEach($tests as $test):?>
                                        <li class="card__test"><?= $test[0]?></li>
                                    <?php endforeach; ?>
                                </ul>
                                <div class="card__price">
                                    <p class="card__total-price"><?= $check_up["curr_price"].'₽'?></p>
                                    <p class="card__ex-price"><?= $check_up["ex_price"].'₽'?></p>
                                </div>
                            </div>

                            <div class="card__btns">
                                <button data-popup="appointment" class="button button__card">Записаться</button>
                                <button data-card-id="<?= $check_up["id"]?>" data-popup="more" class="button button__card button__card_grey">Подробнее</button>
                            </div>
                        </div>
                    </div>
                        
                    <?php endforeach; ?>
                    </div>
                </div>
                <div class="check-up__controls controls">
                    <img src="./images/icons/left-arr.svg" alt="Стрелочка влево" class="controls__arr controls__arr_left">
                    <div class="controls__counter">
                        <span class="controls__count controls__count_current" id="current">1</span>
                    /
                        <span class="controls__count controls__count_total" id="total">4</span>
                    </div>
                    <img src="./images/icons/right-arr.svg" alt="Стрелочка вправо" class="controls__arr controls__arr_right">
                </div>
            </section>
            
            <section class="popup">
                <div class="popup__window" id="appointment">
                    <img src="./images/icons/close-icon.svg" alt="Закрыть" class="popup__close">
                    <h3 class="popup__title">Обратная связь</h3>
                    <form class="form" id="appointment-form">
                        <label class="form__label" for="name">Ваше Имя:</label>
                        <input placeholder="Введите ваше имя" name="username" type="text" id="name" maxlength="25" class="_req form__input form__input_type_name">
                        <label class="form__label" for="surname">Ваша почта:</label>
                        <input placeholder="example@gmail.com" name="useremail" type="text" id="email" class="_req form__input form__input_type_email">
                        <label class="form__label" for="number">Номер телефона:</label>
                        <input placeholder="Введите ваш номер телефона" name="usernumber" minlength="11" type="tel" id="number" class="_req form__input form__input_type_number">
                        <button type="submit" class="button form__button">Записаться на прием</button>
                    </form>
                </div>
                <div class="popup__window" id="more">
                    <img src="./images/icons/close-icon.svg" alt="Закрыть" class="popup__close">
                    <?php 
                        $check_ups = get_check_up_all();
                        forEach($check_ups as $check_up):?>
                    <div data-curr-card-id="<?= $check_up["id"]?>" class="popup__text-content">
                        <h3 class="popup__title"><?= $check_up["title"]?></h3>
                        <div class="popup__text"><?= $check_up["descript"]?></div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>
        </main>

        <footer class="footer">
            <div class="container">
                <div class="footer__wrapper">
                    <a href="#"><img src="./images/icons/logo_white.svg" alt="Logo" class="logo"></a>
                    <nav class="menu footer__menu">
                        <ul class="menu__list">
                            <li class="menu__item"><a href="#" class="menu__link link">О клинике</a></li>
                            <li class="menu__item"><a href="#" class="menu__link link">Услуги</a></li>
                            <li class="menu__item"><a href="#" class="menu__link link">Специалисты</a></li>
                            <li class="menu__item"><a href="#" class="menu__link link">Цены</a></li>
                            <li class="menu__item"><a href="#" class="menu__link link">Контакты</a></li>
                        </ul>
                    </nav>
                    <div class="social">
                        <a href="#" class="social__link"><img src="./images/icons/social/instagram.svg" alt="Instagram" class="social__icon"></a>
                        <a href="#" class="social__link"><img src="./images/icons/social/whatsapp.svg" alt="WhatsApp" class="social__icon"></a>
                        <a href="#" class="social__link"><img src="./images/icons/social/telegram.svg" alt="Telegram" class="social__icon"></a></div>
                </div>
            </div>
        </footer>
    <script src="./vendors/libs/js-inputmask.min.js"></script>
    <script src="./scripts/script.js"></script>
</body>
</html>
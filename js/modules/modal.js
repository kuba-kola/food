function openModal(modalSelector, modalTimeID) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('modal-show');
    //        modal.classList.remove('show'); <- не надоб тк класс modal по умолчанию содержит display: none;
    // при открытии модального окна создаётся стиль, который не позволяет прокручивать страницу:
    document.body.style.overflow = 'hidden';
    //если пользователь открыл ручками окно, то не надо открывать его ещё раз через указанное ниже время
    if (modalTimeID) {
        clearInterval(modalTimeID);
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.remove('modal-show');
    document.body.style.overflow = 'scroll'; 
    
}

function modal(triggerSelector, modalSelector, modalTimeID) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    // навешиваем дата-модал на все кнопки и создаем обработчик события
    modalTrigger.forEach(btn => {
    // кликая в эту кнопку у нас должно просто показаться модальное окно
        btn.addEventListener('click', () => openModal(modalSelector, modalTimeID));
    });
    
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == "") {
            //если ивент.таргет(то куда кликнул юзер), будет строго совпадать с модальным окном, 
            //то в таком случае закрываем окно
            closeModal(modalSelector);
        }


    });
    //создаем закрытие модального окна при нажатии эскейп
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
        //e.code-код каждой кнопки на клавиатуре
            closeModal(modalSelector);
        }
    });
    //отслеживаем, что пользователь скролит страницу и запускаем колбэк функцию

    function showModalByScroll() {

        //нам надо отследить что пользователь долистал до конца страницы
        //потому вычисляем конец страницы по формуле:
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimeID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }    
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};
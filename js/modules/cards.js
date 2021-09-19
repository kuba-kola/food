import {getRes} from '../services/services';

function cards () {
    // используем классы для карточек

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            // в this.classes мы получаем массив, который надо обработать
            this.parent = document.querySelector(parentSelector); 
            this.transfer = 3;
            this.changeToBYN();
        }
        // переводим цены из долларов в бины
        changeToBYN () {
            this.price = this.price * this.transfer;

        }
        // Метод render: нам надо создать элемент, в него поместить верстку, 
        // дополнить её новыми данными и поместить на страницу
        render () {
            const element = document.createElement('div');
            // проверяем, чтобы длинна массива не была равна нулю
            if (this.classes.length === 0) {
                this.element = menu__item;
                element.classList.add(this.element);
            } else {
                // из масссива нам надо вытащить название класса и подсоединить к div
                this.classes.forEach(className => element.classList.add(className));
            }
            
            // innerHTML позволяет нам динамически создать структуру
            element.innerHTML = `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> BYN/день</div>
                        
                    </div>
            `;
    // теперь необходимо поместить элемент на страницу
            this.parent.append(element);
        }
    }

    getRes('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });
    
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
    //         });

}

export default cards;
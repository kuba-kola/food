import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimeID) {
 
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дзякуй! Наш мэнаджар хутка з вамі звяжацца!',
        failure: 'Штосьці пайшло не так! Паспрабуйце пазней!'

    };
    //берем все формы и под каждую из них подставляем postData
    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            //отменяем стандартное поведение браузера
            e.preventDefault();

            //СОздаем динамический блок который будет добавляться к форме, для вывода сообщений
            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //отправляем стату месендж на страничку
            form.append(statusMessage);


            // FormData - специальный объект, который позволяет из определённой формы сформировать данные
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
                
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(()=> {
                form.reset();
            });
            //отслеживаем конечную закгрузку нашего запроса
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         statusMessage.remove();
            //         form.reset();
            //     } else {
            //         showThanksModal(message.failure);
            //     }

            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        //в начале нам надо скрыть это модальное окно, потому:
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimeID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }        
}

export default forms;
import {createElements} from "../config.js";

export class Modal {
    constructor() {
        this.modalClose = createElements({elem: "span", classes: ["modal--close"]});
        this.modalContent = createElements({elem: "div", classes: ["modal__content"], content: [this.modalClose]});
        this.modalBody = createElements({elem: "div", classes: ["modal__container"], content: [this.modalContent]});
        this.modal = createElements({elem: "div", classes: ["modal"], content: [this.modalBody]});

    }

    insert(...elements) {
        return this.modalContent.append(...elements);
    }

    create() {
        document.addEventListener("click", (e) => {
            const target = e.target;
            if (target === this.modal || target === this.modalClose) {
                this.close();
            }
            if (this.modal.classList.contains('modal')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';

            }
        })

        document.body.append(this.modal);
        return this.modal;
    }

    title(titleText = '', titleClass = '') {
        let title = createElements({elem: "h5", classes: ["modal__title", titleClass]});
        title.textContent = titleText;
        this.modalContent.prepend(title);
    }

    close() {
        if (this.modal.classList.contains('modal')) {
            this.modal.classList.remove('modal');
            this.modal.remove();
        }
    }

    remove() {
        this.modal.remove();
    }
}

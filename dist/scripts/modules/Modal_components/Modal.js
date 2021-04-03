import Component from "../config.js";

class Modal extends Component {
    constructor() {
        super();
        this.modalClose = this.createElement({elem: "span", classes: ["modal--close"]});
        this.modalContent = this.createElement({elem: "div", classes: ["modal__content"], content: [this.modalClose]});
        this.modalBody = this.createElement({elem: "div", classes: ["modal__container"], content: [this.modalContent]});
        this.modal = this.createElement({elem: "div", classes: ["modal"], content: [this.modalBody]});
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
        let title = this.createElement({elem: "h5", classes: ["modal__title", titleClass], text: titleText});
        this.modalContent.prepend(title);
    }

    close() {
        if (this.modal.classList.contains('modal')) {
            this.modal.classList.remove('modal');
            this.modal.remove();
        }
    }
}

export const modal = new Modal();
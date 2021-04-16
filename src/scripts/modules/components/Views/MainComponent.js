import Component from '../../config.js';

class ViewMainContent extends Component {
    constructor() {
        super();
    }

    render() {
        const content = this.contentWelcome();
        this.createRootElements(content);
    }

    createRootElements(...elem) {
        const content = this.createElement({elem: 'div', classes: ['cards-visit__content'], content: [...elem]});
        const wrapper = this.createElement({elem: 'div', classes: ['wrapper'], content: [content]});
        const section = this.createElement({elem: 'section', classes: ['cards-visit', 'cards__visit'], content: [wrapper]});
        const main = this.createElement({elem: 'main', content: [section]});
        document.body.append(main);
    }

    changeContent() {
        const main = document.querySelector('main');
        main.remove();

        let content;
        const isCreateVisitButton = document.querySelector('#isCreateVisitButton');

        if (!isCreateVisitButton.classList.contains('hide')) {
            content = this.contentVisit();
        } else {
            content = this.contentWelcome();
        }

        this.createRootElements(content);
        return content;
    }


    contentVisit() {
        return this.createElement({elem: 'p', classes: ['cards-visit__default-text'], text: ['No items have been added']});
    }

    contentWelcome() {
        const contentImg = this.createElement({elem: 'img', classes: ['cards-visit__img']});
        const contentSpan = this.createElement({elem: 'span', classes: ['cards-visit__text'], text: ['Welcome to our medical cards app']});
        const content = this.createElement({
            elem: 'div',
            classes: ['cards-visit__content-welcome'],
            content: [contentSpan, contentImg]
        });
        contentImg.src = './dist/images/main.jpg';
        contentImg.alt = 'Welcome to our medical cards app';

        return content;
    }
}

export const mainContent = new ViewMainContent();
import {createElements} from '../config.js';
import {headerContent} from './headerComponent.js';

class ViewMainContent {
    constructor() {
    }

    render() {
        const content = this.contentWelcome();
        this.createRootElements(content);
    }

    createRootElements(elem) {
        const wrapper = createElements({elem: 'div', classes: ['wrapper'], content: [elem]});
        const section = createElements({elem: 'section', classes: ['cards-visit', 'cards__visit'], content: [wrapper]});
        const main = createElements({elem: 'main', content: [section]});
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
        const paragraph = createElements({elem: 'p', classes: ['cards-visit__default-text'], content: ['No items have been added']});
        const content = createElements({elem: 'div', classes: ['cards-visit__content', 'cards-visit__content--card-list'], content: [paragraph]});

        return content;
    }

    contentWelcome() {
        const contentImg = createElements({elem: 'img', classes: ['cards-visit__img']});
        const contentSpan = createElements({elem: 'span', classes: ['cards-visit__welcome-text'], content: ['Welcome to our medical cards app']});
        const content = createElements({
            elem: 'div',
            classes: ['cards-visit__content', 'cards-visit__content--welcome'],
            content: [contentSpan, contentImg]
        });
        contentImg.src = '../dist/images/main.jpg';
        contentImg.alt = 'Welcome to our medical cards app';

        return content;
    }
}


export const mainContent = new ViewMainContent();
mainContent.render();

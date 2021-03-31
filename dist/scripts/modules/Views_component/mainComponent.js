import {createElements} from '../config.js';
import {headerContent} from './headerComponent.js';

class ViewMainContent {
    constructor() {
        this.content = this.changeContent();
        this.wrapper = createElements({elem: 'div', classes: ['wrapper'], content: [this.content]});
        this.section = createElements({elem: 'section', classes: ['cards-visit', 'cards__visit'], content: [this.wrapper]});
        this.main = createElements({elem: 'main', content: [this.section]});
        document.body.append(this.main);
    }

    render() {
        return this.main;
    }

    changeContent() {
        let content;
        const isCreateVisitButton = document.getElementById('isCreateVisitButton');
        console.log(isCreateVisitButton)

        if (!isCreateVisitButton.classList.contains('hide')) {
            console.log(isCreateVisitButton)

            content = this.contentVisit();
            console.log('visit',content)
        } else {
            content = this.contentWelcome();
            console.log('welcome',content)
        }

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
// console.log(mainContent.contentVisit())
mainContent.render();

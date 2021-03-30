import {createElements} from '../config.js';
import {headerContent} from "./headerComponent.js";

class ViewMainContent {
    constructor({onChange: handleChange}) {
        this.handleChange = handleChange;
        this.wrapper = createElements({elem: 'div', classes: ['wrapper'], content: [this.changeContent()]});
        this.section = createElements({elem: 'section', classes: ['cards-visit', 'cards__visit'], content: [this.wrapper]});
        this.main = createElements({elem: 'main', content: [this.section]});
        document.body.append(this.main);
    }

    render() {
        return this.main;
    }

    changeContent() {
        const content = this.contentWelcome();
        if (this.handleChange) {
            this.contentVisit();
        } else {
            this.contentWelcome();
        }

        return content;
    }


    contentVisit() {
        const paragraph = createElements({elem: 'p', classes: ['cards-visit__default-text'], content: ['No items have been added']});
        const visitWrapper = createElements({elem: 'div', classes: ['cards-visit__content', 'cards-visit__content--card-list'], content: [paragraph]});

        return visitWrapper;
    }

    contentWelcome() {
        const contentImg = createElements({elem: 'img', classes: ['cards-visit__img']});
        const contentSpan = createElements({elem: 'span', classes: ['cards-visit__welcome-text'], content: ['Welcome to our medical cards app']});
        const welcomeWrapper = createElements({
            elem: 'div',
            classes: ['cards-visit__content', 'cards-visit__content--welcome'],
            content: [contentSpan, contentImg]
        });
        contentImg.src = '../dist/images/main.jpg';
        contentImg.alt = 'Welcome to our medical cards app';

        return welcomeWrapper;
    }
}

export const mainContent = new ViewMainContent(headerContent.toggleActive.bind(headerContent.event));
mainContent.render()

const LOGIN_EMAIL = 'medical.cards2021@gmail.com';
const LOGIN_PASS = 'cards2021';
const CARDS_URL = 'https://ajax.test-danit.com/api/cards';
const LOGIN_URL = 'https://ajax.test-danit.com/api/cards/login';

export const config = {
    LOGIN_EMAIL,
    LOGIN_PASS,
    CARDS_URL,
    LOGIN_URL,
}

class Component {
    constructor() {
    }

    createElement({elem, id, classes, text, content}) {
        const element = document.createElement(elem)
        if (id) element.id = id;
        if (classes) element.classList.add(...classes);
        if (text) element.textContent = text;
        if (content) element.append(...content);

        return element
    }
}

export default Component;
const LOGIN_EMAIL = 'medical.cards2021@gmail.com';
const LOGIN_PASS = 'cards2021';
const CARDS_URL = 'https://ajax.test-danit.com/api/cards';
const LOGIN_URL = 'https://ajax.test-danit.com/api/cards/login';
const contentCardList = document.querySelector(".cards-visit__content--card-list")
const defaultText = document.querySelector(".cards-visit__default-text")


export const config = {
    LOGIN_EMAIL,
    LOGIN_PASS,
    CARDS_URL,
    LOGIN_URL,
    contentCardList,
    defaultText,
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
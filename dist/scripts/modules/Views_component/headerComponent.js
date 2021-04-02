import {createElements} from '../config.js';
import {mainContent} from "./mainComponent.js";

class ViewHeader {
    constructor() {
        this.visitBtn = createElements({elem: "a", id: "isCreateVisitButton", classes: ["header__btn", "btn", "hide"]});
        this.visitBtn.href = "#void";
        this.visitBtn.textContent = "Create visit";
        this.loginBtn = createElements({elem: "a", id: "isLoginButton", classes: ["header__btn", "btn"]});
        this.loginBtn.href = "#void";
        this.loginBtn.textContent = "Sign in";
        this.logoSpanBolder = createElements({elem: "span", classes: ["logo__title--bolder"], content: ["Health"]});
        this.logoSpan = createElements({elem: "span", classes: ["logo__title"], content: [this.logoSpanBolder, "Care"]});
        this.logoImg = createElements({elem: "img", classes: ["logo__img"]});
        this.logoImg.src = "../dist/images/logo.svg";
        this.logoImg.alt = "Logo";
        this.logoWrapper = createElements({elem: "a", classes: ["logo"], content: [this.logoImg, this.logoSpan]});
        this.logoWrapper.href = "#void";
        this.content = createElements({elem: "div", classes: ["cards-header__content"], content: [this.logoWrapper, this.loginBtn, this.visitBtn]});
        this.wrapper = createElements({elem: "div", classes: ["wrapper"], content: [this.content]});
        this.header = createElements({elem: "header", classes: ["cards-header", "cards__header"], content: [this.wrapper]});
        document.body.prepend(this.header);
    }

    render() {
        this.event();
        return this.header;
    }

    event() {
        this.loginBtn.addEventListener("click", () => {
            this.toggleActive();
        });
    }

    toggleActive() {
        if (this.visitBtn.classList.contains("hide")) {
            this.visitBtn.classList.remove("hide");
            this.loginBtn.classList.add("hide");
            // const mainContent = new ViewMainContent();
            mainContent.changeContent();
        }
    }
}

export const headerContent = new ViewHeader();
headerContent.render();


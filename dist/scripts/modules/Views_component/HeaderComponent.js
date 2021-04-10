import Component from "../config.js";
import {mainContent} from "./MainComponent.js";

class ViewHeader extends Component {
    constructor() {
        super();
        this.visitBtn = this.createElement({elem: "a", id: "isCreateVisitButton", classes: ["header__btn", "btn", "hide"], text: "Create visit"});
        this.visitBtn.href = "#void";
        this.loginBtn = this.createElement({elem: "a", id: "isLoginButton", classes: ["header__btn", "btn"], text: "Sign in"});
        this.loginBtn.href = "#void";
        this.logoSpanBolder = this.createElement({elem: "span", classes: ["logo__title--bolder"], content: ["Health"]});
        this.logoSpan = this.createElement({elem: "span", classes: ["logo__title"], content: [this.logoSpanBolder, "Care"]});
        this.logoImg = this.createElement({elem: "img", classes: ["logo__img"]});
        this.logoImg.src = "./dist/images/logo.svg";
        this.logoImg.alt = "Logo";
        this.logoWrapper = this.createElement({elem: "a", classes: ["logo"], content: [this.logoImg, this.logoSpan]});
        this.logoWrapper.href = "#void";
        this.content = this.createElement({elem: "div", classes: ["cards-header__content"], content: [this.logoWrapper, this.loginBtn, this.visitBtn]});
        this.wrapper = this.createElement({elem: "div", classes: ["wrapper"], content: [this.content]});
        this.header = this.createElement({elem: "header", classes: ["cards-header", "cards__header"], content: [this.wrapper]});
        document.body.prepend(this.header);
    }

    render() {
        return this.header;
    }

    toggleActive() {
        if (this.visitBtn.classList.contains("hide")) {
            this.visitBtn.classList.remove("hide");
            this.loginBtn.classList.add("hide");
            mainContent.changeContent();
        }
    }
}

export const headerContent = new ViewHeader();


"use strict";

// import Component from "./modules/config.js";
import {Modal} from "./modules/Modal_components/Modal.js";
import {Form} from "./modules/Form_components/Form.js";
import {Input} from "./modules/Form_components/Input.js";
import {headerContent} from "./modules/Views_component/headerComponent.js";
import {mainContent} from "./modules/Views_component/mainComponent.js";
import {createVisit} from "./modules/Views_component/CardsInteraction.js";
import {readCardsData, loginRequest} from "./modules/requests.js";
import {config} from "./modules/config.js";


document.addEventListener("DOMContentLoaded", () => {
    headerContent.render();
    mainContent.render();
    const isAuthorized = localStorage.getItem('token');
    if (isAuthorized) {
        headerContent.toggleActive();
        readCardsData();
    } else {
        headerContent.loginBtn.addEventListener("click", () => loginForm());
    }

    headerContent.visitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        createVisit.createVisitModal(e);
    })
});


function loginForm() {

    const loginModal = new Modal();
    const loginForm = new Form();
    const loginFormEmailInput = new Input();
    const loginFormPasswordInput = new Input();
    const loginFormSubmitBtn = new Input();

    loginFormEmailInput.attr('email', 'loginEmail', '', 'Введите email', 'required');
    loginFormPasswordInput.attr('password', 'loginPassword', '', 'Введите пароль', 'required');
    loginFormSubmitBtn.attr('submit', 'loginSubmit', 'Войти', '')

    loginModal.create();
    loginModal.insert(loginForm.create());
    loginForm.insert(loginFormEmailInput.create(), loginFormPasswordInput.create(), loginFormSubmitBtn.create());

    loginModal.title('АВТОРИЗАЦИЯ', 'login-title');
    loginFormEmailInput.label('EMAIL', 'email-label');
    loginFormPasswordInput.label('ПАРОЛЬ', 'password-label');

    loginFormSubmitBtn.event('click', (e) => {
        e.preventDefault();
        let data = validateUserRegistrationData(loginFormEmailInput, loginFormPasswordInput);
        if (data) {
            loginRequest(data, loginModal);
        }
    })

}

function validateUserRegistrationData(emailInput, passwordInput) {

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    if (!email && email !== config.LOGIN_EMAIL) {
        emailInput.error();
    } else if (!password && password !== config.LOGIN_PASS) {
        passwordInput.error();
    } else {
        return {email: email, password: password};
    }

}
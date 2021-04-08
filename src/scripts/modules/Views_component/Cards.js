import Component from "../config.js";
import {deleteCardsData, readCardById, updateCardData} from "../requests.js";
import {dictionary} from "../dictionary.js";
import {createVisit} from "./CardsInteraction.js";
import {VisitTherapist} from "../Visit_components/VisitTherapist.js";
import {VisitCardiologist} from "../Visit_components/VisitCardiologist.js";
import {VisitDentist} from "../Visit_components/VisitDentist.js";

class Cards extends Component {
    constructor() {
        super();
    }

    createCards(data, id) {
        const cardDeleteBtn = this.createElement({elem: "a", classes: ["card__btn--delete"], content: "X"});
        const showMoreLessButton = this.createElement({elem: "a", classes: ["card__btn--show-more"], text: "Show more"});
        const editCardButton = this.createElement({elem: "a", classes: ["card__btn--edit", "hide"], text: "Edit"});
        const cardList = this.createElement({elem: "ul", classes: ["card__list", "card__list--before"], text: [`Patient Card №${id}`]});
        const btnWrap = this.createElement({elem: "div", classes: ["card__btn--wrap"], content: [showMoreLessButton, cardDeleteBtn]});
        const card = this.createElement({elem: "div", id: id, classes: ["card", "card__content"], content: [btnWrap, cardList, editCardButton]});

        showMoreLessButton.setAttribute("href", "#void");
        editCardButton.setAttribute("href", "#void");
        cardDeleteBtn.setAttribute("href", "#void");

        for (const [key, value] of Object.entries(data)) {
            const cardItem = this.createElement({elem: "li", id: id, classes: ["card__item"], content: `${value}`});
            if (key !== dictionary.doctorGetValue) {
                cardItem.classList.add("hide");
                this.showMoreLessForItems(showMoreLessButton, cardItem);
            }
            cardItem.textContent = `${key}: ${data[key]}`;
            cardList.append(cardItem);
        }

        const contentCard = document.querySelector(".cards-visit__content");
        const defaultText = document.querySelector(".cards-visit__default-text");

        if (defaultText) defaultText.classList.add("hide");
        contentCard.append(card);


        this.showMoreLessForCard(showMoreLessButton, card, cardList, editCardButton);

        cardDeleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.removeCard(id);
        })

        editCardButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.editCard(id);
        })
    }

    removeCard(id) {
        const contentCard = document.querySelector(".cards-visit__content");
        const defaultText = document.querySelector(".cards-visit__default-text");

        document.getElementById(id).remove();
        if (contentCard.children.length === 1) {
            defaultText.classList.remove("hide");
        }
        deleteCardsData(id);
    }

    async editCard(id) {
        const data = await readCardById(id);

        if (data[dictionary.doctorGetValue] === dictionary.therapistValue) {
            const editTherapistCard = new VisitTherapist();
            editTherapistCard.create();
            const {
                [dictionary.fullNameGetValue]: fullName,
                [dictionary.reasonGetValue]: reason,
                [dictionary.descGetValue]: desc,
                [dictionary.urgencyGetValue]: urgency,
                [dictionary.ageGetValue]: age,
                [dictionary.statusGetValue]: status
            } = data

            editTherapistCard.setValues(fullName, reason, desc, urgency, age, status);
            editTherapistCard.event("click", (e) => {
                e.preventDefault();
                if (createVisit.validateFormInputs(editTherapistCard)) {
                    return;
                }
                editTherapistCard.close();
                updateCardData(editTherapistCard.value, id);
            })
        } else if (data[dictionary.doctorGetValue] === dictionary.dentistValue) {
            const editDentistCard = new VisitDentist();
            editDentistCard.create();
            const {
                [dictionary.fullNameGetValue]: fullName,
                [dictionary.reasonGetValue]: reason,
                [dictionary.descGetValue]: desc,
                [dictionary.urgencyGetValue]: urgency,
                [dictionary.statusGetValue]: status,
                [dictionary.dateOfLastVisitLabel]: date
            } = data
            editDentistCard.setValues(fullName, reason, desc, urgency, status, date);
            editDentistCard.event("click", (e) => {
                e.preventDefault();
                if (createVisit.validateFormInputs(editDentistCard)) {
                    return;
                }
                editDentistCard.close();
                updateCardData(editDentistCard.value, id);
            })
        } else if (data[dictionary.doctorGetValue] === dictionary.cardiologistValue) {
            const editCardiologistCard = new VisitCardiologist();
            editCardiologistCard.create();
            const {
                [dictionary.fullNameGetValue]: fullName,
                [dictionary.reasonGetValue]: reason,
                [dictionary.descGetValue]: desc,
                [dictionary.urgencyGetValue]: urgency,
                [dictionary.pressureGetValue]: pressure,
                [dictionary.weightIndexGetValue]: weightIndex,
                [dictionary.heartIllnessGetValue]: heartIllness,
                [dictionary.ageGetValue]: age,
                [dictionary.statusGetValue]: status
            } = data;
            editCardiologistCard.setValues(fullName, reason, desc, urgency, pressure, weightIndex, heartIllness, age, status);
            editCardiologistCard.event("click", (e) => {
                e.preventDefault();
                if (createVisit.validateFormInputs(editCardiologistCard)) {
                    return;
                }
                updateCardData(editCardiologistCard.value, id);
                editCardiologistCard.close();
            })
        }
    }

    showMoreLessForCard(e, card, cardList, editCardButton) {
        e.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.classList.toggle("less");
            if (e.target.classList.contains("less")) {
                e.target.textContent = "Hide";
            } else {
                e.target.textContent = "Show more";
            }
            card.classList.toggle("card--before");
            cardList.classList.toggle("card__list--before");
            editCardButton.classList.toggle("hide");
        })
    }

    showMoreLessForItems(e, cardItem) {
        e.addEventListener("click", (e) => {
            e.preventDefault();
            cardItem.classList.toggle("show");
        })
    }
}

export const cards = new Cards();
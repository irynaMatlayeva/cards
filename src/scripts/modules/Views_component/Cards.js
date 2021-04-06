import {config} from "../config.js"
import Component from "../config.js";
import {deleteCardsData, readCardById, updateCardData} from "../requests.js"
import {dictionary} from "../dictionary.js"
import {createVisit} from "./CardsInteraction.js"
import {VisitTherapist} from "../Visit_components/VisitTherapist.js";
import {VisitCardiologist} from "../Visit_components/VisitCardiologist.js"
import {VisitDentist} from "../Visit_components/VisitDentist.js"

class Cards extends Component {
    constructor() {
        super();
    }

    createCards(data, id) {
        const cardDeleteBtn = this.createElement({elem: "a", classes: ['card-delete'], content: "X"});
        const showMoreLessButton = this.createElement({elem: "a", text: 'Show more'});
        const editCardButton = this.createElement({elem: "a", classes: ["edit-card", "hide"], text: 'Edit'});
        const cardList = this.createElement({elem: "ul", content: [`Patient Card №${id}`]});
        const btnWrap = this.createElement({elem: "div", classes: ['btn-wrap'], content: [showMoreLessButton, cardDeleteBtn]})
        const card = this.createElement({elem: "div", id: id, classes: ["card", "card--before"], content: [btnWrap, cardList, editCardButton]});

        showMoreLessButton.setAttribute("href", "#void");
        editCardButton.setAttribute("href", "#void");
        cardDeleteBtn.setAttribute("href", "#void");

        for (const [key, value] of Object.entries(data)) {
            const cardItem = this.createElement({elem: "li", id: id, classes: ["card-item"], content: `${value}`});
            cardList.classList.add("card-list", "card__list--before");
            if (key !== dictionary.doctorGetValue) {
                cardItem.classList.add("hide");
                this.showMoreLessForItems(showMoreLessButton, cardItem);
            }
            cardItem.textContent = `${key}: ${data[key]}`;
            cardList.append(cardItem);
        }

        if (config.defaultText) config.defaultText.classList.add("hide");
        config.contentCardList.append(card);

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
        document.getElementById(id).remove();
        if (config.contentCardList.children.length === 1) {
            config.defaultText.classList.remove("hide");
        }
        deleteCardsData(id);
    }

    async editCard(id) {
        const data = await readCardById(id);

        if (data[dictionary.doctorGetValue] === dictionary.therapistValue) {
            const editTherapistCard = new VisitTherapist();
            editTherapistCard.create();
            const {
                [dictionary.reasonGetValue]: reason,
                [dictionary.descGetValue]: desc,
                [dictionary.urgencyGetValue]: urgency,
                [dictionary.fullNameGetValue]: fullName,
                [dictionary.ageGetValue]: age,
                [dictionary.statusGetValue]: status
            } = data

            editTherapistCard.setValues(reason, desc, urgency, fullName, age, status);
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
                [dictionary.reasonGetValue]: reason,
                [dictionary.descGetValue]: desc,
                [dictionary.urgencyGetValue]: urgency,
                [dictionary.fullNameGetValue]: fullName,
                [dictionary.statusGetValue]: status,
                [dictionary.dateOfLastVisitLabel]: date
            } = data
            editDentistCard.setValues(reason, desc, urgency, fullName, status, date);
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
                [dictionary.reasonGetValue]: reason,
                [dictionary.descGetValue]: desc,
                [dictionary.urgencyGetValue]: urgency,
                [dictionary.fullNameGetValue]: fullName,
                [dictionary.pressureGetValue]: pressure,
                [dictionary.weightIndexGetValue]: weightIndex,
                [dictionary.heartIllnessGetValue]: heartIllness,
                [dictionary.ageGetValue]: age,
                [dictionary.statusGetValue]: status
            } = data;
            editCardiologistCard.setValues(reason, desc, urgency, fullName, pressure, weightIndex, heartIllness, age, status);
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
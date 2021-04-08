import {Modal} from "../Modal_components/Modal.js";
import {Form} from "../Form_components/Form.js";
import {Select} from "../Form_components/Select.js";
import {Input} from "../Form_components/Input.js";
import {createCardData} from "../requests.js";
import {VisitTherapist} from "../Visit_components/VisitTherapist.js";
import {VisitDentist} from "../Visit_components/VisitDentist.js";
import {VisitCardiologist} from "../Visit_components/VisitCardiologist.js";
import {dictionary} from "../dictionary.js";

class CreateVisit {
    constructor() {
    }

    createVisitModal(e) {
        e.preventDefault();
        const createModal = new Modal();
        const createForm = new Form();
        const createSelect = new Select();
        const createSubmit = new Input();

        createSelect.option('Therapist', dictionary.therapistValue);
        createSelect.option('Dentist', dictionary.dentistValue);
        createSelect.option('Cardiologist', dictionary.cardiologistValue);
        createSelect.attr('createVisitSelect');
        createSubmit.attr('submit', 'createVisitSubmit', 'Confirm selection', '');

        createModal.create();
        createModal.insert(createForm.create());
        createForm.insert(createSelect.create(), createSubmit.create());
        createModal.title('Choose a doctor', '');

        createSubmit.event('click', (e) => {
            e.preventDefault();
            createModal.close();
            this.changeDoctorCard(createSelect.value);
        })
    }

    changeDoctorCard(value) {
        if (value === dictionary.therapistValue) {
            const therapistCard = new VisitTherapist();
            therapistCard.create();
            therapistCard.submit.event('click', (e) => {
                e.preventDefault();
                if (this.validateFormInputs(therapistCard)) {
                    return;
                }
                createCardData(therapistCard.value);
                therapistCard.close();
            })
        } else if (value === dictionary.dentistValue) {
            const dentistCard = new VisitDentist();
            dentistCard.create();
            dentistCard.submit.event('click', (e) => {
                e.preventDefault();
                if (this.validateFormInputs(dentistCard)) {
                    return;
                }
                createCardData(dentistCard.value);
                dentistCard.close();
            })
        } else if (value === dictionary.cardiologistValue) {
            const cardiologistCard = new VisitCardiologist();
            cardiologistCard.create();
            cardiologistCard.submit.event('click', (e) => {
                e.preventDefault();
                if (this.validateFormInputs(cardiologistCard)) {
                    return;
                }
                createCardData(cardiologistCard.value);
                cardiologistCard.close();
            })
        }
    }

    validateFormInputs(object) {
        for (const property in object) {
            if (property === dictionary.reason || property === dictionary.fullName || property === dictionary.age ||
                property === dictionary.pressure || property === dictionary.weightIndex || property === dictionary.heartIllness) {
                if (!object[property].value.trim()) {
                    object[property].error();
                    return true;
                }
            }
        }
        return false;
    }
}

export const createVisit = new CreateVisit();
import {Modal} from "../Modal_components/Modal.js";
import {Form} from "../Form_components/Form.js";
import {Input} from "../Form_components/Input.js";
import {Select} from "../Form_components/Select.js";
import {TextArea} from "../Form_components/TextArea.js";
import {dictionary} from "../dictionary.js";

export class Visit {
    constructor() {
        this.modal = new Modal();
        this.form = new Form();
        this.fullName = new Input();
        this.reason = new Input();
        this.deteOfLastVisit = new Input();
        this.desc = new TextArea();
        this.urgency = new Select();
        this.status = new Select();
        this.submit = new Input();

        this.modal.title("Fill out the Patient record");
        this.fullName.attr("text", "fullNameField", "", "John Smith", "required");
        this.reason.attr("text", "motiveField", "", "Describe the reason for the visit", "required");
        this.deteOfLastVisit.attr("date", "deteOfLastVisit", "", "Date of last visit", "required");
        this.desc.attr("deskField", "", "Describe the purpose of the visit", "required");
        this.urgency.option(dictionary.priorityAll, dictionary.priorityAll);
        this.urgency.option(dictionary.priorityLow, dictionary.priorityLow);
        this.urgency.option(dictionary.priorityNormal, dictionary.priorityNormal);
        this.urgency.option(dictionary.priorityHigh, dictionary.priorityHigh);
        this.status.option(dictionary.statusAll, dictionary.statusAll);
        this.status.option(dictionary.statusOpen, dictionary.statusOpen);
        this.status.option(dictionary.statusDone, dictionary.statusDone);
        this.submit.attr("submit", "isSubmit", "Create card");
    }
}

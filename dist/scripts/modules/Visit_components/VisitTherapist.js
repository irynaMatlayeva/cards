import {Input} from "../Form_components/Input.js";
import {dictionary} from "../dictionary.js";
import {Visit} from "./Visits.js";

export class VisitTherapist extends Visit {
    constructor() {
        super();
    }

    create() {
        this.age = new Input();
        this.age.attr("number", dictionary.age, "", dictionary.agePlaceholder, "required");
        this.modal.create();
        this.modal.insert(this.form.create());
        this.form.insert(
            this.fullName.create(),
            this.reason.create(),
            this.desc.create(),
            this.urgency.create(),
            this.status.create(),
            this.age.create(),
            this.submit.create()
        );
        this.fullName.label(dictionary.fullNameLabel);
        this.reason.label(dictionary.reasonText);
        this.desc.label(dictionary.shortDescLabel);
        this.urgency.label(dictionary.urgencyLabel);
        this.status.label(dictionary.statusLabel);
        this.age.label(dictionary.ageLabel);

        return this.modal;
    }

    event(event = "", fn) {
        this.submit.event(event, fn);
    }

    close() {
        this.modal.close();
    }

    setValues(fullName = null, reason = null, desc = null, urgency = null, age = null, status = null, submit = "Save changes") {
        this.fullName.value = fullName;
        this.reason.value = reason;
        this.desc.value = desc;
        this.urgency.value = urgency;
        this.age.value = age;
        this.status.value = status;
        this.submit.value = submit;
    }

    get value() {
        return {
            [dictionary.doctorGetValue]: dictionary.therapistValue,
            [dictionary.fullNameGetValue]: this.fullName.value,
            [dictionary.reasonGetValue]: this.reason.value,
            [dictionary.descGetValue]: this.desc.value,
            [dictionary.urgencyGetValue]: this.urgency.value,
            [dictionary.ageGetValue]: this.age.value,
            [dictionary.statusGetValue]: this.status.value,
        };
    }
}

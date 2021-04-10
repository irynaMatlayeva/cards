import {dictionary} from "../dictionary.js";
import {Visit} from "./Visits.js";

export class VisitDentist extends Visit {
    constructor() {
        super();
    }

    create() {
        this.modal.create();
        this.modal.insert(this.form.create());
        this.form.insert(
            this.fullName.create(),
            this.reason.create(),
            this.desc.create(),
            this.urgency.create(),
            this.status.create(),
            this.deteOfLastVisit.create(),
            this.submit.create()
        );
        this.fullName.label(dictionary.fullNameLabel);
        this.reason.label(dictionary.reasonText);
        this.desc.label(dictionary.shortDescLabel);
        this.urgency.label(dictionary.urgencyLabel);
        this.deteOfLastVisit.label(dictionary.dateOfLastVisitLabel);
        this.status.label(dictionary.statusLabel);

        return this.modal;
    }

    event(event = "", fn) {
        this.submit.event(event, fn);
    }

    close() {
        this.modal.close();
    }

    setValues(fullName = null, reason = null, desc = null, urgency = null, status = null, deteOfLastVisit = null, submit = "Save changes") {
        this.fullName.value = fullName;
        this.reason.value = reason;
        this.desc.value = desc;
        this.urgency.value = urgency;
        this.status.value = status;
        this.deteOfLastVisit.value = deteOfLastVisit;
        this.submit.value = submit;
    }

    get value() {
        return {
            [dictionary.doctorGetValue]: dictionary.dentistValue,
            [dictionary.fullNameGetValue]: this.fullName.value,
            [dictionary.reasonGetValue]: this.reason.value,
            [dictionary.descGetValue]: this.desc.value,
            [dictionary.urgencyGetValue]: this.urgency.value,
            [dictionary.statusGetValue]: this.status.value,
            [dictionary.dateOfLastVisitLabel]: this.deteOfLastVisit.value,
        };
    }
}

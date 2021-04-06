import { Input } from "../Form_components/Input.js";
import { dictionary } from "../dictionary.js";
import { Visit } from "./Visits.js";

export class VisitTherapist extends Visit {
  constructor() {
    super();
  }
  create() {
    this.age = new Input();
    this.age.attr(
      "number",
      dictionary.age,
      "",
      dictionary.agePlaceholder,
      "required"
    );
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
    this.fullName.label(dictionary.fullNameLabel, dictionary.fullNameLabel);
    this.reason.label(dictionary.reasonText, dictionary.therapistCardLabel);
    this.desc.label(dictionary.shortDescLabel, dictionary.therapistCardLabel);
    this.urgency.label(dictionary.urgencyLabel, dictionary.therapistCardLabel);
    this.status.label(dictionary.statusLabel, dictionary.therapistCardLabel);
    this.age.label(dictionary.ageLabel, dictionary.therapistCardLabel);

    return this.modal;
  }
}

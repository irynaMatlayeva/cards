import { Input } from "../Form_components/Input.js";
import { dictionary } from "../dictionary.js";
import {Visit} from "./Visits.js";

export class VisitCardiologist extends Visit {
  constructor() {
    super();
  }
  create() {
    this.pressure = new Input();
    this.weightIndex = new Input();
    this.heartIllness = new Input();
    this.age = new Input();

    this.pressure.attr(
      "text",
      dictionary.pressure,
      "",
      dictionary.pressurePlaceholder,
      "required"
    );
    this.weightIndex.attr(
      "number",
      dictionary.weightIndex,
      "",
      dictionary.weightIndexPlaceholder,
      "required"
    );
    this.heartIllness.attr(
      "text",
      dictionary.heartIllness,
      "",
      dictionary.heartIllnessPlaceholder,
      "required"
    );
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
      this.pressure.create(),
      this.weightIndex.create(),
      this.heartIllness.create(),
      this.age.create(),
      this.submit.create()
    );
    this.fullName.label(dictionary.fullNameLabel);
    this.reason.label(dictionary.reasonText);
    this.desc.label(dictionary.shortDescLabel);
    this.urgency.label(dictionary.urgencyLabel);
    this.status.label(dictionary.statusLabel);
    this.pressure.label(dictionary.pressureLabel);
    this.weightIndex.label(dictionary.weightIndexLabel);
    this.heartIllness.label(dictionary.heartIllnessLabel);
    this.age.label(dictionary.ageLabel);

    return this.modal;
  }
  event(event = "", fn) {
    this.submit.event(event, fn);
  }
  close() {
    this.modal.close();
  }
  setValue(
    fullName = null,
    reason = null,
    desc = null,
    urgency = null,
    pressure = null,
    weightIndex = null,
    heartIllness = null,
    age = null,
    status = null,
    submit = "Save changes"
  ) {
    this.fullName.value = fullName;
    this.reason.value = reason;
    this.desc.value = desc;
    this.urgency.value = urgency;
    this.pressure.value = pressure;
    this.weightIndex.value = weightIndex;
    this.heartIllness.value = heartIllness;
    this.age.value = age;
    this.status.value = status;
    this.submit.value = submit;
  }
  get value() {
    return {
      [dictionary.doctorGetValue]: dictionary.cardiologistValue,
      [dictionary.fullNameGetValue]: this.fullName.value,
      [dictionary.descGetValue]: this.desc.value,
      [dictionary.urgencyGetValue]: this.urgency.value,
      [dictionary.statusGetValue]: this.status.value,
      [dictionary.pressureGetValue]: this.pressure.value,
      [dictionary.weightIndexGetValue]: this.weightIndex.value,
      [dictionary.heartIllnessGetValue]: this.heartIllness.value,
      [dictionary.ageGetValue]: this.age.value,
    };
  }
}

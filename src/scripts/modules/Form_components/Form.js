import { config, createElements } from "../config.js";

export class Form {
  constructor() {
    this.form = createElements({ elem: "form", classes: ["form"] });
  }

  insert(...elements) {
    return this.form.append(...elements);
  }
  create() {
    return this.form;
  }
}

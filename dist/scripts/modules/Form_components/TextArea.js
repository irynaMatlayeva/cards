import { config, createElements } from "../config.js";

export class TextArea {
  constructor() {
    this.textarea = createElements({ elem: "textarea" });
  }
  create() {
    return this.textarea;
  }
  attr(
    id = "",
    value = null,
    name = null,
    placeholder = null,
    required = null
  ) {
    if (id) this.textarea.setAttribute("id", id);
    if (value) this.textarea.setAttribute("value", value);
    if (name) this.textarea.setAttribute("name", name);
    if (placeholder) this.textarea.setAttribute("placeholder", placeholder);
    if (required) this.textarea.setAttribute("required", required);
  }
  label(text = null, classes = null) {
    const label = createElements({
      elem: "label",
      classes: ["label"],
      content: text,
    });
    label.setAttribute("for", this.textarea.id);
    this.textarea.parentElement.insertBefore(label, this.textarea);
  }
  //   get value() {
  //     return this.textarea.value;
  //   }
  //   set value(value) {
  //     return (this.textarea.value = value);
  //   }
}

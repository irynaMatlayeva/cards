import Component from "../../config.js";

export class TextArea extends Component {
    constructor() {
        super();
        this.textarea = this.createElement({elem: "textarea", classes: ["form__textarea"]});
    }

    create() {
        return this.textarea;
    }

    attr(id = null, value = null, placeholder = null, required = null) {
        if (id) this.textarea.setAttribute("id", id);
        if (value) this.textarea.setAttribute("value", value);
        if (placeholder) this.textarea.setAttribute("placeholder", placeholder);
        if (required) this.textarea.setAttribute("required", required);
    }

    label(text = null, labelClass = null) {
        const label = this.createElement({elem: "label", classes: ["input__label"], text: text});
        if (labelClass) label.classList.add(labelClass);
        label.setAttribute("for", this.textarea.id);
        this.textarea.parentElement.insertBefore(label, this.textarea);
    }

    get value() {
        return this.textarea.value;
    }

    set value(value) {
        this.textarea.value = value;
    }
}

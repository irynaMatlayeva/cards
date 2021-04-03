import Component from "../config.js";

export class Input extends Component {

    constructor() {
        super();
        this.input = this.createElement({elem: "input", classes: ["form__input"]});
    }

    create() {
        return this.input;
    }

    attr(type = "text", id = null, value = null, placeholder = null, required = null, name = null) {
        this.input.setAttribute("type", type);
        if (id) this.input.setAttribute("id", id);
        if (value) this.input.setAttribute("value", value);
        if (placeholder) this.input.setAttribute("placeholder", placeholder);
        if (required) this.input.setAttribute("required", required);
        if (name) this.input.setAttribute("name", name);
    }

    error() {
        const errorMessage = this.createElement({elem: "span", classes: ["errMessage"], content: "Field filled incorrectly"});
        if (!this.input.value.trim()) {
            if (this.input.nextElementSibling.classList.contains("errMessage")) {
                this.input.classList.remove("errInput");
                this.input.nextElementSibling.remove();
            }
            this.input.classList.add("errInput");
            this.input.after(errorMessage);
        }
        this.event("focus", () => {
            if (this.input.value.trim()) {
                this.input.classList.remove("errInput");
                this.input.nextElementSibling.remove();
            }
        })
    }

    event(event = "", fn) {
        this.input.addEventListener(event, fn);
    }

    //add label for
    label(text = "", labelClass = "") {
        const label = this.createElement({elem: "label", text: text})
        if (labelClass) label.classList.add(labelClass);
        label.setAttribute("for", this.input.id);
        this.input.parentElement.insertBefore(label, this.input);
    }

    get value() {
        return this.input.value;
    }

    set value(value) {
        this.input.value = value;
    }
}
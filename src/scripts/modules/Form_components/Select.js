import Component from "../config.js";

export class Select extends Component {
    constructor() {
        super();
        this.select = this.createElement({elem: "select"});
    }

    create() {
        return this.select;
    }

    option(text = null, value = null) {
        const option = this.createElement({elem: "option", text: text});
        if (value) option.setAttribute("value", value);
        this.select.append(option);
        return option;
    }

    attr(id = "", disabled = false) {
        if (id) this.select.setAttribute("id", id);
        if (disabled) this.select.setAttribute("disabled", disabled);
    }

    label(text = "") {
        const label = this.createElement({elem: "label", text: text});
        label.setAttribute("for", this.select.id);
        this.select.parentElement.insertBefore(label, this.select);
    }

    get value() {
        return this.select.value;
    }

    set value(value) {
        this.select.value = value;
    }
}


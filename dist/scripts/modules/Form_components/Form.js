import Component from "../config.js";

export class Form extends Component {
    constructor() {
        super();
        this.form = this.createElement({elem: "form", classes: ["form"]});
    }

    insert(...elements) {
        return this.form.append(...elements);
    }

    create() {
        return this.form;
    }
}

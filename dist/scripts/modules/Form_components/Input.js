import {
    config,
    createElements
} from '../config.js'


export class Input {
    constructor() {
        this.input = createElements({
            elem: "input",
            classes: ["form__input"]
        });
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
        const errorMessage = createElements({
            elem: "span",
            classes: ["error__message"],
            content: "Field filled incorrectly"
        })
        if (!this.input.value.trim()) {
            if (this.input.nextElementSibling.classList.contains("error__message")) {
                this.input.classList.remove("error__input");
                this.input.nextElementSibling.remove();
            }
            this.input.classList.add("error__input");
            this.input.after(errorMessage);
        }
        this.input.addEventlistener("focus", ()=>{
            if(this.input.value.trim()){
                this.input.classList.remove("error__input");
                this.input.nextElementSibling.remove();
            }
        })
    }
    label(text="",classes=""){
        const label = createElements({elem:"label"});
        if (classes) label.classList.add(classes)
        label.setAttribute("for", this.input.id);
        label.textConntent=text;
        this.input.parentElement.insertBefore(label, this.input);
    }
    event(event="", fn){
        this.input.addEventlistener(event, fn);
    }
    get value(){
        return this.input.value;
    }
    set value(value){
        this.input.value=value;
    }
}
// const some = new Input();
// console.log(some);
import {
    config,
    createElements
} from '../config.js'

export class Select{
    constructor(){
        this.select=createElements({elem:"select"});
    }
    create(){
        return this.select;
    }
    option(text=null, value=null){
        const option= createElements({elem:"option",content:text});
        if(value) option.setAttribute("value", value)
        this.select.append(option)
        return option;
    }
    attr(id="", disabled=false){
        if(id) this.select.setAttribute("id", id);
        if(disabled) this.select.setAttribute("disabled", disabled);
    }
    label(text=""){
        const label= createElements({elem:"label",content=text});
        label.setAttribute("for", this.select.id);
        this.select.parentElement.insertBefore(label, this.select);
    }
    get value(){
        return this.value;
    }
    set value(value){
        return this.value=value;
    }
}

// const some = new Select();
// console.log(some);
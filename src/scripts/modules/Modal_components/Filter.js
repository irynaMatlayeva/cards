import {Input} from "../Form_components/Input.js";
import {Select} from "../Form_components/Select.js";
import Component from "../config.js";
import {dictionary} from "../dictionary.js";
import {readCardsDataWithFilter} from "../requests.js";


class Filter extends Component {
    constructor() {
        super();
    }

    createFilter() {
        const searchInput = new Input();
        const prioritySelect = new Select();
        const openDoneSelect = new Select();
        const searchButton = new Input();
        const filterField = this.createElement({
            elem: "section", classes: ["cards-filter", "cards__filter"], content: [
                searchInput.create(),
                prioritySelect.create(),
                openDoneSelect.create(),
                searchButton.create(),
            ],
        });
        const headerParent = document.querySelector(".cards-header");
        headerParent.parentNode.insertBefore(filterField, headerParent.nextSibling);

        searchInput.attr("text", "cardsSearch", "", "Search by target");
        prioritySelect.attr("cardsPriority");
        openDoneSelect.attr("cardsOpenDone");
        searchButton.attr("submit", "search-btn", "Search");

        prioritySelect.option(dictionary.priorityAll, dictionary.priorityAll);
        prioritySelect.option(dictionary.priorityLow, dictionary.priorityLow);
        prioritySelect.option(dictionary.priorityNormal, dictionary.priorityNormal);
        prioritySelect.option(dictionary.priorityHigh, dictionary.priorityHigh);
        openDoneSelect.option(dictionary.statusAll, dictionary.statusAll);
        openDoneSelect.option(dictionary.statusOpen, dictionary.statusOpen);
        openDoneSelect.option(dictionary.statusDone, dictionary.statusDone);


        document.getElementById("search-btn").addEventListener("click", (e) => {
            e.preventDefault();
            const contentCard = document.querySelector(".cards-visit__content");
            contentCard.innerHTML = "";
            const searchTarget = document.getElementById("cardsSearch");
            const searchPriority = document.getElementById("cardsPriority");
            const searchStatus = document.getElementById("cardsOpenDone");
            readCardsDataWithFilter(searchTarget.value, searchStatus.value, searchPriority.value);
        });
    }
}

export const filter = new Filter();

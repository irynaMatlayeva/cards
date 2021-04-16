import {config} from "./config.js";
import {headerContent} from "./components/Views/HeaderComponent.js";
import {cards} from "./components/Views/Cards.js";
import {filter} from "./components/Modal/Filter.js";
import {dictionary} from "./dictionary.js";

const tokenKey = "token";

//common function for requests
const makeRequest = (url, method = "GET", config, errorMessage = "Error") => {
    return fetch(url, {
        method,
        ...config,
    }).then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(errorMessage);
        }
    });
};

//common functions for fetch methods
const postData = (url, requestBody, errorMessage) =>
    makeRequest(
        url,
        "POST",
        {
            body: requestBody,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
            },
        },
        errorMessage
    );

const getDataCards = (url) =>
    makeRequest(url, "GET", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
        },
    });

const updateCards = (url, requestBody) =>
    makeRequest(url, "PUT", {
        body: requestBody,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
        },
    });

const deleteCards = (url) =>
    makeRequest(url, "DELETE", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
        },
    });

//requests
export async function loginRequest(data, element) {
    const dataRes = await postData(
        config.LOGIN_URL,
        JSON.stringify(data),
        "Error! Invalid email or password."
    );
    localStorage.setItem(tokenKey, dataRes);
    element.close();
    headerContent.toggleActive();
    await readCardsData();
}

export async function createCardData(data) {
    const dataRes = await postData(config.CARDS_URL, JSON.stringify(data));
    const dataJson = JSON.parse(dataRes);
    const {content, id} = dataJson;
    cards.createCards(content, id);
}

export async function readCardsData() {
    const dataRes = await getDataCards(config.CARDS_URL);
    let data = JSON.parse(dataRes);
    if (data.length > 0) {
        data.map((item) => {
            cards.createCards(item.content, item.id);
        });
        filter.createFilter();
    }
}

export async function readCardById(id) {
    const dataRes = await getDataCards(`${config.CARDS_URL}/${id}`);
    let data = JSON.parse(dataRes);
    const {content} = data;
    return await content;
}

export async function readCardsDataWithFilter(searchTarget, searchStatus, searchPriority) {
    const dataRes = await getDataCards(config.CARDS_URL);
    let data = JSON.parse(dataRes);
    data.filter((item) => {
        let {
            [dictionary.reasonGetValue]: target,
            [dictionary.urgencyGetValue]: urgency,
            [dictionary.statusGetValue]: status,
        } = item.content;

        return (
            (urgency === searchPriority ||
                searchPriority === dictionary.priorityAll) &&
            (status === searchStatus || searchStatus === dictionary.statusAll) &&
            target.toLowerCase().match(new RegExp(searchTarget.toLowerCase()))
        );
    })
        .forEach((item) => {
            cards.createCards(item.content, item.id);
        });
}

export async function updateCardData(data, id) {
    const dataRes = await updateCards(
        `${config.CARDS_URL}/${id}`,
        JSON.stringify(data)
    );
    let dataCards = JSON.parse(dataRes);
    const oldCard = document.getElementById(id);
    oldCard.remove();
    cards.createCards(dataCards.content, dataCards.id);
}

export async function deleteCardsData(id) {
    await deleteCards(`${config.CARDS_URL}/${id}`);
}

// ==UserScript==
// @name         SuperBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


//общие переменные
let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google ",
                "Отключение редакций и ревизий в WordPress ",
                "Вывод произвольных типов записей и полей в WordPress"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["гобой",
                                           "Как звучит флейта",
                                           "Кларнет", "Валторна"]
}
let searchs = ["www.google.com","yandex.ru"]
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let links = document.links;
let keyword = keywords[getRandom(0,keywords.length)];
let i=0;
//для гугла
let btnK = document.getElementsByName("btnK")[0];
let googleInput = document.getElementsByName("q")[0];
//для яндекса
let yaInput = document.getElementById("text");
let btnN = document.getElementsByClassName("button_theme_search")[0];
let nextYaPage;



function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

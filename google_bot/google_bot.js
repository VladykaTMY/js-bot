// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://psyholog.me/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google ",
                "Отключение редакций и ревизий в WordPress ",
                "Вывод произвольных типов записей и полей в WordPress"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["гобой",
                                           "Как звучит флейта",
                                           "Кларнет", "Валторна"],
    "psyholog.me":["центр здоровых отношений ",
                   "Услуги центра здоровых отношений ",
                   "Чекалина Елена психолог "]
}

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site]
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let keyword = keywords[getRandom(0,keywords.length)];
let googleInput = document.getElementsByName("q")[0];
let i=0;

if(btnK !== undefined){//если бнтн кей не равно андефайнд, то мы в куки кладем из переменной сайт, иначе когда мы на гугле мы кладем куки из сайт. и если мы не на гугле то мы кладем из переменной сайт
    document.cookie = "site=" + site;
}else if (location.hostname == "www.google.com"){
    site = getCookie("site");
}else {
    site = location.hostname;
}

if(btnK !== undefined){
    document.cookie = "site="+site;
    let timerId = setInterval (()=>{
        googleInput.value += keyword[i];
        i++;
        if(i==keyword.length){
            clearInterval(timerId)
            btnK.click();
        }
    },100)

    }else if(location.hostname == site){
        console.log("это работает");
        setTimeout(()=>{
            let index = getRandom(0,links.length);
            if(getRandom(0,101)>=50){
                location.href = "https://www.google.com/";
            }
            if(links[index].href.indexOf(site)!=-1)
                links[index].click();
        },getRandom(4000,7000));

    }
else{
    let nextGooglePage = true;
    for(let i =0; i<links.length; i++){
        if (links[i].href.indexOf(site)!=-1){
            let link = links[i];
            console.log("Нашел фразу " + link);
            nextGooglePage = false;
            setTimeout(()=>{
                link.click();}
                       ,getRandom(3000,5000));
            break;
        }
    }
    if(document.querySelector('.YyVfkd').innerText == "5"){
        nextGooglePage = false;
        location.href = "https://www.google.com/";
    }


    //    setTimeout(()=>{
    //        location.href = "https://www.google.com/";}
    //               ,getRandom(3000,5000));
    //}

    if(nextGooglePage){
        setTimeout(()=>{
            pnnext.click();}
                   ,getRandom(3000,5000));
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

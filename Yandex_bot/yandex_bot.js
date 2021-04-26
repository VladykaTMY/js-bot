// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["гобой","кларнет","как звучит флейта"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let btnN = document.getElementsByClassName("button_theme_search")[0]
if(btnN!== undefined){
    document.getElementById("text").value = keyword;
    btnN.click()
}else{
    for(let i=0;i<links.length;i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            let link = links[i];
            console.log("Найдено "+link);
            link.removeAttribute("target")
            link.click();
            break;
        }
    }
}


function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

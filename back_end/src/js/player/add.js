"use strict";

const name2 = document.querySelector("#name");
const position = document.querySelector("#position");
const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addPlayer);

function addPlayer() {
    let urlStr = window.location.href;
    let contentid = urlStr.split('/');

    const req = {
        name: name2.value,
        position: position.value,
        age: age.value,
        height: height.value,
        weight: weight.value
    };

    fetch(`/season/team/${contentid[5]}/player/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = `/season/team/${contentid[5]}/player/show`;
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}
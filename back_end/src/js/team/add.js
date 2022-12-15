"use strict";

const name2 = document.querySelector("#name");
const league = document.querySelector("#league");
const stadium = document.querySelector("#stadium");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addTeam);

function addTeam() {
    let urlStr = window.location.href;
    let contentid = urlStr.split('/');

    const req = {
        name: name2.value,
        league: league.value,
        stadium: stadium.value
    };

    fetch(`/season/${contentid[4]}/team/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = `/season/${contentid[4]}/team/show`;
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}
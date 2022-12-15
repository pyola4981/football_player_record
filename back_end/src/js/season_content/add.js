"use strict";

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const tag = document.querySelector("#tag");
const password = document.querySelector("#password");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addSeasonContent);

function addSeasonContent() {
    let urlStr = window.location.href;
    let contentid = urlStr.split('/');

    const req = {
        title: title.value,
        content: content.value,
        tag: tag.value,
        password: password.value
    };

    fetch(`/board/season/${contentid[5]}/content/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = `/board/season/${contentid[5]}/content/show`;
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}
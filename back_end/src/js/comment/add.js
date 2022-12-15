"use strict";

const content = document.querySelector("#content");
const password = document.querySelector("#password");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addComment);

function addComment() {
    let urlStr = window.location.href;
    let contentid = urlStr.split('/');

    const req = {
        content: content.value,
        password: password.value
    };

    fetch(`/board/season/${contentid[5]}/content/${contentid[7]}/comment/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = `/board/content/${contentid[7]}/read`;
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}
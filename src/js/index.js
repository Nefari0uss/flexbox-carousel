import "../sass/_styles";

let container = document.querySelector(".flex-container");
let flexItems = document.querySelectorAll(".flex-item");

function getNextItem(el) {
    if (el.nextElementSibling == null) {
        return flexItems[0];
    } else {
        return el.nextElementSibling;
    }
}

function getPreviousItem(el) {
    if (el.previousElementSibling == null) {
        return flexItems[flexItems.length - 1];
    } else {
        return el.previousElementSibling;
    }
}

function transitionForward() {
    container.classList.remove("transition-forward");
    setTimeout( () => { container.classList.add("transition-forward"); }, 50);
}



function goForward() {
    let ri = "reference-item";
    let currentItem = document.getElementsByClassName(ri)[0];
    currentItem.classList.remove(ri);

    document.querySelector("#was").innerText = currentItem.innerText;

    currentItem = getNextItem(currentItem);
    currentItem.classList.add(ri);

    document.querySelector("#is").innerText = currentItem.innerText;

    incrementOrder(currentItem);
    transitionForward();
}

function goBack() { console.log("go back"); }

function incrementOrder(el) {
    console.log("in increment order");
    //console.log("el:" + el);

    let item = el;
    for (let i = 0; i < flexItems.length; i++) {
        item.style.order = i.toString();
        item = getNextItem(item);
    }
    // getPreviousItem(item).style.order = (-1).toString();
}

function changeOrderBack() {
    let boxes = document.querySelectorAll(".flex-item");
    console.log(boxes.length);

    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let order = parseInt(box.style.order);
        console.log("box " + i + ", order " + order);

        if (order - 1 <= 0) {
            order = boxes.length - 1;
        } else {
            order--;
        }
        box.style.order = order.toString();
        box.innerHTML = "Flex Item: " + i + "&nbsp Order:" + order;
    }

    console.log("fin\n");
}



function changeOrder() {
    let boxes = document.querySelectorAll(".flex-item");
    console.log(boxes.length);

    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let order = parseInt(box.style.order);
        console.log("box " + i + ", order " + order);

        if (order + 1 >= boxes.length) {
            order = 0;
        } else {
            order++;
        }
        box.style.order = order.toString();
        box.innerHTML = "Flex Item: " + i + "&nbsp Order:" + order;
    }

    console.log("fin\n");
}

function printOrder() {
    let boxes = document.querySelectorAll(".flex-item");
    console.log(boxes, boxes.length);

    for (let box of boxes) {
        let order = box.style.order;
        console.log("box: " + box + ", order " + order);
    }

    console.log("fin\n");
}


document.addEventListener("DOMContentLoaded", function() {
    let backButton = document.querySelector("#backButton");

    let forwardButton = document.querySelector("#forwardButton");

    backButton.addEventListener("click", () => { goBack(); });

    forwardButton.addEventListener("click", () => { goForward(); });

    document.querySelector("#printOrder").addEventListener("click", () => { printOrder(); });
});

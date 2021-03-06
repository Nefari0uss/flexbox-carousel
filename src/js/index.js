import "../sass/_styles";
// https://pre00.deviantart.net/2a21/th/pre/i/2018/128/d/5/princess_mononoke_by_cglas-dcb024o.jpg
let container = document.querySelector(".pd-flex-container");
let flexItems = () => { return document.querySelectorAll(".pd-flex-item");};
let ri = "pd-reference-item";

function getFlexItemsCount() {
    return flexItems().length == null ? 0 : flexItems().length;
}

function createItem() {
    console.log("Creating item.");

    let fi = document.createElement("div");
    fi.classList.add("pd-flex-item");

    if (getFlexItemsCount() == 0 || document.querySelector(ri) == null) {
        fi.classList.add(ri);
    }

    let div = document.createElement("div");
    div.classList.add("pd-img-container");

    let img = document.createElement("img");
    img.src = "https://cdnb.artstation.com/p/assets/images/images/005/060/083/large/astri-lohne-sjursen-mononokeb.jpg?1488213693";
    img.alt = "Princess Mononoke";
    div.appendChild(img);

    let div2 = document.createElement("div");
    div2.classList.add("pd-cta-container");
    div2.innerHTML = getFlexItemsCount().toString();

    fi.appendChild(div);
    fi.appendChild(div2);
    container.appendChild(fi);
}

function deleteItem() {
    console.log("Deleting item");
    let length = getFlexItemsCount();
    if (length != 0) {
        container.removeChild(flexItems()[length - 1]);
    }
}

function getNextItem(el) {
    return el.nextElementSibling == null ? flexItems()[0] : el.nextElementSibling;
}

function getPreviousItem(el) {
    return el.previousElementSibling == null ? flexItems()[getFlexItemsCount() - 1] : el.previousElementSibling;
}

function transition(num) {
    let stasis = "pd-stasis";
    let forward = "pd-slide-forward";
    let backward = "pd-slide-backward";

    if (num == 1) {
        container.classList.remove(backward);
        container.classList.add(forward);
    } else {
        container.classList.remove(forward);
        container.classList.add(backward);
    }
    
    container.classList.remove(stasis);
    setTimeout( () => { container.classList.add(stasis); }, 50);
}

function goForward() {
    let currentItem = document.getElementsByClassName(ri)[0];
    currentItem.classList.remove(ri);

    document.querySelector("#was").innerText = currentItem.innerText;

    currentItem = getNextItem(currentItem);
    currentItem.classList.add(ri);

    document.querySelector("#is").innerText = currentItem.innerText;

    incrementOrder(currentItem);
    transition(1);
}

function goBack() {
    let currentItem = document.getElementsByClassName(ri)[0];
    currentItem.classList.remove(ri);

    document.querySelector("#was").innerText = currentItem.innerText;

    currentItem = getPreviousItem(currentItem);
    currentItem.classList.add(ri);

    document.querySelector("#is").innerText = currentItem.innerText;

    incrementOrder(currentItem);
    transition(0);

}

function incrementOrder(el) {
    console.log("in increment order");

    let item = el;
    for (let i = 0; i < getFlexItemsCount(); i++) {
        item.style.order = i.toString();
        item = getNextItem(item);
    }
    // getPreviousItem(item).style.order = (-1).toString();
}

function changeOrderBack() {
    let boxes = document.querySelectorAll(".pd-flex-item");
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
    let boxes = flexItems();
    console.log(boxes, boxes.length);

    for (let box of boxes) {
        let order = box.style.order;
        console.log("box: " + box + ", order " + order);
    }

    console.log("fin\n");
}

document.addEventListener("DOMContentLoaded", function() {

    for(let i = 0; i < 6; i++) createItem();

    document.querySelector("#pd-backButton").addEventListener("click", () => { goBack(); });

    document.querySelector("#pd-forwardButton").addEventListener("click", () => { goForward(); });

    document.querySelector("#printOrder").addEventListener("click", () => { printOrder(); });

    document.querySelector("#createElement").addEventListener("click", () => { createItem(); });

    document.querySelector("#deleteElement").addEventListener("click", () => { deleteItem(); });
});

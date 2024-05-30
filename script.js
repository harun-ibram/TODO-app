const list = document.getElementById("list-wrapper-id");
const input_text = document.querySelector("#task-input");
const buttons = "<button id=\"all_but\" class=\"hidde\">All</button><button id=\"active_but\" class=\"hidde\">Active</button><button id=\"comp_but\" class=\"hidde\">Completed</button>";
var list_len = 0;
const stat = document.getElementById("status");
stat.innerText = list_len;

var task_list_v = [];
document.onkeydown = function(e) {
    if (e.keyCode == 13) {
        list_len++;
        stat.innerText = "items left: " + list_len;
        if (stat.classList.contains("hidden")) {
            stat.classList.remove("hidden");
        }

        var text = input_text.value;
        input_text.value = "";
        const list = document.getElementById("list-wrapper-id");

        var new_list_elem = document.createElement("div");
        new_list_elem.classList.add("box");

        const checkbox_elem = document.createElement("input");
        checkbox_elem.type = "checkbox";
        checkbox_elem.classList.add("circular-check");
        var new_span = document.createElement("span");
        new_span.classList.add("span-interior");
        var new_text = document.createElement("span");
        new_span.appendChild(checkbox_elem);
        new_text.innerText = text;
        new_span.appendChild(new_text);
        new_list_elem.appendChild(new_span);

        list.appendChild(new_list_elem);
        task_list_v.push(new_list_elem);

        var remove_button = document.createElement("button");
        remove_button.classList.add("subm");
        remove_button.innerText = "Delete";
        new_list_elem.appendChild(remove_button);
        remove_button.addEventListener('click', () => {
            list.removeChild(new_list_elem);
            list_len--;
            stat.innerText = "items left: " + list_len;
            if (list_len == 0) {
                stat.classList.add("hidden");
            }
        })

        checkbox_elem.addEventListener('click', () => {
            new_span.classList.toggle("strike");
            new_list_elem.classList.toggle("completed");
        })
    }
}

const all_but = document.getElementById("all_but");
const active_but = document.getElementById("active_but");
const comp_but = document.getElementById("comp_but");
const clear_comp_but = document.getElementById("clear_comp");
const elem_list = document.getElementsByClassName("box");

all_but.addEventListener('click', () => {
    if (!all_but.classList.contains("selected"))
        all_but.classList.add("selected");
    if (active_but.classList.contains("selected"))
        active_but.classList.remove("selected");
    if (comp_but.classList.contains("selected"))
        comp_but.classList.remove("selected");
    if (clear_comp_but.classList.remove("selected"))
        clear_comp_but.classList.remove("selected");
    for (let i = 0; i < elem_list.length; i++) {
        if (elem_list[i].classList.contains("hidden"))
            elem_list[i].classList.toggle("hidden");
    }
    stat.innerText = "items left: " + elem_list.length;
})

active_but.addEventListener('click', () => {
    var new_len = 0
    if (all_but.classList.contains("selected"))
        all_but.classList.remove("selected");
    if (!active_but.classList.contains("selected"))
        active_but.classList.add("selected");
    if (comp_but.classList.contains("selected"))
        comp_but.classList.remove("selected");
    if (clear_comp_but.classList.remove("selected"))
        clear_comp_but.classList.remove("selected");
    for (let i = 0; i < elem_list.length; i++) {
        if (!elem_list[i].classList.contains("completed")) {
            elem_list[i].classList.add("hidden");
        } else  {
            elem_list[i].classList.remove("hidden");
            new_len++;
        }
    }
    stat.innerText = "items left: " + new_len;
})

comp_but.addEventListener('click', () => {
    var new_len = 0
    if (all_but.classList.contains("selected"))
        all_but.classList.remove("selected");
    if (active_but.classList.contains("selected"))
        active_but.classList.remove("selected");
    if (!comp_but.classList.contains("selected"))
        comp_but.classList.add("selected");
    if (clear_comp_but.classList.contains("selected"))
        clear_comp_but.classList.remove("selected");
    for (let i = 0; i < elem_list.length; i++) {
        if (elem_list[i].classList.contains("completed")) {
            elem_list[i].classList.add("hidden");
        } else {
            elem_list[i].classList.remove("hidden");
            new_len++;
        }
    }
    stat.innerText = "items left: " + new_len;
})

clear_comp_but.addEventListener('click', () => {
    for (let i = 0; i <= elem_list.length + 1; i++) {
        if (elem_list[i].classList.contains("completed")) {
            list.removeChild(elem_list[i]);
            i--;
            list_len--;
        }
        if (list_len == 0)
            stat.classList.toggle("hidden");
        else stat.innerText = "items left: " + list_len;
    }
})
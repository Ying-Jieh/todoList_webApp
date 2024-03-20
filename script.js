let listState = []; // [{text: string, checked: bool}]
const STATE_KEY = "todo-list";

// Store the state as '{"todo-list" : [ {text: "eat", checked: true}, {text: "study", checked: false}, {text: "dinner", checked: true}, ...]}'
function saveState(list) {
    localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function loadState() {
    const listState = localStorage.getItem(STATE_KEY);
    if (listState !== null) {
        return JSON.parse(listState);
    }
    return [];
}

function initList() {
    listState = loadState();
    console.log(listState);
    // render list
    const theUl = document.getElementById('list');
    for (const item of listState) {
        const li = document.createElement('li');
        li.innerText = item.text;

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete');
        deleteBtn.onclick = deleteItem;
        li.appendChild(deleteBtn);

        li.classList.add('item');
        if (item.checked) {
            li.classList.add('checked');
        }
        li.onclick = checkItem;
        theUl.appendChild(li);
    }
}

function addItem() {
    const ul = document.getElementById('list');
    const input = document.getElementById('input');
    const text = input.value;
    if (text === "") {
        alert("Please input something.");
        return;
    }

    // create a list element and specify its class for css file
    const newItem = document.createElement('li');
    newItem.classList.add("item");
    newItem.innerText = text;
    newItem.onclick = checkItem;

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = deleteItem;

    ul.appendChild(newItem);
    newItem.appendChild(deleteBtn);
    input.value = '';

    // push to listState and save it to localStorage
    listState.push({
        text,
        checked: false
    });
    saveState(listState);
    console.log('add');
    console.log(listState);
}

function checkItem() {
    const item = this;
    const theUl = item.parentNode;
    
    // update the listState and save it to localStorage
    const idx = Array.from(theUl.children).indexOf(item);
    console.log(idx);
    listState[idx].checked = !listState[idx].checked;

    item.classList.toggle("checked");
    saveState(listState);
    console.log('check');
    console.log(listState);
}

function deleteItem(e) {
    console.log("deleted");
    const item = this.parentNode;
    const theUl = item.parentNode;

    const idx = Array.from(theUl.children).indexOf(item);
    listState = listState.filter((_, i) => i !== idx);
    theUl.removeChild(item);
    console.log(idx);
    saveState(listState);
    e.stopPropagation();
}

initList();

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addItem);

const form = document.getElementById('input-wrapper');
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
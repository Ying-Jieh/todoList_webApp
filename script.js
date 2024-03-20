function addItem() {
    const ul = document.getElementById('list');
    const input = document.getElementById('input');
    const text = input.value;
    if (text === "") {
        alert("Please input something.");
        return;
    }

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
}

function checkItem() {
    console.log("checked");
    this.classList.toggle('checked');
}

function deleteItem() {
    console.log("deleted");
    const item = this.parentNode;
    const theUl = item.parentNode;
    theUl.removeChild(item);
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addItem);

const form = document.getElementById('input-wrapper');
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
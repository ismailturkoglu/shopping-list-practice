const shoppingList = document.querySelector(".shopping-list");

let items = [
  { id: 1, name: "Yumurta", completed: false },
  { id: 2, name: "Tavuk", completed: false },
  { id: 3, name: "Süt", completed: false },
  { id: 4, name: "Zeytin", completed: false },
  { id: 5, name: "Peynir", completed: false },
];

const form = document.getElementById("add-item-form");
// const form = document.querySelector("#add-item-form");

// 1. Yöntem: submit event
form.addEventListener("submit", handleFormSubmit);

// 2. Yöntem: click event
// const addItemButton = document.getElementById("add-item-button");
// addItemButton.addEventListener("click", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  console.log("yes");

  const input = document.getElementById("item-name");

  if (input.value.trim().length === 0) {
    console.log("Enter a value.");
    return;
  }

  addListItem(input);
}

function addListItem(input) {
  id = produceId();
  console.log(id);

  const newItem = createListItem({
    id: id,
    name: input.value,
    completed: false,
  });

  // Elemanı listenin sonuna ekler.
  shoppingList.appendChild(newItem);
  // Elemanı listenin başına ekler.
  // shoppingList.prepend(newItem);

  input.value = "";
}

function produceId() {
  return Date.now().toString();
}

// loadItems1();
loadItems2();

// 1. Yöntem: innerHTML ile itemları ekleme
function loadItems1() {
  clearItems();

  for (item of items) {
    shoppingList.innerHTML += `
    <li class="d-flex align-items-center">
        <input type="checkbox" class="form-check-input" />
        <div class="ps-3">${item.name}</div>
        <i class="bi bi-x ms-auto delete-icon"></i>
    </li>
  `;
  }
}

// 2. Yöntem: li elementi oluşturarak itemları ekleme
function loadItems2() {
  clearItems();

  for (item of items) {
    const li = createListItem(item);
    shoppingList.appendChild(li);
  }
}

function clearItems() {
  shoppingList.innerHTML = "";
}

function createListItem(item) {
  // li
  const li = document.createElement("li");
  li.className = "d-flex align-items-center";

  // input (checkbox)
  const ch = document.createElement("input");
  ch.type = "checkbox";
  ch.className = "form-check-input";
  ch.checked = item.completed;

  // div
  const div = document.createElement("div");
  div.className = "ps-3";
  div.innerText = `${item.name}`;

  // i (span da olabilir)
  const i = document.createElement("i");
  i.className = "bi bi-x ms-auto delete-icon";

  li.appendChild(ch);
  li.appendChild(div);
  li.appendChild(i);

  return li;
}

// Bu oluşturulacak:
/* <li class="d-flex align-items-center">
  <input type="checkbox" class="form-check-input" />
  <div class="ps-3">item</div>
  <i class="bi bi-x ms-auto delete-icon"></i>
</li> */

const shoppingList = document.querySelector(".shopping-list");

const form = document.getElementById("add-item-form");
// const form = document.querySelector("#add-item-form");

// const addItemButton = document.getElementById("add-item-button");

const filterButtons = document.querySelectorAll(".filter-buttons button");

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  // loadItems1();
  loadItems2();
  addEventListenerToFormSubmit();
  addEventListenerToFilterButtons();
}

function handleFormSubmit(e) {
  e.preventDefault();
  console.log("yes");

  const input = document.getElementById("item-name");

  checkInputEmpty(input);
  addListItem(input);
}

function checkInputEmpty(input) {
  if (input.value.trim().length === 0) {
    alert("Enter a value.");
    return;
  }
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
  let items = getItems();

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

  // Tamamlanan item'lara css uygulama özelliği
  // 1. Yöntem: toggle attribute ile
  li.toggleAttribute("item-completed", item.completed);

  // 2. Yöntem: add class ile
  // addCompletedClass(item, li);

  // input (checkbox)
  const ch = document.createElement("input");
  ch.type = "checkbox";
  ch.className = "form-check-input";
  ch.checked = item.completed;

  // checkbox işaretlenince css uygulama
  ch.addEventListener("change", toggleItemCompleted);

  // div
  const div = document.createElement("div");
  div.className = "ps-3 item-name";
  div.innerText = `${item.name}`;
  div.addEventListener("click", openEditMode);
  div.addEventListener("blur", closeEditMode);
  div.addEventListener("keydown", cancelEnter);

  // i (span da olabilir)
  const i = document.createElement("i");
  i.className = "bi bi-x ms-auto delete-icon";
  i.addEventListener("click", removeListItem);

  li.appendChild(ch);
  li.appendChild(div);
  li.appendChild(i);

  return li;

  // Bu oluşturulacak:
  /* <li class="d-flex align-items-center">
  <input type="checkbox" class="form-check-input" />
  <div class="ps-3">item</div>
  <i class="bi bi-x ms-auto delete-icon"></i>
</li> */
}

// Verilen item ın checkbox'ı işaretliyse "completed" sınıfı ekler.
function addCompletedClass(item, li) {
  if (item.completed) {
    li.classList.add("completed");
  }
}

// Tamamlanan list item'lara css uygular.
function toggleItemCompleted(e) {
  const li = e.target.parentElement;

  // 1. Yöntem: toggle attribute ile
  // LoadItems() ile item.completed'a göre yükleniyor. item.completed=true olsaydı zaten checkbox işaretli ve item-completed attribute'u olacaktı.
  // li.toggleAttribute("item-completed");

  // checkbox'ı referans alarak da toggle edilebilir.
  li.toggleAttribute("item-completed", e.target.checked);

  // 2. Yöntem: toggle class ile
  // li.classList.toggle("completed");
}

function removeListItem(e) {
  const li = e.target.parentElement;
  // li.remove();
  shoppingList.removeChild(li);
}

function getItems() {
  return [
    { id: 1, name: "Yumurta", completed: true },
    { id: 2, name: "Tavuk", completed: false },
    { id: 3, name: "Süt", completed: false },
    { id: 4, name: "Zeytin", completed: false },
    { id: 5, name: "Peynir", completed: false },
  ];
}

function openEditMode(e) {
  const li = e.target.parentElement;
  if (li.hasAttribute("item-completed") == false) {
    e.target.contentEditable = true;
  }
}
function closeEditMode(e) {
  e.target.contentEditable = false;
}
function cancelEnter(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    closeEditMode(e);
  }
}
function addEventListenerToFormSubmit() {
  // 1. Yöntem: submit event
  form.addEventListener("submit", handleFormSubmit);

  // 2. Yöntem: click event
  // addItemButton.addEventListener("click", handleFormSubmit);
}
function addEventListenerToFilterButtons() {
  for (button of filterButtons) {
    button.addEventListener("click", handleFilterSelection);
  }
}
function handleFilterSelection(e) {
  const filterButton = e.target;
  for (button of filterButtons) {
    button.classList.add("btn-secondary");
    button.classList.remove("btn-primary");
  }

  filterButton.classList.add("btn-primary");
  filterButton.classList.remove("btn-secondary");
}

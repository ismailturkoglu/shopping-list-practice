const shoppingList = document.querySelector(".shopping-list");
const form = document.getElementById("add-item-form");
// const form = document.querySelector("#add-item-form");
// const addItemButton = document.getElementById("add-item-button");
const filterButtons = document.querySelectorAll(".filter-buttons button");

// Initialize the application after the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", initApp);

// Initializes the application and sets up event listeners.
function initApp() {
  // loadItems1();
  loadItems2();
  addEventListenerToFormSubmit();
  addEventListenerToFilterButtons();
}
// Handles the form submission and adds a new item to the list.
function handleFormSubmit(e) {
  e.preventDefault();
  console.log("yes");

  // Get the input field containing the new item name.
  const input = document.getElementById("item-name");

  // Stop the process if the input is empty.
  if (checkInputEmpty(input)) {
    return;
  }

  // Create and add the new item to the shopping list.
  addListItem(input);

  // Apply the currently selected filter.
  updateFilterItems();

  // Saves shopping list data to local storage.
  saveToLocalStore();
}
// Checks whether the input is empty.
function checkInputEmpty(input) {
  // Show an alert if the input is empty.
  if (input.value.trim().length === 0) {
    alert("Enter a value.");
    return true;
  }
  return false;
}
// Creates and adds a new item to the shopping list.
function addListItem(input) {
  const id = produceId();
  console.log(id);

  const newItem = createListItem({
    id: id,
    name: input.value,
    completed: false,
  });

  // Add the item to the end of the list.
  shoppingList.appendChild(newItem);
  // Add the item to the start of the list.
  // shoppingList.prepend(newItem);

  // Clear the input field.
  input.value = "";
}
// Generates a unique ID based on the current timestamp.
function produceId() {
  return Date.now().toString();
}
// 1st method: Add items using innerHTML.
function loadItems1() {
  clearItems();

  for (const item of items) {
    shoppingList.innerHTML += `
    <li class="d-flex align-items-center">
        <input type="checkbox" class="form-check-input" />
        <div class="ps-3">${item.name}</div>
        <i class="bi bi-x ms-auto delete-icon"></i>
    </li>
  `;
  }
}
// 2nd method: Create li elements and items to the list.
function loadItems2() {
  clearItems();
  let items = getItems();

  for (item of items) {
    const li = createListItem(item);
    shoppingList.appendChild(li);
  }
}
// Clears all items from the shopping list.
function clearItems() {
  shoppingList.innerHTML = "";
}
// Creates and returns a new li element for a shopping item.
function createListItem(item) {
  // Create the li element.
  const li = document.createElement("li");
  li.className = "d-flex align-items-center";

  // Apply the completed state using a custom attribute
  // 1st method: Toggle the attribute based on the item's status.
  li.toggleAttribute("item-completed", item.completed);

  // Add the item's unique ID as a custom attribute to the li element.
  li.setAttribute("item-id", item.id);

  // 2nd method: Add a CSS class.
  // addCompletedClass(item, li);

  // input
  // Create the checkbox input.
  const ch = document.createElement("input");
  ch.type = "checkbox";
  ch.className = "form-check-input";
  ch.checked = item.completed;

  // Update the item's completed state when the checkbox changes.
  ch.addEventListener("change", toggleItemCompleted);

  // div
  // Create the item name element.
  const div = document.createElement("div");
  div.className = "ps-3 item-name";
  div.innerText = `${item.name}`;

  // Enable and disable edit mode for the item name.
  div.addEventListener("click", openEditMode);
  div.addEventListener("blur", closeEditMode);
  div.addEventListener("keydown", cancelEnter);

  // i (span can be)
  // Create the delete icon.
  const i = document.createElement("i");
  i.className = "bi bi-x ms-auto delete-icon";
  i.addEventListener("click", removeListItem);

  // Add the elements to the li element.
  li.appendChild(ch);
  li.appendChild(div);
  li.appendChild(i);

  return li;

  // Resulting HTML structure:

  /* 
  <li class="d-flex align-items-center">
  <input type="checkbox" class="form-check-input" />
  <div class="ps-3">item</div>
  <i class="bi bi-x ms-auto delete-icon"></i>
  </li> 
  */
}
// Adds the "completed" class if the item is completed.
function addCompletedClass(item, li) {
  if (item.completed) {
    li.classList.add("completed");
  }
}
// Updates the completed state of a shopping list item when the checkbox changes.
function toggleItemCompleted(e) {
  const li = e.target.parentElement;

  // 1st method: with toggle attribute
  // LoadItems() ile item.completed'a göre yükleniyor. item.completed=true olsaydı zaten checkbox işaretli ve item-completed attribute'u olacaktı.
  // li.toggleAttribute("item-completed");

  // Toggle the custom attribute based on the checkbox state.
  li.toggleAttribute("item-completed", e.target.checked);

  // 2nd method: with toggle class
  // li.classList.toggle("completed");

  // Reapply the currently selected filter.
  updateFilterItems();

  // Saves shopping list data to local storage.
  saveToLocalStore();
}
// Removes the selected item from the shopping list.
function removeListItem(e) {
  const li = e.target.parentElement;
  // li.remove();
  shoppingList.removeChild(li);

  // Reapply the currently selected filter.
  updateFilterItems();

  // Saves shopping list data to local storage.
  saveToLocalStore();
}
// Returns the initial shopping list items.
function getItems() {
  // return [
  //   { id: 1, name: "Yumurta", completed: true },
  //   { id: 2, name: "Tavuk", completed: false },
  //   { id: 3, name: "Süt", completed: false },
  //   { id: 4, name: "Zeytin", completed: false },
  //   { id: 5, name: "Peynir", completed: false },
  // ];

  // Retrieves shopping list items from local storage and returns an empty array if no items are found.
  return JSON.parse(localStorage.getItem("shoppingListItems")) || [];
}
// Enables edit mode for an incompleted item
function openEditMode(e) {
  const li = e.target.parentElement;
  if (!li.hasAttribute("item-completed")) {
    e.target.contentEditable = true;
  }
}
// Disables edit mode when the element loses focus.
function closeEditMode(e) {
  e.target.contentEditable = false;

  // Saves shopping list data to local storage.
  saveToLocalStore();
}
// Prevents the "Enter" key from creating a new line in edit mode.
function cancelEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    closeEditMode(e);
  }
}
// Adds an event listener to handle form submission.
function addEventListenerToFormSubmit() {
  // 1st method: Listen for the submit event.
  form.addEventListener("submit", handleFormSubmit);

  // 2nd method: Listen for the button click event.
  // addItemButton.addEventListener("click", handleFormSubmit);
}
// Adds click event listeners to all filter buttons.
function addEventListenerToFilterButtons() {
  for (const button of filterButtons) {
    button.addEventListener("click", handleFilterSelection);
  }
}
// Handles filter button selection and applies the selected filter.
function handleFilterSelection(e) {
  const activeBtn = e.target;

  // Reset all filter buttons to the secondary style.
  for (button of filterButtons) {
    button.classList.add("btn-secondary");
    button.classList.remove("btn-primary");
  }

  // Set the selected button to the primary style.
  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("btn-secondary");

  // Get the filter type from the custom attribute.
  const filterType = activeBtn.getAttribute("item-filter");

  filterItems(filterType);
}
// Shows or hides list items based on the selected filter.
function filterItems(filter) {
  const ul = document.querySelector(".shopping-list");
  const listItems = ul.querySelectorAll("li");

  for (const li of listItems) {
    // Reset the visibility classes before applying the filter.
    li.classList.remove("d-flex");
    li.classList.remove("d-none");

    // Check whether the item is completed.
    const isCompleted = li.hasAttribute("item-completed");

    if (filter == "completed") {
      // Show only completed items.
      li.classList.toggle(isCompleted ? "d-flex" : "d-none");
    } else if (filter == "incompleted") {
      // Show only incompleted items.
      li.classList.toggle(isCompleted ? "d-none" : "d-flex");
    } else {
      // Show all items.
      li.classList.toggle("d-flex");
    }
  }
}
// Reapplies the currently selected filter.
function updateFilterItems() {
  const activeBtn = document.querySelector(".btn-primary[item-filter]");
  const filter = activeBtn.getAttribute("item-filter");
  filterItems(filter);
}
// Collects shopping list items from the DOM, converts them into an array of objects and saves the data in local storage as a JSON string.
function saveToLocalStore() {
  const listItems = document
    .querySelector(".shopping-list")
    .querySelectorAll("li");

  let list = [];

  // Convert each list item into an object and add it to the list array.
  for (let li of listItems) {
    // id
    // Get the item's id from the custom attribute
    const id = li.getAttribute("item-id");
    // name
    // Gets the item's name from the div element.
    const name = li.querySelector("div").innerText;
    // isCompleted
    // Checks whether the item is completed.
    const isCompleted = li.hasAttribute("item-completed");

    list.push({ id: id, name: name, completed: isCompleted });
  }

  // Saves the list data as a JSON string in local storage.
  localStorage.setItem("shoppingListItems", JSON.stringify(list));
}

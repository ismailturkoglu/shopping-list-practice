# Shopping List

A simple shopping list application built with **HTML, CSS, JavaScript, and Bootstrap**.

The application allows users to add, edit, complete, filter, delete, and clear shopping list items. Data is stored in the browser using **Local Storage**.

## Live Demo

[View the live application](https://ismailturkoglu.github.io/shopping-list-practice/)

## Features

- Add new shopping list items
- Validate empty input
- Generate a unique ID for each item
- Mark items as completed or incompleted
- Edit incompleted items
- Delete individual items
- Filter items by:
  - All
  - Completed
  - Incompleted
- Clear the entire shopping list
- Save shopping list data to Local Storage
- Load saved items when the page starts
- Show or hide UI elements depending on the list state

## Data Structure

Each shopping list item is represented as an object:

```js
{
  id: "1753950000000",
  name: "Milk",
  completed: false
}

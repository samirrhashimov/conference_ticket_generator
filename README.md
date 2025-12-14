# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [https://github.com/samirrhashimov/conference_ticket_generator](https://github.com/samirrhashimov/conference_ticket_generator)
- Live Site URL: [https://samirrhashimov.github.io/conference_ticket_generator/](https://samirrhashimov.github.io/conference_ticket_generator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Browser localStorage

### What I learned

#### 1. File Uploads and Base64 Conversion

* Learned to **handle file uploads** via `<input type="file">`.
* Converted uploaded images to **Base64 format** using `FileReader.readAsDataURL()`.
* Stored images in **localStorage** to persist them across page reloads.
* Displayed **image previews** dynamically after upload.

```js
const upload = document.querySelector('#upload');
upload.addEventListener('change', () => {
  const file = upload.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const base64Image = e.target.result;
    localStorage.setItem('ticketAvatar', base64Image); // store in localStorage
    document.querySelector('#avatar_preview').src = base64Image; // show preview
  };
  reader.readAsDataURL(file);
});
```

```html
<img id="avatar_preview" alt="Avatar Preview">
```

#### 2. Gradient Text and CSS Styling

* Applied **gradient text** in CSS using `background: linear-gradient` and `-webkit-background-clip: text`.
* Improved **UI/UX** by creating visually appealing upload areas, error messages, and ticket previews.
* Managed **responsive design** with `viewport` meta tags and flexible container styling.

```css
.gradient-text {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### 3. Error Management

* Implemented a **centralized error system** with `showError()` and `clearError()` functions.
* Learned to handle both **file errors** and **form input validation errors** in a consistent way.


## Author

- Website - [Samir Hashimov](https://samirrhashimov.pages.dev/)
- Frontend Mentor - [@samirrhashimov](https://www.frontendmentor.io/profile/samirrhashimov)
- Twitter - [@samirrhashimov](https://www.twitter.com/samirrhashimov)


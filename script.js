const upload = document.querySelector('#upload');
const area = document.querySelector('#upload_area');

upload.style.display = 'none';

area.addEventListener('click', () => {
    upload.click();
});

const altText = document.querySelector('.alt_text');

upload.addEventListener('change', () => {
    if (upload.isDefaultNamespace.length > 0) {
        altText.textContent = `File: ${upload.files[0].name}`
    }
})

function saveData() {
    const data = {
        photo: document.querySelector('#upload').value,
        name: document.querySelector('#fullname').value,
        email: document.querySelector('#email').value,
        githubusername: document.querySelector('#githubusername').value
    };

    localStorage.removeItem('ticketData');
    localStorage.setItem('ticketData' , JSON.stringify(data));
}
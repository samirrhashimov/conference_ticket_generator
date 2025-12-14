/* Error management */
function showError(elementId, message) {
    document.querySelector(elementId).textContent = message;
}

function clearError(elementId) {
    document.querySelector(elementId).textContent = '';
}

/* Form Actions */
const upload = document.querySelector('#upload');
const imageError = '#image_error';
const area = document.querySelector('#upload_area');

upload.style.display = 'none';

area.addEventListener('click', () => {
    upload.click();
});

const altText = document.querySelector('.alt_text');

upload.addEventListener('change', () => {
    const file = upload.files[0];
    clearError(imageError);

    if (!file) return;

    if (file.size > 500 * 1024) {
        showError(imageError, 'Image must be less than 500KB');
        upload.value = '';
    }

    if (upload.isDefaultNamespace.length > 0) {
        altText.textContent = `File: ${upload.files[0].name}`
    }
})




function saveData() {
    const formPage = document.querySelector('#form_area');
    const ticketPage = document.querySelector('#gen_ticket');
    const data = {
        photo: document.querySelector('#upload').value,
        name: document.querySelector('#fullname').value,
        email: document.querySelector('#email').value,
        githubusername: document.querySelector('#githubusername').value
    };

    localStorage.removeItem('ticketData');
    localStorage.setItem('ticketData', JSON.stringify(data));

    /* Ticket */
    const pullData = JSON.parse(localStorage.getItem('ticketData'));
    const genName = document.querySelector('#gen_name');
    const genEmail = document.querySelector('#gen_email');

    genName.textContent = pullData.name;
    genEmail.textContent = pullData.email;

    const ticketName = document.querySelector('#cust_name');
    const ticketGithub = document.querySelector('#githubname');

    ticketName.textContent = pullData.name;
    ticketGithub.textContent = pullData.githubusername;

    formPage.style.display = 'none';
    ticketPage.style.display = 'flex'
}

const form = document.querySelector('#ticket_form');

form.addEventListener('submit', e => {
    e.preventDefault();
});
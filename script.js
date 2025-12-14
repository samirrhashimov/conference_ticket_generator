/* Error management */
function showError(elementId, message) {
    document.querySelector(elementId).textContent = message;
}

function clearError(elementId) {
    document.querySelector(elementId).textContent = '';
}

let base64Image = '';

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
    upload.setAttribute('aria-invalid', 'false');

    const reader = new FileReader();
    reader.onload = e => {
        base64Image = e.target.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }

    if (!file) return;

    if (file.size > 500 * 1024) {
        showError(imageError, 'Image must be less than 500KB');
        upload.setAttribute('aria-invalid', 'true');
        upload.value = '';
    }

    if (upload.files.length > 0) {
        altText.textContent = `File: ${upload.files[0].name}`
    }

})




function saveData() {
    const formPage = document.querySelector('#form_area');
    const ticketPage = document.querySelector('#gen_ticket');
    const data = {
        photo: base64Image,
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
    const ticketPhoto = document.querySelector('#cust_img');

    ticketName.textContent = pullData.name;
    ticketGithub.textContent = pullData.githubusername;
    ticketPhoto.src = pullData.photo;

    formPage.style.display = 'none';
    ticketPage.style.display = 'flex'
}

const form = document.querySelector('#ticket_form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const fullName = document.querySelector('#fullname');
    const email = document.querySelector('#email');
    const github = document.querySelector('#githubusername');
    const emailErrorId = '#email_error';
    const nameErrorId = '#name_error';
    const githubErrorId = '#github_error';
    const imageErrorId = '#image_error';

    let isValid = true;

    // Validate Name
    if (!fullName.value.trim()) {
        showError(nameErrorId, 'Full Name is required');
        fullName.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        clearError(nameErrorId);
        fullName.setAttribute('aria-invalid', 'false');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(emailErrorId, 'Email Address is required');
        email.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(emailErrorId, 'Please enter a valid email address');
        email.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        clearError(emailErrorId);
        email.setAttribute('aria-invalid', 'false');
    }

    // Validate Github
    if (!github.value.trim()) {
        showError(githubErrorId, 'GitHub Username is required');
        github.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        clearError(githubErrorId);
        github.setAttribute('aria-invalid', 'false');
    }

    // Validate Image
    if (!base64Image) {
        showError(imageErrorId, 'Please upload an avatar');
        upload.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        // Check if there is an existing size error
        const currentImageError = document.querySelector(imageErrorId).textContent;
        if (currentImageError && currentImageError !== 'Please upload an avatar') {
            upload.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            clearError(imageErrorId); // Clear "Please upload" error if now text is empty or wasn't size error
            upload.setAttribute('aria-invalid', 'false');
        }
    }

    if (isValid) {
        saveData();
    }
});
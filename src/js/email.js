const form = document.querySelector('.footer__form');
const input = document.querySelector('.footer__form input');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = input.value.trim();
    if (!email) {
        showMessage('Заполните поле!⚔️', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Некорректная форма заполнения!👀', 'error');
        return;
    }

    const TOKEN = '7983617956:AAHOXOWwkmpnZKE58PmhOELxJ22QHqwFxuw';
    const CHATID = '-1002559393792';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const message = `FOODBOUTIQUE ${email}`;

    fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHATID,
            text: message
        })
    })
        .then(response => {
            if (response.ok) {
                input.value = '';
                showMessage('Спасибо за оставленную заявку! ☃️', 'success');
            } else {
                showMessage('Произошла ошибка при отправке. Попробуйте позже😢', 'error');
            }
        })
});

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function showMessage(text, type = 'success') {
    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '20px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.color = '#fff';
    messageElement.style.padding = '12px 24px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.fontSize = '16px';
    messageElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    messageElement.style.zIndex = '9999';
    messageElement.style.opacity = '1';
    messageElement.style.transition = 'opacity 1s ease';

    if (type === 'error') {
        messageElement.style.background = '#d9534f';
    } else {
        messageElement.style.background = '#069343cd';
    }

    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.style.opacity = '0';
    }, 3000);

    setTimeout(() => {
        messageElement.remove();
    }, 4000);
}

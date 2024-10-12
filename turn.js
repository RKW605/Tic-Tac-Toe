const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');

document.getElementById('firstButton').addEventListener('click', () => {
    window.location.href = `${mode}.html?turn=first`;
});

document.getElementById('secondButton').addEventListener('click', () => {
    window.location.href = `${mode}.html?turn=second`;
});
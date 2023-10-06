// ! Modo oscuro
const swith = document.querySelector('.switch');
const body = document.body;
const isLocalStorageActive = localStorage.getItem('isActive');


document.addEventListener('DOMContentLoaded', () => {
    if (isLocalStorageActive === 'true') {
        swith.classList.add('active');
        body.classList.add('active');
    }
    
    swith.addEventListener('click', e => {
        swith.classList.toggle('active');
        body.classList.toggle('active');
        
        const isActive = body.classList.contains('active');
        localStorage.setItem('isActive', isActive.toString());
    });
});
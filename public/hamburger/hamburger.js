const navLinks = document.querySelector('.nav-links');
const slideover_bg = document.getElementById('slideover-bg');
const buy_btn = document.querySelector('#buy-btn');



function onToggleMenu(e) {
    e.name = e.name === 'more' ? 'close' : 'more'


    navLinks.classList.toggle('z-40');
    navLinks.classList.toggle('hidden');

    slideover_bg.classList.toggle('hidden');
    // slideover_bg.classList.toggle('opacity-0');
    // slideover_bg.classList.toggle('opacity-50');
    slideover_bg.classList.toggle('z-10');

}

async function onClickLogOut(e){
    localStorage.clear();
    const result = await axios.get('/logout');
    // window.location.replace("http://3.88.62.108:3000/");
}
const navbar = document.querySelector('#navbar');
let navbarHeight = navbar.clientHeight;


// 1. При нажатии на якорную ссылку внутри сайта - переход на соответствующий раздел 
// с учетом высоты navbar (чтобы не перекрывала)
const linkWays = document.querySelectorAll('.linkWay');
linkWays.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		// определили id раздела и расстояние до раздела
		let elementID = link.hash;
		let elementOffset = document.querySelector(elementID).offsetTop;

		// переход к соответствующему разделу
		window.scrollTo({
			top: elementOffset - navbarHeight,
			behavior: 'smooth'
		}) || document.documentElement.scrollTo({
			top: elementOffset - navbarHeight,
			behavior: 'smooth'
		});
	});
});


// 2. ставим подслушку на кнопку "Рассчитать"
const tariff = document.querySelector('#tariff');
const btnCalculate = document.querySelector('#btnCalculate');
btnCalculate.addEventListener('click', () => {
	// при клике - вызываем функцию расчета стоимости
	countTotal();
});


// функция расчета стоимости
function countTotal() {
	// определили выбранный тариф    
	// по атрибуту value нашли опцию с выбранным тарифом
	const option = document.querySelector(`[value="${tariff.value}"]`);

	// проверяем, что у опции есть атрибут с ценой
	if (option.hasAttribute('data-price')) {
		const sessionPrice = Number(option.attributes['data-price'].value);

		// проверяем, выбрал ли пользователь макияж
		const makeup = document.querySelector('#makeup');
		const makeupPrice = makeup.checked ? Number(makeup.value) : 0;

		// проверяем, выбрал ли пользователь доп.ретушь
		const retouch = document.querySelector('#retouch');
		const retouchPrice = retouch.checked ? Number(retouch.value) : 0;

		const totalPrice = sessionPrice + makeupPrice + retouchPrice;
		document.querySelector('#totalPrice').textContent = totalPrice + ' р';
	}

	// если такого атрибута нет, выдаем сообщение, очищаем стоимость
	else {

		document.querySelector('#totalPrice').textContent = '';
		Swal.fire({
			text: 'Пожалуйста, выберите тариф.',
			width: 400,
			color: '#a9a9a9',
		});
	};
};
// 3. если пользователь кликнул на отправку формы, при переходе со страницы форма будет очищена
const btnSubmit = document.querySelector('#btnSubmit');
btnSubmit.addEventListener('click', () => {
	window.addEventListener('unload', () => {
		resetForm();
	})
});

//функция очистки полей
function resetForm() {
	document.querySelector('.form').reset();
	document.querySelector('#totalPrice').textContent = '';
};


// 4. Автозаполнение при нажатии кнопки "Заказать" в карточке тарифа
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
	// в каждой карточке ставим подслушку на кнопку
	card.querySelector('.btnOrder').addEventListener('click', () => {

		// при нажатии на кнопку определяем id карточки и передаем его в форму
		tariff.value = card.id;
		//вызываем функцию расчета стоимости
		countTotal();
		let formOffset = document.querySelector('.form').offsetTop;
		let headerHeight = document.querySelector('#navbar').clientHeight;

		window.scrollTo({
				top: formOffset - 2 * headerHeight,
				behavior: 'smooth'
			}) ||
			document.documentElement.scrollTo({
				top: formOffset - 2 * headerHeight,
				behavior: 'smooth'
			});
	});
});

gsap.to(".photographerName", {
    text: "МАРК КАТАЕВ",
    duration: 1.7,
    ease: "power1.in"
});

gsap.from(".job", {opacity: 0, duration: 1.5, delay: 2});


if (window.innerWidth > 500) {
    gsap.from(".div_resume", {
	    scrollTrigger: ".div_resume", // start the animation when ".box" enters the viewport (once)
	    x: 350,
	    scrub: 1,
	    duration: 3,
	    ease: "elastic",
	    fastScrollEnd: true,
	    invalidateOnRefresh: true
    });
};
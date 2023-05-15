// Определение класса Access
export class Access {
	// Конструктор класса, вызываемый при создании нового экземпляра класса
	constructor() {
		// Находим на странице форму с классом 'form_access' и сохраняем её в свойство 'form' экземпляра класса
		this.form = document.querySelector('.form_access')
	}

	// Метод init, инициализирующий функциональность класса
	init() {
		// Если форма не найдена, прекращаем выполнение метода
		if (!this.form) return

		// Добавляем обработчик события 'submit' для формы
		this.form.addEventListener('submit', async event => {
			// Предотвращаем стандартное поведение браузера при отправке формы
			event.preventDefault()

			// Создаём объект FormData из формы
			let formData = new FormData(event.target)
			// Извлекаем значения полей 'name' и 'phone' из объекта FormData
			let name = formData.get('name')
			let phone = formData.get('phone')

			// Выводим полученные значения в консоль
			console.log('Name: ' + name)
			console.log('Phone: ' + phone)

			// Выполняем запрос на получение данных с сервера
			let data = await this.getAccess({ name, phone })

			// Если полученные данные соответствуют введённым, перенаправляем пользователя на другую страницу
			if (data.length) {
				window.location.href = 'index.html'
			} else {
				// В противном случае показываем сообщение об ошибке
				alert('login error')
			}
		})
	}

	// Метод getAccess выполняет запрос на сервер и возвращает данные, соответствующие введённым в форму
	async getAccess(accessData) {
		// Выполняем запрос на сервер
		let data = await this.sendRequest()

		// Фильтруем полученные данные, оставляя только те элементы, которые соответствуют введённым
		return data.filter(item => {
			console.log(item, data)
			return accessData.name === item.name && accessData.phone === item.phone
		})
	}

	// Метод sendRequest выполняет запрос на сервер и возвращает полученные данные в формате JSON
	async sendRequest() {
		// Адрес сервера
		let endPoint = `https://jsonplaceholder.typicode.com/users`

		// Выполняем запрос на сервер и преобразуем полученные данные в формат JSON
		return await fetch(endPoint).then(response => response.json())
	}
}

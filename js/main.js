// Импорт класса Request из файла "Request.js"
import { Request } from './modules/Request.js'

// Импорт класса RecipeCard из файла "RecipeCard.js"
import { RecipeCard } from './modules/RecipeCard.js'
import { Access } from './modules/acces.js'
new Access().init()
// Проверка наличия элемента с классом "search-form" в документе
if (document.querySelector('.search-form')) {
	// Если такой элемент есть, записываем его в переменную form
	let form = document.querySelector('.search-form')

	// Добавляем обработчик события "submit" для этой формы
	form.addEventListener('submit', async function (event) {
		// Предотвращаем стандартное действие формы (отправку данных)
		event.preventDefault()
		// Получаем значение из поля ввода с именем 'query'
		let query = this.elements.query.value

		// Создаём новый объект класса Request с параметрами 'query' и 'q', отправляем запрос и получаем результат
		let recipes = await new Request(query, 'q')
			.sendRequest()
			.then(data => data.hits)

		// Находим элемент с классом "result" и записываем его в переменную resultNode
		let resultNode = document.querySelector('.result')

		// Проходимся по всем элементам массива recipes
		for (let i = 0; i < recipes.length; i++) {
			// Создаем новую карточку рецепта и добавляем ее в resultNode
			resultNode.appendChild(new RecipeCard(recipes[i]).renderCard())
		}

		// Сбрасываем форму
		this.reset()
	})
}

// Получаем параметр 'id' из URL
let id = new URLSearchParams(window.location.search).get('id')

// Если id существует
if (id) {
	// Создаем новый объект класса Request с параметром 'id', отправляем запрос и получаем информацию о рецепте
	let recipeInfo = await new Request(id).sendRequest().then(data => data.recipe)

	// Выводим информацию о рецепте в консоль
	console.log(recipeInfo)

	// Заполняем элементы на странице информацией о рецепте
	document.querySelector('.single-recipe__title').innerText = recipeInfo.label
	document.querySelector('.single-recipe__img').src = recipeInfo.image
	document.getElementById('calories-value').innerText = Math.round(
		recipeInfo.calories
	)
	document.getElementById(
		'ingredient-lines-value'
	).innerHTML = `${recipeInfo.ingredientLines.join('<br>')}`
	document.getElementById('health-labels-value').innerHTML =
		recipeInfo.healthLabels.join('<br>')
	document.getElementById('dish-type-value').innerHTML =
		recipeInfo.dishType.join('<br>')
	document.getElementById('ingredients-value').innerHTML =
		recipeInfo.ingredients.map(ingredients => ingredients.text).join('<br>')
	document.getElementById('cuisine-type-value').innerText =
		recipeInfo.cuisineType
	document.getElementById('total-weight-value').innerText = Math.round(
		recipeInfo.totalWeight
	)
}

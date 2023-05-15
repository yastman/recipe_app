// Импорт класса Request из файла "Request.js"
import { Request } from './modules/Request.js'

// Импорт класса RecipeCard из файла "RecipeCard.js"
import { RecipeCard } from './modules/RecipeCard.js'

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
	document.querySelector(
		'.single-recipe__text'
	).innerHTML = `Calories: ${Math.round(recipeInfo.calories)}
<br>ingredient lines: ${recipeInfo.ingredientLines.join('<br>')}
<br>Health labels: ${recipeInfo.healthLabels.join('<br>')}
<br>Dish type: ${recipeInfo.dishType.join('<br>')}
<br>Ingredients: ${recipeInfo.ingredients
		.map(ingredients => ingredients.text)
		.join('<br>')}
<br>Сuisine type: ${recipeInfo.cuisineType}
<br>Total weight: ${Math.round(recipeInfo.totalWeight)}`
}

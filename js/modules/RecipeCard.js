// Экспортируем класс RecipeCard
export class RecipeCard {
    // Статическое поле класса, содержащее название страницы рецепта
    static recipePage = "recipe.html";

    // Конструктор класса принимает параметры рецепта
    constructor(params) {
        // Сохраняем информацию о рецепте в свойстве info
        this.info = params;
        this.image = params.recipe.image;
        this.label = params.recipe.label;
        this.uri = params.recipe.uri;

    }

    // Создаем HTML-элемент article для карточки рецепта
    createCard() {
        let card = document.createElement("article");
        card.classList.add("result__item");
        return card;
    }

    // Создаем HTML-элемент img для изображения рецепта
    addImageToCard() {
        let img = document.createElement("img");
        img.setAttribute("src", this.image);
        img.classList.add("result__img");
        return img;
    }

    // Создаем HTML-элемент h2 для названия рецепта
    addTitleToCard() {
        let h2 = document.createElement("h2");
        h2.classList.add("result__title");
        h2.innerText = this.label;
        return h2;
    }

    // Создаем HTML-элемент a (ссылку) для перехода к странице рецепта
    addLinkToCard() {
        let a = document.createElement("a");
        a.classList.add("result__link");
        a.innerText = "Show more";
        a.href =
            RecipeCard.recipePage +
            "?id=" +
            this.uri.slice(this.uri.indexOf("#") + 1);
        return a;
    }

    // Собираем все созданные элементы в одну карточку и возвращаем ее
    renderCard() {
        let card = this.createCard();
        card.appendChild(this.addImageToCard());
        card.appendChild(this.addTitleToCard());
        card.appendChild(this.addLinkToCard());
        return card;
    }
}

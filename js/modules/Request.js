// Экспорт класса Request
export class Request {
    // Статические поля класса, содержащие информацию, необходимую для отправки запросов к API
    static BASE_URL = 'https://api.edamam.com/api/recipes/v2';
    static APP_ID = '245e6f9e';
    static APP_KEY = 'fa92e2d5e8a3ba23e1c675a425407911';
    static GET_PARAMS = `?type=public&app_id=${Request.APP_ID}&app_key=${Request.APP_KEY}`

    // Конструктор класса, который принимает параметры запроса
    constructor(query, type) {
        // Параметр `type` опционален, и если он предоставлен, то query будет иметь вид `type=query`
        // Если `type` не предоставлен, то query останется неизменным
        this.query = type ? `${type}=${query}` : query
    }

    // Асинхронный метод для отправки запроса к API
    async sendRequest() {
        let endPoint;
        // Если query начинается с 'q', то используется формат URL для поискового запроса
        if(this.query.startsWith('q')) {
            endPoint = `${Request.BASE_URL}${Request.GET_PARAMS}&${this.query}`
            // В противном случае используется формат URL для запроса по идентификатору рецепта
        } else {
            endPoint = `${Request.BASE_URL}/${this.query}${Request.GET_PARAMS}`
        }
        // Отправка запроса и возвращение промиса, который разрешается в данные JSON
        return await fetch(endPoint).then((response) => response.json())
    }
}

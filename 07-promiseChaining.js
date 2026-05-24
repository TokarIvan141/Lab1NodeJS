// ==================== ЗАВДАННЯ 7.2 ====================
/**
 * Створіть ланцюжок обробки даних користувача:
 * 1. Отримати об'єкт {name: 'john doe', age: 25}
 * 2. Конвертувати name у верхній регістр
 * 3. Додати поле isAdult (age >= 18)
 * 4. Додати поле nameLength
 * * @param {{name: string, age: number}} user
 * @returns {Promise<{name: string, age: number, isAdult: boolean, nameLength: number}>}
 */
function processUser(user) {
    return Promise.resolve(user)
        .then(u => ({ ...u, name: u.name.toUpperCase() }))
        .then(u => ({ ...u, isAdult: u.age >= 18 }))
        .then(u => ({ ...u, nameLength: u.name.length }));
}

// Перевірка:
processUser({ name: 'john doe', age: 25 })
    .then(result => console.log(' Тест 7.2:', result));
// Очікується: { name: 'JOHN DOE', age: 25, isAdult: true, nameLength: 8 }



// ==================== ЗАВДАННЯ 7.4 ====================

function validateNumber(number) {
    if (number < 0) {
        throw new Error('Number must be positive');
    }
    return number;
}

/**
 * Створіть функцію, яка:
 * 1. Валідує число (використовуйте validateNumber)
 * 2. Множить на 2
 * 3. Додає 5
 * 4. Повертає результат у форматі {original: number, result: number}
 * 5. Обробляє помилки та повертає {error: string}
 * * @param {number} number
 * @returns {Promise<{original?: number, result?: number, error?: string}>}
 */
function safeCalculation(number) {
    return Promise.resolve(number)
        .then(num => validateNumber(num))
        .then(num => num * 2)
        .then(num => num + 5)
        .then(result => ({ original: number, result: result }))
        .catch(err => ({ error: err.message }));
}

// Перевірка:
safeCalculation(10)
    .then(result => console.log(' Тест 7.4a:', result));
// Очікується: { original: 10, result: 25 }

safeCalculation(-5)
    .then(result => console.log(' Тест 7.4b:', result));
// Очікується: { error: 'Number must be positive' }

// ==================== БОНУСНЕ ЗАВДАННЯ 7.6 ====================
/**
 * Створіть функцію, яка виконує серію трансформацій над рядком
 * і повертає історію всіх змін
 * * @param {string} text
 * @returns {Promise<{original: string, steps: string[], final: string}>}
 */
function transformWithHistory(text) {
    // Ініціалізуємо об'єкт історії
    const history = {
        original: text,
        steps: [],
        final: ''
    };

    return Promise.resolve(text)
        .then(str => {
            const lower = str.toLowerCase();
            history.steps.push(lower);
            return lower;
        })
        .then(str => {
            const noSpaces = str.replace(/\s+/g, '');
            history.steps.push(noSpaces);
            return noSpaces;
        })
        .then(str => {
            const inverted = str.split('').reverse().join('');
            history.steps.push(inverted);
            history.final = inverted;
            return history;
        });
}

// Перевірка:
transformWithHistory('Hello World')
    .then(result => console.log(' Тест 7.6:', result));
// Очікується: {
//   original: 'Hello World',
//   steps: ['hello world', 'helloworld', 'dlrowolleh'],
//   final: 'dlrowolleh'
// }
// ==================== ЗАВДАННЯ 2.3 ====================
/**
 * Створіть функцію, яка конвертує об'єкт користувача
 * додаючи йому поле fullName
 *
 * @param {{firstName: string, lastName: string}} user
 * @returns {Promise<{firstName: string, lastName: string, fullName: string}>}
 */
function addFullName(user) {
    return Promise.resolve({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`
    });
}

// Перевірка:
addFullName({ firstName: 'John', lastName: 'Doe' })
    .then(user => console.log(' Тест 2.3:', user));
// Очікується: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe' }


// ==================== ЗАВДАННЯ 2.4 ====================
/**
 * Створіть функцію, яка приймає проміс або звичайне значення
 * і завжди повертає проміс
 * Підказка: Promise.resolve() може приймати вже існуючий проміс
 * 
 * @param {any} value 
 * @returns {Promise<any>}
 */
function ensurePromise(value) {
    return Promise.resolve(value);
}

// Перевірка:
ensurePromise(42)
    .then(val => console.log(' Тест 2.4a:', val)); // 42

ensurePromise(Promise.resolve(100))
    .then(val => console.log(' Тест 2.4b:', val)); // 100


// ==================== ЗАВДАННЯ 2.5 ====================
/**
 * Створіть функцію для конвертації callback-based функції в проміс
 * Функція має приймати значення та callback(error, result)
 * Поверніть проміс, який резолвиться з результатом
 * 
 * @param {any} value 
 * @returns {Promise<string>}
 */
function callbackToPromise(value) {
    return new Promise((resolve, reject) => {
        const fakeCallback = (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        };

        setTimeout(() => {
            fakeCallback(null, 'Processed: ' + value);
        }, 100);
    });
}

// Перевірка:
callbackToPromise('test')
    .then(result => console.log(' Тест 2.5:', result));
// Очікується: 'Processed: test'




/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Яка різниця між new Promise(resolve => resolve(value)) та Promise.resolve(value)?
 * 2. Що поверне Promise.resolve(Promise.resolve(5))?
 * 3. Чи можна передати проміс в Promise.resolve()?
 * 4. Чи є Promise.resolve() синхронним чи асинхронним?
 * 5. Коли краще використовувати Promise.resolve() замість конструктора?
 */

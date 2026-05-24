// ==================== ЗАВДАННЯ 1.3 ====================
/**
 * Створіть проміс з валідацією email
 * Якщо email містить @ та . - resolve з email
 * Інакше - reject з повідомленням про помилку
 * 
 * @param {string} email 
 * @returns {Promise<string, string>}
 */
function validateEmail(email) {
    return new Promise((resolve, reject) => {
        if (email.includes('@') && email.includes('.')) {
            resolve(email);
        } else {
            reject('Invalid email format');
        }
    });
}

// Перевірка:
validateEmail('test@example.com')
    .then(email => console.log(' Тест 1.3 (валідний):', email))
    .catch(err => console.log('   Помилка:', err));

validateEmail('invalid-email')
    .then(email => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.3 (невалідний):', err));


// ==================== ЗАВДАННЯ 1.4 ====================
/**
 * Створіть проміс, який симулює авторизацію користувача
 * - Якщо username та password не порожні - resolve з об'єктом користувача
 * - Якщо username порожній - reject з 'Username is required'
 * - Якщо password порожній - reject з 'Password is required'
 * - Якщо password коротший за 6 символів - reject з 'Password too short'
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{username: string, authenticated: boolean}, string>}
 */
function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        if (!username) {
            reject('Username is required');
        } else if (!password) {
            reject('Password is required');
        } else if (password.length < 6) {
            reject('Password too short');
        } else {
            resolve({ username: username, authenticated: true });
        }
    });
}

// Перевірка:
authenticateUser('john', 'password123')
    .then(user => console.log(' Тест 1.4 (успіх):', user))
    .catch(err => console.log('   Помилка:', err));

authenticateUser('', 'password123')
    .then(user => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (немає username):', err));

authenticateUser('john', '12345')
    .then(user => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (короткий пароль):', err));


// ==================== ЗАВДАННЯ 1.5 ====================
/**
 * Створіть функцію, яка перевіряє вік користувача
 * - age < 0: reject 'Invalid age'
 * - age < 18: reject 'Too young'
 * - age >= 18 та age < 65: resolve {age, category: 'adult'}
 * - age >= 65: resolve {age, category: 'senior'}
 * 
 * @param {number} age 
 * @returns {Promise<{age: number, category: string}, string>}
 */
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age < 0) {
            reject('Invalid age');
        } else if (age < 18) {
            reject('Too young');
        } else if (age >= 18 && age < 65) {
            resolve({ age: age, category: 'adult' });
        } else {
            resolve({ age: age, category: 'senior' });
        }
    });
}

// Перевірка (розкоментуйте після реалізації):
checkAge(25).then(console.log).catch(console.error);
checkAge(70).then(console.log).catch(console.error);
checkAge(15).then(console.log).catch(console.error);
checkAge(-5).then(console.log).catch(console.error);


/**
 * ПИТАННЯ ДЛЯ САМОПЕРЕВІРКИ:
 * 
 * 1. Що таке executor function в Promise конструкторі?
 * 2. Чи можна викликати resolve/reject більше одного разу?
 * 3. Що станеться якщо викликати і resolve, і reject?
 * 4. Чи виконується код після resolve/reject в executor?
 * 5. Яка різниця між throw new Error() та reject() в промісі?
 */

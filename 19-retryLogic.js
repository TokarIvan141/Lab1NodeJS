// ==================== ЗАВДАННЯ 19.1 ====================
/**
 * Створіть простий retry механізм
 * * @param {Function} fn - Асинхронна функція для виконання
 * @param {number} maxRetries - Максимальна кількість спроб
 * @returns {Promise}
 */
function retry(fn, maxRetries) {
    return fn().catch(error => {

        if (maxRetries > 0) {
            return retry(fn, maxRetries - 1);
        }

        return Promise.reject(error);
    });
}

// Перевірка:
let attempt1 = 0;
function unreliableFunction() {
    attempt1++;
    if (attempt1 < 3) {
        return Promise.reject(new Error('Failed'));
    }
    return Promise.resolve('Success on attempt ' + attempt1);
}

retry(unreliableFunction, 5)
    .then(result => console.log(' Тест 19.1:', result));
// Очікується: 'Success on attempt 3'


// ==================== ЗАВДАННЯ 19.3 ====================

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * @param {Function} fn
 * @param {number} maxRetries
 * @param {Function} shouldRetry - Функція, яка визначає чи робити retry
 * @returns {Promise}
 */
function conditionalRetry(fn, maxRetries, shouldRetry) {
    return fn().catch(error => {
        // Повторюємо ТІЛЬКИ якщо є спроби І функція shouldRetry повертає true
        if (maxRetries > 0 && shouldRetry(error)) {
            return conditionalRetry(fn, maxRetries - 1, shouldRetry);
        }
        // В іншому випадку одразу повертаємо помилку (наприклад, ValidationError)
        return Promise.reject(error);
    });
}

// Перевірка:
let attempt3 = 0;
function apiWithDifferentErrors() {
    attempt3++;
    if (attempt3 === 1) {
        return Promise.reject(new NetworkError('Connection failed'));
    }
    if (attempt3 === 2) {
        return Promise.reject(new ValidationError('Invalid data'));
    }
    return Promise.resolve('Success');
}

conditionalRetry(
    apiWithDifferentErrors,
    5,
    (error) => error.name === 'NetworkError'
)
    .catch(error => console.log(' Тест 19.3:', error.name));
// Очікується: ValidationError (не робимо retry для цієї помилки)


// ==================== ЗАВДАННЯ 19.6 ====================

class RateLimitError extends Error {
    constructor(retryAfter) {
        super('Rate limit exceeded');
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter; // seconds
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
    }
}

/**
 * @param {Function} fn
 * @param {number} maxRetries
 * @param {number} currentAttempt - внутрішній лічильник для обчислення затримки
 * @returns {Promise}
 */
function smartRetry(fn, maxRetries, currentAttempt = 1) {
    return fn().catch(error => {
        if (maxRetries <= 0) {
            return Promise.reject(error);
        }

        if (error.name === 'RateLimitError') {
            // Для RateLimitError: чекаємо вказану кількість секунд
            const delayMs = error.retryAfter * 1000;
            return new Promise(resolve => setTimeout(resolve, delayMs))
                .then(() => smartRetry(fn, maxRetries - 1, currentAttempt + 1));

        } else if (error.name === 'ServerError') {
            // Для ServerError: експоненційна затримка (100ms, 200ms, 400ms...)
            const delayMs = 100 * Math.pow(2, currentAttempt - 1);
            return new Promise(resolve => setTimeout(resolve, delayMs))
                .then(() => smartRetry(fn, maxRetries - 1, currentAttempt + 1));

        } else {
            // Для всіх інших помилок не робимо retry
            return Promise.reject(error);
        }
    });
}

// Перевірка:
let attempt6 = 0;
function smartAPI() {
    attempt6++;
    if (attempt6 === 1) {
        return Promise.reject(new RateLimitError(1));
    }
    if (attempt6 === 2) {
        return Promise.reject(new ServerError('Server overload'));
    }
    if (attempt6 === 3) {
        return Promise.resolve('Success!');
    }
}

smartRetry(smartAPI, 5)
    .then(result => console.log(' Тест 19.6:', result));
// Очікується спочатку невелика пауза (1с), потім ще одна (100мс), і результат: 'Success!'
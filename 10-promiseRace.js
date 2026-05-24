// ==================== ЗАВДАННЯ 10.2 ====================
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });

    return Promise.race([promise, timeout]);
}

// Перевірка:
const slowPromise = new Promise(resolve => setTimeout(() => resolve('Done'), 2000));
const fastPromise = new Promise(resolve => setTimeout(() => resolve('Done'), 500));

withTimeout(fastPromise, 1000)
    .then(result => console.log(' Тест 10.2a:', result)); // 'Done'

withTimeout(slowPromise, 1000)
    .catch(error => console.log(' Тест 10.2b:', error.message)); // 'Timeout'


// ==================== ЗАВДАННЯ 10.5 ====================
function primaryServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Primary data'), 2000);
    });
}

function backupServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Backup data'), 500);
    });
}

function getDataWithFallback() {
    // Створюємо мітку таймауту, яка спрацює через 1000мс
    const timeoutSignal = new Promise(resolve =>
        setTimeout(() => resolve({ isTimeout: true }), 1000)
    );

    return Promise.race([
        primaryServer().then(data => ({ source: 'primary', data })),
        timeoutSignal
    ]).then(result => {
        // Якщо першим "прийшов" таймаут, викликаємо резервний сервер
        if (result.isTimeout) {
            return backupServer().then(data => ({ source: 'backup', data }));
        }
        // Якщо встиг основний сервер - повертаємо його дані
        return result;
    });
}

// Перевірка:
getDataWithFallback()
    .then(result => console.log(' Тест 10.5:', result));
// Очікується: { source: 'backup', data: 'Backup data' }
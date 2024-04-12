const request = require('supertest');
const assert = require('assert');

const api = request('https://petstore.swagger.io/v2');

// Первый тест: Проверка наличия информации о питомце по ID
api.get('/pet/2147483647')
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        assert(res.body.id === 2147483647); 
        console.log('Test 1 passed');
    });

// Негативный тест: Попытка получения информации о несуществующем питомце
api.get('/pet/2131245125') 
    .expect(404) 
    .end(function (err, res) {
        if (err) throw err;
        console.log('Negative test 1 passed: Pet not found');
    });

// Edge Case тест: Запрос на получение информации о питомце с максимальным ID
api.get('/pet/2147483647') // Max value in js
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        console.log('Edge Case test 1 passed: Max ID');
    });



// Второй тест: Проверка добавления нового питомца с проверкой имени и статуса
const newPet = {
    id: 10001,
    category: {
        id: 0,
        name: "Nekko"
    },
    name: "doggie",
    tags: [{
        id: 10001,
        name: "Murt"
    }],
    status: 'available'
};

api.post('/pet')
    .send(newPet)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        assert(res.body.id === 10001);
        assert(res.body.name === newPet.name); 
        assert(res.body.status === newPet.status);
        console.log('Test 2 passed');
    });


// Edge Case тест: Попытка добавления питомца с максимальным ID
const maxIdPet = {
    id: 2147483647,
    category: {
        id: 0,
        name: "Nekko"
    },
    name: "doggie",
    tags: [{
        id: 10002,
        name: "Murt"
    }],
    status: 'available'
};

api.post('/pet')
    .send(maxIdPet)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        console.log('Edge Case test 2 passed: Max ID pet added');
    });
    


// Третий тест: Обновление информации о питомце
const updatedPet = {
    id: 10001,
    category: {
        id: 0,
        name: "Nekko"
    },
    name: "doggie",
    tags: [{
        id: 10001,
        name: "Murt"
    }],
    status: 'sold'
};

api.put('/pet')
    .send(updatedPet)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        assert(res.body.id === 10001);
        assert(res.body.status === 'sold');
        console.log('Test 3 passed');
    });


// Edge Case тест: Попытка обновления информации о питомце с максимальным ID
const maxIdUpdatedPet = {
    id: 2147483647,
    category: {
        id: 0,
        name: "Nekko"
    },
    name: "doggie",
    tags: [{
        id: 10001,
        name: "Murt"
    }],
    status: 'sold'
};

api.put('/pet')
    .send(maxIdUpdatedPet)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        console.log('Edge Case test 3 passed: Max ID pet updated');
    });


// Четвёртый тест: Удаление питомца
const petIdToDelete = 10001;

api.delete(`/pet/${petIdToDelete}`)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        assert(res.body.code === 200);
        console.log('Test 4 passed');
    });

// Негативный тест: Попытка удаления питомца с несуществующим ID
const nonExistentPetId = 543135;
api.delete(`/pet/${nonExistentPetId}`)
    .expect(404)
    .end(function (err, res) {
        if (err) throw err;
        console.log('Negative test 4 passed: Pet not found');
    });


//  
const statusToFind = 'available'; // Может быть 'available', 'pending' или 'sold'

api.get(`/pet/findByStatus?status=${statusToFind}`)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        const pets = res.body;
        pets.forEach(pet => {
            assert(pet.status === statusToFind);
        });
        console.log('Test 5 passed');
    });

// Edge Case тест: Попытка поиска питомца по статусу, когда возвращается пустой список питомцев
const emptyStatusToFind = 'nonexistent';
api.get(`/pet/findByStatus?status=${emptyStatusToFind}`)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        assert(Array.isArray(res.body) && res.body.length === 0);
        console.log('Edge Case test 5 passed: Empty status');
    });


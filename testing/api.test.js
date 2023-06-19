const request = require('supertest');
const app = require('../main.js');
const db = require('../connect.js');

describe('GET /find?page=1&size=3', () => {
    it('Return all mahasiswa', async () => {
        const response = await request(app).get('/find?page=1&size=3');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            payload: {
                data: [
                    { ID: 1, NIM: 1220028, Nama: "Frico", Angkatan: 2020, Jurusan: "SI" },
                    { ID: 2, NIM: 1220012, Nama: "Philip", Angkatan: 2020, Jurusan: "SI" },
                    { ID: 3, NIM: 1220002, Nama: "Juhendi", Angkatan: 2020, Jurusan: "SI" },
                ],
                message: "success",
                page: "1",
                size: "3",
                statuscode: 200,
            },
        });
    });
});

describe('GET /find/1', () => {
    it('Return mahasiswa by id', async () => {
        const response = await request(app).get('/find/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            payload: {
                data: [
                    { ID: 1, NIM: 1220028, Nama: "Frico", Angkatan: 2020, Jurusan: "SI" }
                ],
                message: "success",
                page: 1,
                size: 10,
                statuscode: 200,
            },
        });
    });
});

afterAll(() => {
    db.end();
});

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

describe('GET /find/name/Frico', () => {
    it('Return mahasiswa by name', async () => {
        const response = await request(app).get('/find/name/Frico');
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
        })
    })
})

describe('POST /login', () => {
    it('Return login successfull', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                nim: 1220028, nama: "Frico"
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            payload: {
                data: { nim: 1220028, nama: "Frico" },
                message: "Login successfully",
                statuscode: 200,
            },
        })
    })
})

describe('POST /input', () => {
    it('Return Data received successfully', async () => {
        const response = await request(app)
            .post("/input")
            .send({
                nim: 1220059,
                nama: "Cyn",
                angkatan: 2025,
                jurusan: "OLB"
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            payload: {
                data: {
                    nim: 1220059,
                    nama: "Cyn",
                    angkatan: 2025,
                    jurusan: "OLB"
                },
                statuscode: 200,
                message: "Data received successfully"
            }
        })
    })
})

describe('DELETE /delete', () => {
    it('Return delete successfull', async () => {
        const response = await request(app)
            .delete('/delete')
            .send({
                nim: 1220059
            });
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            payload: {
                data: { affectedRows: 1 },
                message: "deleted successfully",
                statuscode: 200,
            },
        })
    })
})

afterAll(() => {
    db.end();
});

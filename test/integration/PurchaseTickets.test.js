import supertest from "supertest";
import app from "../../src/server.js";

const request = supertest(app)

describe('POST /tickets', () =>{
    test('responds with json', async () =>{
        const bodyObj={
            accountInfo: {
                id: 1
            },
            tickets: {
                ADULT: 2,
                INFANT: 18
            }
            }
        await request
            .post('/tickets')
            .send(bodyObj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    test('responds with error message when account id is missing', async () =>{
        const bodyObj={
            accountInfo: {
                id: null
            },
            tickets: {
                ADULT: 2,
                INFANT: 18
            }
            }
        await request
            .post('/tickets')
            .send(bodyObj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res =>{
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        status:400,
                        message: "no account id included"
                    })
                )
            })
    });

    test('responds with error message when tickets are missing', async () =>{
        const bodyObj={
            accountInfo: {
                id: 1
            },
            tickets: {
            }
            }
        await request
            .post('/tickets')
            .send(bodyObj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res =>{
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        status:400,
                        message: "no tickets being purchased"
                    })
                )
            })
    });
});

describe('POST to unknown route',()=>{
    test('test', async () =>{
        const bodyObj={
            accountInfo: {
                id: null
            },
            tickets: {
                ADULT: 2,
                INFANT: 18
            }
            }
        await request
            .post('/222')
            .send(bodyObj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then(res =>{
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status:404,
                        message: "not found"
                    })
                )
            })
    })
})
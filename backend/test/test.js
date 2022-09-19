// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const e = require('express');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

let valid_review = {
    module: "CS2103T",
    ay: "20/21",
    semester: "Sem 1",
    description: "This module is very interesting.",
    expected: "A+",
    grade: "A+",
    rating: 1,
    submitter: "John Doe"
}

let valid_updated_review = {
    module: "CS2103T",
    ay: "20/21",
    semester: "Sem 1",
    description: "This module is very interesting.",
    expected: "A+",
    grade: "A+",
    rating: 1,
    submitter: "John Doe <3"
}

let invalid_missing_module_review = {
    module: "",
    ay: "20/21",
    semester: "Sem 1",
    description: "This module is very interesting.",
    expected: "A+",
    grade: "A+",
    rating: 1,
    submitter: "John Doe"
}

let invalid_incorrect_ay_format_review = {
    module: "CS2103T",
    ay: "2021",
    semester: "Sem 1",
    description: "This module is very interesting.",
    expected: "A+",
    grade: "A+",
    rating: 1,
    submitter: "John Doe"
}

let invalid_incorrect_grade_review = {
    module: "CS2103T",
    ay: "20/21",
    semester: "Sem 1",
    description: "This module is very interesting.",
    expected: "A+",
    grade: "C-",
    rating: 1,
    submitter: "John Doe"
}

describe("Reviews", () => {

    describe("POST", () => {
        // Post valid data
        it("[VALID POST] Post review with correctly filled fields", (done) => {
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('module');
                    res.body.should.have.property('ay');
                    res.body.should.have.property('semester');
                    res.body.should.have.property('description');
                    res.body.should.have.property('expected');
                    res.body.should.have.property('grade');
                    res.body.should.have.property('rating');
                    res.body.should.have.property('submitter');
                done();
                });
        });

        // Post invalid data
        it("[INVALID POST] Post review with missing module field", (done) => {
            chai.request(app)
                .post('/api/reviews')
                .send(invalid_missing_module_review)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Module code cannot be empty!');
                done();
                });
        });

        it("[INVALID POST] Post review with wrong ay format", (done) => {
            chai.request(app)
                .post('/api/reviews')
                .send(invalid_incorrect_ay_format_review)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Academic year must be in the format of xx/xx, e.g. 22/23');
                done();
                });
        });

        it("[INVALID POST] Post review with incorrect letter grade", (done) => {
            chai.request(app)
                .post('/api/reviews')
                .send(invalid_incorrect_grade_review)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('C- is an invalid letter grade. It should be one of the following: A+/A/A-/B+/B/B-/C+/C/D+/D/F');
                done();
                });
        });
    })
    describe("GET", () => {
        // Get all reviews
        it("[VALID GET] Get all reviews", (done) => {
            chai.request(app)
                .get('/api/reviews')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        
        // Get review with valid id
        it("[VALID GET] Get review by id", (done) => {
            let valid_id = 0;
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    valid_id = res.body.id;
                    chai.request(app)
                        .get('/api/reviews/' + valid_id)
                        .end((err, res) => {
                        res.should.have.status(200);
                        })
                });
            done();
        });

        // Get review with invalid id
        it("[INVALID GET] Get review by invalid id", (done) => {
            let invalid_id = 9999999999999;
            chai.request(app)
                .get('/api/reviews/' + invalid_id)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql(`Review with id ${invalid_id} not found!`);
                done();
                });
        });
    });
    describe("PUT", () => {
        // Update review with id
        it("[VALID PUT] Update review with id", (done) => {
            let valid_id = 0;
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    valid_id = res.body.id;
                    chai.request(app)
                        .put('/api/reviews/' + valid_id)
                        .send(valid_updated_review)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
                            res.body.message.should.be.eql(`Review with id ${valid_id} was updated successfully.`);
                        })
                });
            done();
        });
        // Update review with invalid id
        it("[INVALID PUT] Update review with invalid id", (done) => {
            let invalid_id = 9999999999999;
            chai.request(app)
                .put('/api/reviews/' + invalid_id)
                .send(valid_updated_review)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql(`Review with id ${invalid_id} was not found!`);
                    done();
                });
        });

        // Update review with valid id but missing moduke
        it("[INVALID PUT] Update review with valid id but missing module", (done) => {
            let valid_id = 0;
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    valid_id = res.body.id;
                    chai.request(app)
                        .put('/api/reviews/' + valid_id)
                        .send(invalid_missing_module_review)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
                            res.body.message.should.be.eql('Module code cannot be empty!');
                        })
                });
            done();
        });

        // Update review with valid id but wrong ay format
        it("[INVALID PUT] Update review with valid id but wrong ay format", (done) => {
            let valid_id = 0;
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    valid_id = res.body.id;
                    chai.request(app)
                        .put('/api/reviews/' + valid_id)
                        .send(invalid_incorrect_ay_format_review)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
                            res.body.message.should.be.eql('Academic year must be in the format of xx/xx, e.g. 22/23');
                        })
                });
            done();
        });

        //Update review with valid id but wrong letter grade
        it("[INVALID PUT] Update review with valid id but wrong letter grade", (done) => {
            let valid_id = 0;
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    valid_id = res.body.id;
                    chai.request(app)
                        .put('/api/reviews/' + valid_id)
                        .send(invalid_incorrect_grade_review)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
                            res.body.message.should.be.eql('C- is an invalid letter grade. It should be one of the following: A+/A/A-/B+/B/B-/C+/C/D+/D/F');
                        })
                });
            done();
        });
    }); 

    describe("DELETE", () => {
        // Delete review by id
        it("[VALID DELETE] Delete review by id", (done) => {
            let valid_id = 0;
            chai.request(app)
                .post('/api/reviews')
                .send(valid_review)
                .end((err, res) => {
                    res.should.have.status(200);
                    valid_id = res.body.id;
                    chai.request(app)
                        .delete('/api/reviews/' + valid_id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
                            res.body.message.should.be.eql(`Review with id ${valid_id} was deleted successfully!`);
                        })
                });
            done();
        });
        // Delete review by id
        it("[INVALID DELETE] Delete review by invalid id", (done) => {
            let invalid_id = 9999999999999;
            chai.request(app)
                .delete('/api/reviews/' + invalid_id)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql(`Review with id ${invalid_id} was not found!`);
                    done();
                });
        });

        it("Delete all reviews", (done) => {
            chai.request(app)
                .delete('/api/reviews')
                .end((err, res) => {
                    res.should.have.status(200);
                });
            done();
        });
    });
});

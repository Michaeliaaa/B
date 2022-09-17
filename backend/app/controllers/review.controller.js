const db = require("../models");
const review = db.reviews;

// Create and Save a new review
exports.create = (req, res) => {
  // Validate request
  if (!req.body.module) {
    res.status(400).send({ message: "Module code cannot be empty!" });
    return;
  }

  if (!req.body.ay) {
    res.status(400).send({ message: "Academic year cannot be empty!" });
    return;
  }

  if (!req.body.semester) {
    res.status(400).send({ message: "Academic semester cannot be empty!" });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({ message: "Description cannot be empty!" });
    return;
  }

  if (!req.body.expected) {
    res.status(400).send({ message: "Expected grade cannot be empty!" });
    return;
  }

  if (!req.body.grade) {
    res.status(400).send({ message: "Actual grade cannot be empty!" });
    return;
  }

  if (!req.body.rating) {
    res.status(400).send({ message: "Rating cannot be empty!" });
    return;
  }

  if (!req.body.submitter) {
    res.status(400).send({ message: "Submitter cannot be empty! Please provide a nickname." });
    return;
  }

  if (!(/^\d{2}\/\d{2}$/).test(req.body.ay)) {
    res.status(400).send({ message: "Academic year must be in the format of xx/xx, e.g. 22/23" });
    return;
  }

  if (!(req.body.semester == "Sem 1" || req.body.semester == "Sem 2" || req.body.semester == "ST I" || req.body.semester == "ST II")) {
    res.status(400).send({ message: "Invalid semester. It should be one of the following: Sem 1/Sem 2/ST I/ST II" });
  }
  
  if (!(req.body.expected == "A+" || req.body.expected == "A" || req.body.expected == "A-" ||
    req.body.expected == "B+" || req.body.expected == "B" || req.body.expected == "B-" ||
    req.body.expected == "C+" || req.body.expected == "C" ||
    req.body.expected == "D+" || req.body.expected == "D" ||
    req.body.expected == "F")) {
    res.status(400).send({ message: `${req.body.expected} is an invalid letter grade. It should be one of the following: A+/A/A-/B+/B/B-/C+/C/D+/D/F` });
    return;
  }

  if (!(req.body.grade == "A+" || req.body.grade == "A" || req.body.grade == "A-" ||
    req.body.grade == "B+" || req.body.grade == "B" || req.body.grade == "B-" ||
    req.body.grade == "C+" || req.body.grade == "C" ||
    req.body.grade == "D+" || req.body.grade == "D" ||
    req.body.grade == "F")) {
    res.status(400).send({ message: `${req.body.grade} is an invalid letter grade. It should be one of the following: A+/A/A-/B+/B/B-/C+/C/D+/D/F` });
    return;
  }

  if (!(/^[1-5]$/).test(req.body.rating)) {
    res.status(400).send({ message: "Rating must be a number between 1 and 5." });
    return;
  }

  // Create a review
  const review = new review({
    module: req.body.module,
    ay: req.body.ay,
    semester: req.body.semester,
    description: req.body.description,
    expected: req.body.expected,
    grade: req.body.grade,
    rating: req.body.rating,
    submitter: req.body.submitter,
  });

  // Save review in the database
  review
    .save(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the review."
      });
    });
};

// Retrieve all reviews from the database.
exports.findAll = (req, res) => {
  const module = req.query.module;
  var condition = module ? { module: { $regex: new RegExp(module), $options: "i" } } : {};

  review.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews."
      });
    });
};

// Find a single review with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  review.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "review with id ${id} not found!"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(404)
        .send({ message: `review with id ${id} not found!`});
    });
};

// Update a review by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  if (!req.body.module) {
    res.status(400).send({ message: "Module code cannot be empty!" });
    return;
  }

  if (!req.body.ay) {
    res.status(400).send({ message: "Academic year cannot be empty!" });
    return;
  }

  if (!req.body.semester) {
    res.status(400).send({ message: "Academic semester cannot be empty!" });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({ message: "Description cannot be empty!" });
    return;
  }

  if (!req.body.expected) {
    res.status(400).send({ message: "Expected grade cannot be empty!" });
    return;
  }

  if (!req.body.grade) {
    res.status(400).send({ message: "Actual grade cannot be empty!" });
    return;
  }

  if (!req.body.rating) {
    res.status(400).send({ message: "Rating cannot be empty!" });
    return;
  }

  if (!req.body.submitter) {
    res.status(400).send({ message: "Submitter cannot be empty! Please provide a nickname." });
    return;
  }

  if (!(/^\d{2}\/\d{2}$/).test(req.body.ay)) {
    res.status(400).send({ message: "Academic year must be in the format of xx/xx, e.g. 22/23" });
    return;
  }

  if (!(req.body.semester == "Sem 1" || req.body.semester == "Sem 2" || req.body.semester == "ST I" || req.body.semester == "ST II")) {
    res.status(400).send({ message: "Invalid semester. It should be one of the following: Sem 1/Sem 2/ST I/ST II" });
  }
  
  if (!(req.body.expected == "A+" || req.body.expected == "A" || req.body.expected == "A-" ||
    req.body.expected == "B+" || req.body.expected == "B" || req.body.expected == "B-" ||
    req.body.expected == "C+" || req.body.expected == "C" ||
    req.body.expected == "D+" || req.body.expected == "D" ||
    req.body.expected == "F")) {
    res.status(400).send({ message: `${req.body.expected} is an invalid letter grade. It should be one of the following: A+/A/A-/B+/B/B-/C+/C/D+/D/F` });
    return;
  }

  if (!(req.body.grade == "A+" || req.body.grade == "A" || req.body.grade == "A-" ||
    req.body.grade == "B+" || req.body.grade == "B" || req.body.grade == "B-" ||
    req.body.grade == "C+" || req.body.grade == "C" ||
    req.body.grade == "D+" || req.body.grade == "D" ||
    req.body.grade == "F")) {
    res.status(400).send({ message: `${req.body.grade} is an invalid letter grade. It should be one of the following: A+/A/A-/B+/B/B-/C+/C/D+/D/F` });
    return;
  }

  if (!(/^[1-5]$/).test(req.body.rating)) {
    res.status(400).send({ message: "Rating must be a number between 1 and 5." });
    return;
  }

  const id = req.params.id;

  review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `review with id ${id} was not found!`
        });
      } else res.send({ message: "review was updated successfully." });
    })
    .catch(err => {
      res.status(404).send({
        message: `review with id ${id} was not found!`
      });
    });
};

// Delete a review with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  review.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `review with id ${id} was not found!`
        });
      } else {
        res.send({
          message: "review was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(404).send({
        message: `review with id ${id} was not found!`
      });
    });
};

// Delete all reviews from the database.
exports.deleteAll = (req, res) => {
  review.deleteMany({})
    .then(data => {
      res.send({
        message: `All reviews were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all reviews."
      });
    });
};

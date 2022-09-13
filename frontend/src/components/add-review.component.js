import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    this.onChangeModule = this.onChangeModule.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeExpected = this.onChangeExpected.bind(this);
    this.onChangeGrade = this.onChangeGrade.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeSubmitter = this.onChangeSubmitter.bind(this);
    this.saveReview = this.saveReview.bind(this);
    this.newReview = this.newReview.bind(this);

    this.state = {
      id: null,
      module: "",
      semester: "",
      description: "", 
      expected: "",
      grade: "", 
      rating: "",
      submitter: "",

      submitted: false
    };
  }

  onChangeModule(e) {
    console.log(e);
    this.setState({
      module: e.target.value
    });
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeExpected(e) {
    this.setState({
      expected: e.target.value 
    });
  }

  onChangeGrade(e) {
    this.setState({
      grade: e.target.value 
    });
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    });
  }

  onChangeSubmitter(e) {
    this.setState({
      submitter: e.target.value 
    });
  }

  saveReview() {
    var data = {
      module: this.state.module,
      semester: this.state.semester,
      description: this.state.description,
      expected: this.state.expected,
      grade: this.state.grade,
      rating: this.state.rating,
      submitter: this.state.submitter,
    };

    ReviewDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          module: response.data.module,
          semester: response.data.semester,
          description: response.data.description,
          expected: response.data.expected,
          grade: response.data.grade,
          rating: response.data.rating,
          submitter: response.data.submitter,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newReview() {
    this.setState({
      id: null,
      module: "",
      semester: "",
      description: "",
      expected: "",
      grade: "",
      rating: "",
      submitter: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You had submitted the review successfully!</h4>
            <p>Thank you for contributing your review, your review will help a lot of students who visited this website daily.</p>
            <button className="btn btn-primary" onClick={this.newReview}>
              Add more!
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="module">Module Code:</label>
              <input
                type="text"
                className="form-control"
                id="module"
                required
                value={this.state.module}
                onChange={this.onChangeModule}
                name="module"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="semester">Academic year and semester:</label>
              <input
                type="text"
                className="form-control"
                id="semester"
                required
                value={this.state.semester}
                onChange={this.onChangeSemester}
                name="module"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Thoughts:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="grade">Expected Grade:</label>
              <input
                type="text"
                className="form-control"
                id="expected"
                required
                value={this.state.expected}
                onChange={this.onChangeExpected}
                name="expected"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                className="form-control"
                id="grade"
                required
                value={this.state.grade}
                onChange={this.onChangeGrade}
                name="grade"
              />
            </div>
              
            <div className="form-group">
              <label htmlFor="rating">Rating out of 5:</label>
              <input
                type="text"
                className="form-control"
                id="rating"
                required
                value={this.state.rating}
                onChange={this.onChangeRating}
                name="rating"
              />
              </div>
              
            <div className="form-group">
              <label htmlFor="submitter">Nickname:</label>
              <input
                type="text"
                className="form-control"
                id="submitter"
                required
                value={this.state.submitter}
                onChange={this.onChangeSubmitter}
                name="submitter"
              />
            </div>
              
            <button onClick={this.saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.onChangeModule = this.onChangeModule.bind(this);
    this.onChangeAY = this.onChangeAY.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeExpected = this.onChangeExpected.bind(this);
    this.onChangeGrade = this.onChangeGrade.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeSubmitter = this.onChangeSubmitter.bind(this);
    this.getReview = this.getReview.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.deleteReview = this.deleteReview.bind(this);

    this.state = {
      currentReview: {
        id: null,
        module: "",
        ay:"",
        semester: "",
        description: "",
        expected: "",
        grade: "",
        rating: "",
        submitter: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getReview(this.props.match.params.id);
  }

  onChangeModule(e) {
    const module = e.target.value;

    this.setState(function(prevState) {
      return {
        currentReview: {
          ...prevState.currentReview,
          module: module
        }
      };
    });
  }

  onChangeAY(e) {
    const ay = e.target.value;

    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        ay: ay
      }
    }));
  }

  onChangeSemester(e) {
    const semester = e.target.value;

    this.setState(function(prevState) {
      return {
        currentReview: {
          ...prevState.currentReview,
          semester: semester
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        description: description
      }
    }));
  }

  onChangeExpected(e) {
    const expected = e.target.value;
    
    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        expected: expected
      }
    }));
  }

  onChangeGrade(e) {
    const grade = e.target.value;
    
    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        grade: grade
      }
    }));
  }

  onChangeRating(e) {
    const rating = e.target.value;

    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        rating: rating
      }
    }));
  }

  onChangeSubmitter(e) {
    const submitter = e.target.value;
    
    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        submitter: submitter
      }
    }));
  }

  getReview(id) {
    ReviewDataService.get(id)
      .then(response => {
        this.setState({
          currentReview: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateReview() {
    ReviewDataService.update(
      this.state.currentReview.id,
      this.state.currentReview
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The review is updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteReview() {    
    ReviewDataService.delete(this.state.currentReview.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/reviews')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentReview } = this.state;

    return (
      <div>
        {currentReview ? (
          <div className="edit-form">
            <h4>Review</h4>
            <form>
              <div className="form-group">
                <label htmlFor="module">Module</label>
                <input
                  type="text"
                  className="form-control"
                  id="module"
                  value={currentReview.module}
                  onChange={this.onChangeModule}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ay">Academic Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="ay"
                  value={currentReview.ay}
                  onChange={this.onChangeAY}
                />
              </div>
              <div className="form-group">
                <label htmlFor="module">Semester</label>
                <input
                  type="text"
                  className="form-control"
                  id="semester"
                  value={currentReview.semester}
                  onChange={this.onChangeSemester}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentReview.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expected">Expected Grade</label>
                <input
                  type="text"
                  className="form-control"
                  id="expected"
                  value={currentReview.expected}
                  onChange={this.onChangeExpected}
                />
              </div>
              <div className="form-group">
                <label htmlFor="grade">Grade</label>
                <input
                  type="text"
                  className="form-control"
                  id="grade"
                  value={currentReview.grade}
                  onChange={this.onChangeGrade}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Difficulty Rating, out of 5:</label>
                <input
                  type="text"
                  className="form-control"
                  id="rating"
                  value={currentReview.rating}
                  onChange={this.onChangeRating}
                />
              </div>
              <div className="form-group">
                <label htmlFor="submitter">Submitted by</label>
                <input
                  type="text"
                  className="form-control"
                  id="submitter"
                  value={currentReview.submitter}
                  onChange={this.onChangeSubmitter}
                />
              </div>
            </form>

            <h5>
              <button
                className="badge badge-danger mr-2"
                onClick={this.deleteReview}
              >
                Delete
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateReview}
              >
                Update
              </button>

            </h5>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

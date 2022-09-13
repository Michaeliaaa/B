import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class ReviewsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchModule = this.onChangeSearchModule.bind(this);
    this.retrieveReviews = this.retrieveReviews.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveReview = this.setActiveReview.bind(this);
    this.removeAllReviews = this.removeAllReviews.bind(this);
    this.searchModule = this.searchModule.bind(this);

    this.state = {
      reviews: [],
      currentReview: null,
      currentIndex: -1,
      searchModule: ""
    };
  }

  componentDidMount() {
    this.retrieveReviews();
  }

  onChangeSearchModule(e) {
    const searchModule = e.target.value;

    this.setState({
      searchModule: searchModule
    });
  }

  retrieveReviews() {
    ReviewDataService.getAll()
      .then(response => {
        this.setState({
          reviews: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveReviews();
    this.setState({
      currentReview: null,
      currentIndex: -1
    });
  }

  setActiveReview(review, index) {
    this.setState({
      currentReview: review,
      currentIndex: index
    });
  }

  removeAllReviews() {
    ReviewDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchModule() {
    this.setState({
      currentReview: null,
      currentIndex: -1
    });

    ReviewDataService.findByModule(this.state.searchModule)
      .then(response => {
        this.setState({
          reviews: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchModule, reviews, currentReview, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by module code"
              value={searchModule}
              onChange={this.onChangeSearchModule}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.searchModule}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <br></br>
          <h3>Latest Reviews</h3>
          {reviews.length > 0 ? (
            <ul className="list-group">
            {reviews &&
              reviews.map((review, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveReview(review, index)}
                  key={index}
                >
                  {review.module}
                </li>
              ))}
          </ul>
          ) : (
            <p>Currently, there are no reviews here. Feel free to add one!</p>
          )}
        </div>
        <div className="col-md-6">
          {currentReview ? (
            <div>
              <br></br>
              <h3>
                <u>Review of {currentReview.module} by {currentReview.submitter}</u>
              </h3>
              <div>
                <label>
                  <strong>Academic Year:</strong>
                </label>{" "}
                {currentReview.ay}
              </div>
              <div>
                <label>
                  <strong>Semester:</strong>
                </label>{" "}
                {currentReview.semester}
              </div>
              <div>
                <label>
                  <strong>Thoughts:</strong>
                </label>{" "}
                {currentReview.description}
              </div>
              <div>
                <label>
                  <strong>Expected grade:</strong>
                </label>{" "}
                {currentReview.expected}
              </div>
              <div>
                <label>
                  <strong>Final grade:</strong>
                </label>{" "}
                {currentReview.grade}
              </div>
              <div>
                <label>
                  <strong>Difficulty Rating, out of 5:</strong>
                </label>{" "}
                {currentReview.rating}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

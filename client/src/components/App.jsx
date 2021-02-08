/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from '../../axios';
import classes from './App.module.css';

import CategoryControl from './categoryButtons/CategoryControl';
import CategoryGraphs from './categoryGraphs/CategoryGraphs';
import UserReviews from './userReviews/UserReviews';
import ShowAll from './showAll/ShowAll';
import ListingHeader from './ListingHeader';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      categories: [
        { title: 'Responsive host', count: 2 },
        { title: 'Helpful host', count: 2 },
        { title: 'Great restaurants', count: 2 },
        { title: 'Easy check-in', count: 4 },
        { title: 'Friendly host', count: 2 },
        { title: 'Great views', count: 1 },
        { title: 'Thoughtful touches', count: 1 },
        { title: 'Great location', count: 1 },
      ],
      reviewRatings: [],
      showModal: false,
      numReviews: undefined,
      overallRatingAvg: undefined,
      categorySelected: {
        title: undefined, count: undefined,
      },
      textSearched: '',
    };

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    axios.get('/')
      .then(({ data }) => {
        const categories = data.reviews.map((review) => review.category);
        const catObj = {};
        const resultCat = [];
        for (let i = 0; i < categories.length; i += 1) {
          const currentCat = categories[i];
          if (catObj[currentCat] === undefined) {
            catObj[currentCat] = 1;
          } else {
            catObj[currentCat] += 1;
          }
        }
        Object.keys(catObj).forEach((cat) => {
          resultCat.push({ title: cat, count: catObj[cat] });
        });

        this.setState({
          reviews: data.reviews,
          reviewRatings: [{ title: 'Accuracy', rating: Number(data.accuracy_rating) },
            { title: 'Check-In', rating: Number(data.check_in_rating) },
            { title: 'Cleanliness', rating: Number(data.cleanliness_rating) },
            { title: 'Communication', rating: Number(data.communication_rating) },
            { title: 'Location', rating: Number(data.location_rating) },
            { title: 'Value', rating: Number(data.value_rating) }],
          categories: resultCat,
          numReviews: data.reviews.length,
          overallRatingAvg: data.overall_rating_avg,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  handleClick() {
    this.setState({
      showModal: true,

    });
  }

  handleSearch(text) {
    this.setState({
      categorySelected: {
        title: undefined, count: undefined,
      },
      textSearched: text,
    });
  }

  handleCategorySelect(event) {
    const { categories } = this.state;

    const categoryIndex = event.target.id;
    const categorySelected = categories[categoryIndex];
    this.setState({
      categorySelected,
      textSearched: '',
    });
    this.handleClick();
  }

  closeModal() {
    document.getElementById('searchBar').reset();
    this.setState({
      showModal: false,
      categorySelected: {
        title: undefined, count: undefined,
      },
      textSearched: '',
    });
  }

  render() {
    let reviewsInModal;
    let numMatchingCriteria;
    let bannerSentence;
    const {
      categorySelected, reviews, overallRatingAvg,
      numReviews, categories, reviewRatings, showModal, textSearched,
    } = this.state;

    if (categorySelected.title) {
      reviewsInModal = reviews.filter((review) => review.category === categorySelected.title);
      numMatchingCriteria = reviewsInModal.length;
      bannerSentence = `Showing ${numMatchingCriteria} reviews with "${categorySelected.title}"`;
    } else if (textSearched !== '') {
      reviewsInModal = reviews.filter((review) => review.body.indexOf(textSearched) !== -1);
      numMatchingCriteria = reviewsInModal.length;
      bannerSentence = `Showing ${numMatchingCriteria} reviews with "${textSearched}"`;
    } else {
      reviewsInModal = reviews;
      bannerSentence = '';
    }

    return (
      <div className={classes.container}>
        <ListingHeader
          overallRatingAvg={overallRatingAvg}
          numReviews={numReviews}
        />
        <div>
          <CategoryGraphs ratings={reviewRatings} isForModal={false} />
          <CategoryControl
            categories={categories}
            clicked={this.handleCategorySelect}
          />
          <UserReviews reviews={reviews} showModal={this.state.showModal} mainPage={true} />

          <ShowAll
            show={showModal}
            close={this.closeModal}
            categorySelected={categorySelected}
            overallRatingAvg={overallRatingAvg}
            numReviews={numReviews}
            highlightWords={this.handleSearch.bind(this)}
            textSearched={this.state.textSearched}
            bannerSentence={bannerSentence}
          >
            <CategoryGraphs ratings={reviewRatings} isForModal />
            <CategoryControl
              categories={categories}
              clicked={this.handleCategorySelect}
            />
            <UserReviews
              reviews={reviewsInModal}
              showModal={this.state.showModal}
              textSearched={this.state.textSearched}
              mainPage={false}
            />
          </ShowAll>

          <button className={classes.showAllBtn} type="button" onClick={this.handleClick.bind(this)}> Show all reviews</button>
        </div>
      </div>
    );
  }
}

export default App;

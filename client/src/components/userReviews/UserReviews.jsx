import React from 'react';
import PropTypes from 'prop-types';
import ReviewRender from './ReviewRender';
import classes from './UserReviews.module.css';

// eslint-disable-next-line react/prop-types
export default function UserReviews({ reviews, textSearched, mainPage }) {
  let itemsArr;
  let highlightText;
  if (mainPage) {
    highlightText = '';
    itemsArr = reviews.slice(0, 6);
  } else {
    highlightText = textSearched;
    itemsArr = reviews;
  }
  const reviewsList = itemsArr.map((review, index) => (
    <ReviewRender
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      reviewBody={review.body}
      profilePicture={review.userpicture}
      firstName={review.username}
      entryDate={review.entry_date}
      userId={review.username}
      hightlightText={highlightText}
    />
  ));

  return (
    <div className={classes.container}>
      {reviewsList}
    </div>
  );
}

UserReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

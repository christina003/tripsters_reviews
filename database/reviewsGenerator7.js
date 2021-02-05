/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const lines = 10000000;
const fileName = path.join(__dirname, 'CSV/reviews7.csv');
const stream = fs.createWriteStream(fileName);
const categories = ['Responsive host', 'Great location', 'Helpful host', 'Comfortable beds', 'Easy check-in', 'Great views', 'A quiet neighborhood', 'Central location', 'Thoughtful touches', 'Friendly host', 'Great restaurants'];
let propid = 6666667;

const createReview = () => {
  const random = Math.floor(Math.random() * (1000 - 1) + 1);
  const fk_id = propid;
  const body = faker.lorem.paragraph();
  const entry_date = faker.date.past();
  const category = categories[Math.floor(Math.random() * 11)];
  const userName = faker.name.firstName();
  const userPicture = `https://reviews-profpictures.s3-us-west-1.amazonaws.com/image${random}.jpg`;
  return `${fk_id}, ${body}, ${entry_date}, ${category}, ${userName}, ${userPicture}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    const canWrite = true;
    do {
      i -= 1;
      const review = createReview();
      if (i === 0) {
        writeStream.write(review, encoding, done);
      } else {
        writeStream.write(review, encoding);
        if (i % 9 === 0 && i !== 19999999) {
          propid += 1;
        }
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

stream.write('fk_id,body,entry_date,category,userName,userPicture\n', 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
});

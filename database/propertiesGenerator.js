/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const lines = 10000000;
const fileName = path.join(__dirname, 'CSV/properties.csv');
const stream = fs.createWriteStream(fileName);

const createProperty = () => {
  const overall_rating_avg = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  const communication_rating = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  const cleanliness_rating = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  const check_in_rating = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  const accuracy_rating = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  const location_rating = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  const value_rating = faker.random.float({ min: 4.0, max: 5.0, precision: 0.1 });
  return `${overall_rating_avg}, ${communication_rating}, ${cleanliness_rating}, ${check_in_rating}, ${accuracy_rating}, ${location_rating}, ${value_rating}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    const canWrite = true;
    do {
      i -= 1;
      const property = createProperty();
      if (i === 0) {
        writeStream.write(property, encoding, done);
      } else {
        writeStream.write(property, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

stream.write('overall_rating_avg,communication_rating,cleanliness_rating,check_in_rating,accuracy_rating,location_rating,value_rating\n', 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
});

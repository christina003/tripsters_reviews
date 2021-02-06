const db = require('../../database/index.js');

const reviews = async (req, res) => {
  const { propertyId } = req.params;
  const dbPropertyQuery = `SELECT * FROM properties WHERE property_id = ${propertyId}`;
  const dbReviewsQuery = `SELECT * FROM reviews WHERE fk_id = ${propertyId}`;

  try {
    const { rows } = await db.query(dbPropertyQuery);
    const allreviews = await db.query(dbReviewsQuery);
    rows[0].reviews = allreviews.rows;
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = reviews;

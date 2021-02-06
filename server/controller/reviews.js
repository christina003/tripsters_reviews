const db = require('../../database/index.js');

const reviews = (req, res) => {
  const { propertyId } = req.params;
  const dbQuery = `SELECT * FROM properties INNER JOIN reviews ON property_id = fk_id WHERE property_id = ${propertyId}`;
  db.query(dbQuery)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => res.status(500).send(err));
};

module.exports = reviews;

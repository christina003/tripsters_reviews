<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/TripstersSDC/Reviews-Service/blob/master/README.md">
  </a>

  <h3 align="center">Tripster's System Design</h3>

  <p align="center">
    <br />
    <a href="https://github.com/christina003/tripsters_reviews"
    ><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Took a legacy codebase designed with a document-based database for storing 1,000 records and adjusted the following:

- Changed from document based database to sql database (PostgreSQL)
- Scaled the amount of records to 10 million primary property records and 60 million secondary review records ** See the Before & After <a href="####Schema">Schema Design </a>below **
- Reduced database query speeds
- Deployed service to AWS on an EC2 instance
- Implemented NGINX Load Balancer and additional EC2 instances
- Stress tested with Loader.io and New Relic

#### Schema

**Prior schema for document database:**

<img src="images/oldSchema.png" alt="old" width="250" height="400">

**Adjusted schema for PostgreSQL database:**

<img src="images/newSchema.png" alt="new" width="350" height="300">

### Built With

- [React](https://reactjs.org/)
- [Express](http://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

<!-- GETTING STARTED -->

## Getting Started

Set-up involves generating & seeding a PostgreSQL database with 70 million records.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/christina003/tripsters_reviews.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create Property Records
   ```sh
   npm run seedProperties
   ```
4. Create Review Records
   ```sh
   npm run seedReview[1-6]
   ```
5. Compile files
   ```sh
   npm run build
   ```
6. Start Server
   ```sh
   npm start
   ```

<!-- CONTACT -->

## Contact

[![Linkedin Badge](https://img.shields.io/badge/-Christina.Santos-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/csantos91/)](https://www.linkedin.com/in/csantos91/)

Project Link: [https://github.com/christina003/tripsters_reviews](https://github.com/christina003/tripsters_reviews)

// Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" });

// Update the price of a specific book
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.99 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "Wuthering Heights" });





// Find books that are both in stock and published after 2010
db.books.find({ 
    in_stock: true,
    published_year: { $gt: 2010 }
  });
  
  // Use projection to return only title, author, and price
  db.books.find(
    { genre: "Fiction" },
    { title: 1, author: 1, price: 1, _id: 0 }
  );
  
  // Implement sorting by price (ascending and descending)
  db.books.find().sort({ price: 1 }); // ascending
  db.books.find().sort({ price: -1 }); // descending
  
  // Implement pagination (5 books per page)
  const page = 1;
  const perPage = 5;
  db.books.find()
    .skip((page - 1) * perPage)
    .limit(perPage);




// Calculate average price by genre
db.books.aggregate([
    {
      $group: {
        _id: "$genre",
        averagePrice: { $avg: "$price" }
      }
    }
  ]);
  
  // Find author with most books
  db.books.aggregate([
    {
      $group: {
        _id: "$author",
        bookCount: { $sum: 1 }
      }
    },
    {
      $sort: { bookCount: -1 }
    },
    {
      $limit: 1
    }
  ]);
  
  // Group books by publication decade and count them
  db.books.aggregate([
    {
      $project: {
        decade: {
          $subtract: [
            "$published_year",
            { $mod: ["$published_year", 10] }
          ]
        }
      }
    },
    {
      $group: {
        _id: "$decade",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);





// Create index on title field
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Demonstrate performance improvement with explain()
// Without index
db.books.find({ title: "1984" }).explain("executionStats");

// With index
// (After creating the index above)
db.books.find({ title: "1984" }).explain("executionStats");
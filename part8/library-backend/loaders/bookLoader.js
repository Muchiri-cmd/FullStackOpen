const DataLoader = require('dataloader')
const Book = require('../models/Book')

//dataloader to batch and cache book count queries
const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },  // Match books for the given author IDs
    { $group: { _id: '$author', count: { $sum: 1 } } } // Group by author and count
  ])

   // Return counts in the same order as the input authorIds
   return authorIds.map(id => {
    const author = counts.find(count => count._id.toString() === id.toString())
    return author ? author.count : 0 // Return count if found, or 0 if no books
  });
})

module.exports = { bookCountLoader };
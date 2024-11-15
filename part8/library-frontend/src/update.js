export const updateCache = (cache, { query }, addedBook) => {
  const uniqueById = (books) => {
    const seen = new Set()
    return books.filter((book) => {
      const id = book.id
      if (seen.has(id)) {
        return false
      }
      seen.add(id)
      return true
    })
  }
  
  cache.updateQuery({ query }, ({ allBooks }) => {
    return {
      allBooks: uniqueById(allBooks.concat(addedBook)),
    }
  })
}
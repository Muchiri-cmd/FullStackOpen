import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
      title,
      published,
      author {
        name
      },
      id,
      genres
  }
`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    id
    born
    bookCount
  }
  `


export const ALL_BOOKS = gql`
  query{
    allBooks {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const FILTERED_BOOKS = gql`
  query allBooks($genre:String!) {
    allBooks(genre:$genre){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
     ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!,$genres: [String!]){
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres,
    ){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const EDIT_BIRTHYEAR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
     ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username:String!, $password:String!) {
    login(username: $username, password:$password) {
      value
    }
  }
`

export const GETFAVOURITEGENRE = gql`
  query{
    me{
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
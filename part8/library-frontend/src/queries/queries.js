import { gql } from "@apollo/client"


export const ALL_BOOKS = gql`
  query{
    allBooks {
      title,
      published,
      author {
        name
      },
      id,
      genres
    }
  }
`

export const FILTERED_BOOKS = gql`
  query allBooks($genre:String!) {
    allBooks(genre:$genre){
      title,
      published,
      author {
        name
      },
      id,
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!,$genres: [String!]){
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres,
    ){
      title
      published
      author{
        name
      }
      genres
      id
    }
  }
`
export const EDIT_BIRTHYEAR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
      bookCount
    }
  }
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
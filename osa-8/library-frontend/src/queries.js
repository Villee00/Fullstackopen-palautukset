import {gql} from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author{
      name
    }
    genres
  }
`

export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name
      born
      bookCount
    }
  } 
`

export const ALL_BOOKS = gql`
query ($genre: String){
  allBooks (genre: $genre){
    ...BookDetails
  }
}

${BOOK_DETAILS}
`
export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]){
  addBook(
    title:$title,
    published: $published,
    author: $author,
    genres:$genres
  ){
    ...BookDetails
  }}

  ${BOOK_DETAILS}
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(
    name:$name,
    setBornTo:$setBornTo
  ){
    name
    born
    bookCount
  }
}
`
export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){
    value
  }
}
`
export const CURRENT_USER = gql`
query{
  me{
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`
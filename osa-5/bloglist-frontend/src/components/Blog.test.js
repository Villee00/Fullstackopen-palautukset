import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

let component
let mockLikeHandler
const blog = {
  title: 'Pertti',
  author: 'Pertti Kurikka',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user:{
    name:'pekka',
  }
}
describe('<Blog/>', () => {

  beforeEach(() => {
    mockLikeHandler = jest.fn()
    component = render(
      <Blog blog={blog}
        handleLike={mockLikeHandler}/>
    )
  })

  test('Render only default blog info', () => {
    const hiddenBlogInfo = component.container.querySelector('.blogAllInfo')

    const likes = component.getByText(`Likes: ${blog.likes}`)
    const url = component.getByText(blog.url)
    const blogTitle = component.getAllByText(`${blog.title} ${blog.author}`)
    expect(likes).not.toBeVisible()
    expect(url).not.toBeVisible()
    expect(hiddenBlogInfo).toHaveStyle('display: none')
    expect(blogTitle[0]).toBeVisible()
  })

  test('Show likes and url when show button is pressed', () => {

    const button = component.getByText('show')

    fireEvent.click(button)
    const likes = component.getByText(`Likes: ${blog.likes}`)
    const url = component.getByText(blog.url)

    expect(likes).toBeVisible()
    expect(url).toBeVisible()
  })

  test('Like button is pressed twice ', () => {

    const showButton = component.getByText('show')
    const likeButton = component.getByText('Like')

    fireEvent.click(showButton)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })


})

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  let component
  let createNewBlog

  beforeEach(() => {
    createNewBlog = jest.fn()
    component= render(
      <BlogForm
        addBlog={createNewBlog}/>
    )
  })
  test('Add new blog', () => {

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'Blog title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Pekka testi' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'hs.fi' }
    })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('Blog title')
    expect(createNewBlog.mock.calls[0][0].author).toBe('Pekka testi')
    expect(createNewBlog.mock.calls[0][0].url).toBe('hs.fi')
  })
})

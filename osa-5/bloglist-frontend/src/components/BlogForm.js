import React, {useState} from 'react'

const BlogForm = ({addBlog}) =>{
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) =>{
        event.preventDefault()
        addBlog({title,author,url,})
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <form onSubmit={createBlog}>
         Title: <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/><br/>
            Author: <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/><br/>
            Url: <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/><br/>
            <button type="submit">Create</button>
        </form>
    )
}
export default BlogForm
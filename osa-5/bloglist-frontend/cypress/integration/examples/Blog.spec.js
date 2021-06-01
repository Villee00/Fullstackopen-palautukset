describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/test/reset')
    const User = {
      'name':'Jari',
      'username':'Jaripekka',
      'password':'Jaripekka'
    }
    cy.request('POST', 'http://localhost:3003/api/users', User)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to blogs')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Jaripekka')
      cy.get('#password').type('Jaripekka')
      cy.get('#login').click()
      cy.contains('Jari logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Jaripekka')
      cy.get('#password').type('Väärä')
      cy.get('#login').click()
      cy.get('.notification').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.request('POST', 'http://localhost:3003/api/login',{
        'username':'Jaripekka',
        'password':'Jaripekka'
      }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created and liked', function() {
      cy.get('#create-blog').click()
      cy.get('#title').type('Testi title')
      cy.get('#author').type('Pekka')
      cy.get('#url').type('hs.fi')
      cy.get('#create-blog-submit').click()
      cy.contains('Testi title Pekka')
    })

    describe('Blog already created', function (){
      beforeEach(function(){
        const token = JSON.parse(localStorage.getItem('user'))
        const requestConfig = { Authorization:`bearer ${token.token}` }
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers: requestConfig,
          body:{
            'title': 'Jarin tarinat',
            'author': 'Jarska',
            'url': 'hs.fi'
          }
        })
        cy.visit('http://localhost:3000')
      })

      it('Blog can be liked', function (){

        cy.contains('show').click()
        cy.get('#like-blog').click()
        cy.contains('Likes: 1')
      })

      it('Creator of blog can delete it', function () {
        cy.contains('show').click()
        cy.get('#delete-blog').click()
        cy.get('.notification').contains('Blog Jarin tarinat deleted!')
      })

      it('Blogs are in correct order', function (){

        cy.get('.defaultInfo').then((btn) => {
          btn.click()
        })
        cy.get('#like-blog').last().click()
      })
    })
    describe('Multiple blogs', function (){

      beforeEach(function(){
        const token = JSON.parse(localStorage.getItem('user'))
        const requestConfig = { Authorization:`bearer ${token.token}` }
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers: requestConfig,
          body:{
            'title': 'pienempi luku',
            'author': 'Tauno',
            'url': 'hs.fi',
            'likes': 30,
          }
        })

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers: requestConfig,
          body:{
            'title': 'Eniten tykkäyksiä',
            'author': 'Tauno',
            'url': 'is.fi',
            'likes': 150,
          }
        })
        cy.visit('http://localhost:3000')
      })
      it('Blogs are in correct order', function (){

        cy.get('.defaultInfo').then((btn) => {
          btn.click()
        })

        cy.get('.blogAllInfo').then((blog) => {
          cy.wrap(blog[0]).contains('Likes: 150')
          cy.wrap(blog[1]).contains('Likes: 30')
        })

      })
    })


  })
})
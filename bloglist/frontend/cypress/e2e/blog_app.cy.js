describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'emir risyad',
      username: 'risyad',
      password: '123'
    }

    const testUser = {
      name: 'mimin',
      username: 'admin',
      password: 'admin'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('risyad')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('logged in as emir risyad')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('risyad')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('risyad')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.wait(1000)

      cy.createBlog({
        author: 'bob',
        title: 'bob blog',
        url: 'goblog.com',
      })

      cy.createBlog({
        author: 'nomer 2',
        title: 'blog kedua',
        url: 'blog.com',
        likes: '300'
      })
    })

    it('A blog can be created', function() {
      cy.contains('bob blog')
    })

    it('A user can like a blog', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.get('.blogtitle').eq(0).contains('likes 1')
    })

    it('A user can delete the blog', function() {
      cy.get('#view-button').click()
      cy.get('#delete-button').click()

      cy.get('.bloglist').not('bob')
    })

    it('Only the creator can see the delete blog', function() {
      cy.get('#logout-button').click()

      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()

      cy.get('#view-button').click()
      cy.get('.bloglist').not('#delete-button')
    })

    it('blogs are ordered according to likes', function() {
      cy.get('.blogtitle').eq(0).should('contain', 'bob blog')
      cy.get('.blogtitle').eq(1).should('contain', 'blog kedua')
    })
  })
})
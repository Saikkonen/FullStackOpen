describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('login fails with wrong password', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.contains('create new')

      cy.get('#blog-title').type('title')
      cy.get('#blog-author').type('author')
      cy.get('#blog-url').type('url')
      cy.get('#create-button').click()

      cy.contains('title author').contains('show').click()
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test',
          author: 'author',
          url: 'www.com'
        })
      })

      it('it can be liked', function () {
        cy.contains('test author').contains('show').click()
        cy.contains('likes 0')

        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be removed', function () {
        cy.contains('test author').contains('show').click()
        cy.contains('remove').click()
        cy.on('window:confirm', (t) => {
          //verify text on pop-up
          expect(t).to.equal('Remove blog test by author')
        })

        cy.get('html').should('not.contain', 'test author')
      })

      it('delete button is only shown to the creator of the blog', function () {
        cy.contains('test author').contains('show').click()
        cy.contains('remove')

        const newUser = {
          name: 'test user',
          username: 'test',
          password: 'test',
        }
        // add a second user for testing
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
        // login to the new user
        cy.login({ username: 'test', password: 'test' })

        cy.contains('test author').contains('show').click()
        cy.contains('remove').should('not.exist')
      })
    })
  })
})

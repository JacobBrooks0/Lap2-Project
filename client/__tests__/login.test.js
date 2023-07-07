const { renderDOM, mockFetch } = require('./helpers')

let dom
let document

describe('register/index.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./login.html')
        document = await dom.window.document
    })

    it('There is a header saying login', () => {
        const h1 = document.querySelector('h1')
        expect(h1).toBeTruthy
        expect(h1.textContent).toBe('Login')
    })

    it('There is a login form with input fields', () => {
        const form = document.querySelector('form')
        const username = document.querySelector('#username')
        const password = document.querySelector('#password')
        const btn = document.querySelector('input[type=submit]')
        expect(btn).toBeTruthy
        expect(username).toBeTruthy
        expect(password).toBeTruthy
        expect(form).toBeTruthy
    })

    it('Shows username and password input', async () => {
        const username = document.querySelector('#username')
        username.value = 'username'
        const password = document.querySelector('#password')
        password.value = 'password'
        expect(username.value).toBe('username')
        expect(password.value).toBe('password')
    })

    it('Has a link to sign up', async () => {
        const signUp = document.querySelector('a')
        // await logIn.dispatchEvent(new dom.window.Event('click'))
        expect(signUp.href).toContain('register.html')
        expect(signUp).toBeTruthy
    })

    //check if sign up button takes to register.html
})


const { renderDOM, mockFetch } = require('./helpers')

let dom
let document

describe('register/index.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./register.html')
        document = await dom.window.document
    })


    it('There is a register form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

    it('Should show username and password input', async () => {
        const username = document.querySelector('#username')
        username.value = 'username'
        const password = document.querySelector('#password')
        password.value = 'password'
        expect(username.value).toBe('username')
        expect(password.value).toBe('password')
    })

    it('Should alert when username already exists', async () => {
        dom.window.alert = jest.fn()
        // jest.spyOn(dom.window,'alert').mockImplementation(()=>{})
        dom.window.fetch = mockFetch
        const form = document.querySelector('#register-form')
        const username = document.querySelector('#username')
        username.value = 'testing2'
        const password = document.querySelector('#password')
        password.value = '1'
        await form.dispatchEvent(new dom.window.Event('submit'))
        expect(dom.window.alert).toHaveBeenCalled()
    })

    it('Should open login page for correct details', async () => {
        // global.window = { location: { pathname: null }}
        dom.window.open = jest.fn()
        // jest.spyOn(global.window,'open').mockImplementation(()=>{})
        dom.window.fetch = mockFetch
        const form = document.querySelector('#register-form')
        const username = document.querySelector('#username')
        username.value = 'testing2'
        const password = document.querySelector('#password')
        password.value = '1'
        await form.dispatchEvent(new dom.window.Event('submit'))
        expect(dom.window.open).toHaveBeenCalled()
    })
})

//expect(node.innerHTML).toContain('')
//expect(node.className).toBe('')

//input.value = ''
//form.dispatchEvent(new dom.window.Event('submit'))

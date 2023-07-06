const { renderDOM } = require('./helpers')

let dom
let document


describe('register/index.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./register/index.html')
        document = await dom.window.document
    })

    it('There is a register form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

    it('Should alert error when nothing is entered', () => {
        global.alert = jest.fn()
        const btn = document.querySelector('#submit')
        expect(global.alert).toHaveBeenCalledTimes(1)
        btn.submit()
    })

    // it('Should open login page for correct details', () => {
    //     location.pathname = jest.fn()
    //     const form = document.querySelector('form')
    //     const username = document.querySelector('#username')
    //     username.value = 'username'
    //     const password = document.querySelector('#password')
    //     password.value = 'password'
    //     form.submit()

    // })
})

//expect(node.innerHTML).toContain('')
//expect(node.className).toBe('')

//input.value = ''
//form.dispatchEvent(new dom.window.Event('submit'))

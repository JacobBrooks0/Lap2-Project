const { renderDOM, mockFetch } = require('./helpers')

let dom
let document

// const mockPathname = jest.fn()
// Object.defineProperty(window, 'location', {
//     value: {
//       get pathname() {
//         return mockPathname();
//       },
//     },
// });
  
// mockPathname.mockReturnValue('some');

// const spyWindowOpen = jest.spyOn(window, 'open');
// spyWindowOpen.mockImplementation(jest.fn());

describe('register/index.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./register/index.html')
        document = await dom.window.document
    })


    it('There is a register form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

    it('Should alert error when nothing is entered', async () => {
        dom.window.alert = jest.fn()
        const form = document.querySelector('#register-form')
        await form.dispatchEvent(new dom.window.Event('submit'))
        expect(dom.window.alert).toHaveBeenCalledTimes(1)
    })

    it('Should open login page for correct details', async () => {
        // location.pathname = jest.fn()
        dom.window.fetch = mockFetch
        const form = document.querySelector('#register-form')
        const username = document.querySelector('#username')
        username.value = 'username'
        const password = document.querySelector('#password')
        password.value = 'password'
        await form.dispatchEvent(new dom.window.Event('submit'))
        expect(dom.window.location.pathname).toEqual('./login/index.html')
    })
})

//expect(node.innerHTML).toContain('')
//expect(node.className).toBe('')

//input.value = ''
//form.dispatchEvent(new dom.window.Event('submit'))

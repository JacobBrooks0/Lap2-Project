const { renderDOM, mockFetch } = require('./helpers')

let dom
let document

describe('register/index.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./profile-setup.html')
        document = await dom.window.document
    })

    it ('There is a form with inputs', () => {
        const form = document.querySelector('form')
        const name = document.querySelector('#name')
        const url = document.querySelector('#dp_url')
        const summary = document.querySelector('#profile_summary')
        const btn = document.querySelector('input[type=submit]')
        expect(btn).toBeTruthy
        expect(form).toBeTruthy
        expect(name).toBeTruthy
        expect(url).toBeTruthy
        expect(summary).toBeTruthy
    })

    it('There is a header saying to create profile', () => {
        const h1 = document.querySelector('h1')
        expect(h1).toBeTruthy
        expect(h1.textContent).toBe('Create Your User Profile ')
    })

    it('Shows text inputted in input fields', () => {
        const name = document.querySelector('#name')
        name.value = 'Name'
        const url = document.querySelector('#dp_url')
        url.value = 'www.image.com'
        const summary = document.querySelector('#profile_summary')
        summary.value = 'Bio'
        expect(name.value).toBe('Name')
        expect(url.value).toBe('www.image.com')
        expect(summary.value).toBe('Bio')
    })

    // // submit button - take to skills boost ?
    // it('Takes to skills page after submitting profile', async () => {
    //     dom.window.location.href = jest.fn()
    //     const name = document.querySelector('#name')
    //     name.value = 'Name'
    //     const url = document.querySelector('#dp_url')
    //     url.value = 'www.image.com'
    //     const summary = document.querySelector('#profile_summary')
    //     summary.value = 'Bio'
    //     const submit = document.querySelector('input[type=submit]') 
    //     await submit.dispatchEvent(new dom.window.Event('submit'))
    //     expect(dom.window.location.href).toBeCalled()
    // })
})

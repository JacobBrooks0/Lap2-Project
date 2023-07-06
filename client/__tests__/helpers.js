const path = require('path')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const renderDOM = async (filename) => {
    const filePath = path.join(process.cwd(), filename)
    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable',
    })

    return new Promise((resolve, _) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom)
        })
    })
}

// const mockFetch = (data) => {
//     return jest.fn().mockImplementation(() => {
//         Promise.resolve({
//             ok: true,
//             json: () => data,
//         })
//     })
// }

const mockFetch = (data) => {
    return jest.fn().mockImplementation(() => {
        Promise.resolve({ json: () => {
            Promise.resolve(accepted) 
                return data
            }
        })   
    })

}

module.exports = { renderDOM, mockFetch }

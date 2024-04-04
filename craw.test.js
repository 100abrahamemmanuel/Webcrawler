const {normalizeURL,getURLSFromHtml} = require('./crawl')
const {test,expect} = require('@jest/globals')

test('normalizeURL',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    // console.log(actual)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protcol',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    // console.log(actual)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    // console.log(actual)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    // console.log(actual)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLSFromHtml absolute',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev"> Boot.dev blog</a>
        </body>
    </html>`
    const inputBaseURL ="https://blog.boot.dev"
    const actual = getURLSFromHtml(inputHTMLBody,inputBaseURL)
    // console.log(actual)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLSFromHtml relative',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"> Boot.dev blog</a>
        </body>
    </html>`
    const inputBaseURL ="https://blog.boot.dev"
    const actual = getURLSFromHtml(inputHTMLBody,inputBaseURL)
    // console.log(actual)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLSFromHtml both',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"> Boot.dev blog path one</a>
            <a href="/path2/"> Boot.dev blog path two</a>
        </body>
    </html>`
    const inputBaseURL ="https://blog.boot.dev"
    const actual = getURLSFromHtml(inputHTMLBody,inputBaseURL)
    // console.log(actual)
    const expected = ['https://blog.boot.dev/path1/',"https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLSFromHtml relative',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
    </html>`
    const inputBaseURL ="https://blog.boot.dev"
    const actual = getURLSFromHtml(inputHTMLBody,inputBaseURL)
    // console.log(actual)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})
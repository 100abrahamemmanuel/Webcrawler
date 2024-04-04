const {JSDOM} = require('jsdom') //gives us a way to access dom elements


async function  crawPage(currentURL) {
    console.log(`actively crawling :${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if (resp.status>399) {
            console.log(`error in fetch with status code: ${resp.status} on page:${currentURL}`)
            return
        }
        const contentenType = resp.headers.get("content-type")
        if (!contentenType.includes("text/html")) {
            console.log(`non html response, content type :${contentenType}, on page:${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch (error) {
        console.log(`error in fetch: ${err.message} on page:${currentURL}`)
    }
}

function getURLSFromHtml(htmlBody,baseUrl) {
    // two input html body and base url is the url of the website we are crawling , and it returns a url of links
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){
        if (linkElement.href.slice(0,1) === '/') {
            try {
                //relative url
                const urloj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urloj.href)
            } catch (error) {
                console.log(`error with relative url: ${error.message}`)
            }
        }else{
            //absolute
            try {
                const urloj = new URL(linkElement.href)
                urls.push(urloj.href)
            } catch (error) {
                console.log(`error with relative url: ${error.message}`)
            }
        }
        
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString) //it brakes the url down for us and also makes it case insensitive
    // console.log(urlObj)
    const hostPath=`${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.lenght>0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports={normalizeURL,getURLSFromHtml,crawPage}
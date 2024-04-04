const {crawPage}= require('./crawl')

// entry point to the application take in input from the command line of the website

function main() {
    if (process.argv.lenght<3) {
        //node-1 app.js-2 boot.dev-3 
        console.log('no website provided')
        process.exit(1)
    }
    if (process.argv.lenght>3) {
        //node-1 app.js-2 boot.dev-3 
        console.log('too many command line arguments')
        process.exit(1)
    }
    const baseUrl= process.argv[2]
    console.log(`Started crawl ${baseUrl}`)
    crawPage(baseUrl)
}
main()
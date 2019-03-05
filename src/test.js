const test = require("tape")

const Promise = require("./Promise.js")

test("executor function is called immediately", (t) => {
    let testString;
    new Promise( () => {
       testString = "foo"
    })
    t.equal( testString, "foo")

    t.end()
})

test("resolution handler is called when promise is resolved", (t) => {
    let testString = "foo"
    const promise = new Promise( (resolve) => {
        setTimeout( () => {
            resolve(testString)
        }, 500)
    })

    promise.then( (string) => {
        t.equal(string, testString)
        t.end()
    })
})
const test = require("tape")

const Promise = require("./Promise.js")

test("executor function is called immediately", (t)=>{
    let testString;
    new Promise(()=>{
       testString = "foo"
    })
    t.equal( testString, "foo")

    t.end()
})

test("resolution handler is called when promise is resolved", (t)=>{
    const testString = "foo"
    const promise = new Promise((resolve)=>{
        setTimeout(()=>{ 
            resolve(testString)
        }, 500)
    })

    promise.then((string)=>{
        t.equal(string, testString)
        t.end()
    })
})

test("promise supports many resolution handlers", (t)=>{

    const testString = "foo"

    const promise = new Promise((resolve) => {
        setTimeout(()=>{
            resolve(testString)
        }, 500)
    })

    promise.then((string)=>{
        t.equal(string, testString)
    })

    promise.then((string)=>{
        t.equal(string, testString)
        t.end()
    })
})

test("resolution handlers can be chained", (t)=>{
    const testString = "foo"

    const promise = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, 100)
    })

    promise.then(()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(testString)
            }, 100)
        })
    })
    .then((string)=>{
        t.equal(string , testString)
        t.end()
    })
})
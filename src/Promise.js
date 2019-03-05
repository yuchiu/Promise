class Promise{
    constructor(executor){
        this._resolutionQueue = []
        executor(this._resolve.bind(this));
    }

    _resolve(value){
        while(this._resolutionQueue.length){
            const resolution = this._resolutionQueue.shift()
            const returnValue = resolution.handler(value)
            if(returnValue instanceof Promise){
                returnValue.then((v)=>{
                    resolution.promise._resolve(v)
                })
            }
        }
    }

    then (resolutionHandler){
        const newPromise = new Promise(()=>{})
        this._resolutionQueue.push({
            handler: resolutionHandler,
            promise: newPromise
        })
        return newPromise
    }
}

module.exports = Promise
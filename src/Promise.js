class Promise{
    constructor(executor){
        this._resolutionQueue = []
        executor(this._resolve.bind(this));
    }


    _resolve(value){
        while(this._resolutionQueue.length){
            const handler = this._resolutionQueue.shift()
            handler(value)
        }
    }

    then (resolutionHandler){
        this._resolutionQueue.push(resolutionHandler)
    }
}

module.exports = Promise
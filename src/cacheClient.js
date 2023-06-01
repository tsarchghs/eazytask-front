// Imported from another project of Gjergj Kadriu

class CacheClient {
    constructor(){
        this.state = { } // InMemoryCaching (deprecated)
    }
    sortObj = (obj) => (
        obj === null || typeof obj !== 'object'
            ? obj
            : Array.isArray(obj)
                ? obj.map(this.sortObj)
                : Object.assign({},
                    ...Object.entries(obj)
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                        .map(([k, v]) => ({ [k]: this.sortObj(v) }),
                    ))
    );
    getStringFromObj = obj => JSON.stringify(this.sortObj(obj))
    storeRequest = (request, data) => {
        this.store(this.getStringFromObj(request),data)
    }
    getRequest = options => {
        return this.get(this.getStringFromObj(options))
    }
    store = (key,val) => localStorage.setItem(key,JSON.stringify(val));
    get = key => {
        let val = localStorage.getItem(key);
        if (val === undefined) throw new Error(`Key ${key} not found in cache`)
        return JSON.parse(val)
    }
}

export default CacheClient;
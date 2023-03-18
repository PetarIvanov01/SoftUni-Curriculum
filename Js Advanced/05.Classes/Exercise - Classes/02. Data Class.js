class Request {
    constructor(method, uri, version, message) {

        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = this._response;
        this.fulfilled = this._fulfilled;

    }

    get _response() {
        return undefined;
    }
    // set _response(value) {
    //     this.response = value
    // }

    get _fulfilled() {
        return false;
    }
    // set _fulfilled(value) {
    //     this.fulfilled = value;
    // }

}
let myData = new Request('GET', 'http://google.com', 'HTTP/1.1', '')
console.log(myData);
// method (String)
// · uri (String)
// · version (String)
// · message (String)
// · response (String)
// · fulfilled (Boolean)
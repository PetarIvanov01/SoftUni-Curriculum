function validator(input) {

    const method = input.method;
    const uri = input.uri;
    const version = input.version;
    const message = input.message;

    if (!['GET', 'POST', 'DELETE', 'CONNECT'].includes(method) || method === undefined) {
        
        throw new Error(`Invalid request header: Invalid Method`);
    }

    let uriMatcher = /(^[\w.]+$)|\*/
    if (!uriMatcher.test(uri) || uri == '' || uri === undefined) {
        throw new Error('Invalid request header: Invalid URI');
    }

    if (!['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'].includes(version) || version === undefined) {
        throw new Error('Invalid request header: Invalid Version')
    }
    
    let messageMatcher = /^[^<>\\&'"]*$/
    if (!messageMatcher.test(message) || message == undefined) {
        throw new Error('Invalid request header: Invalid Message')
    }

    return input;

}
let obj = {
    method: 'POST',
    version: 'HTTP/2.0',
    message: 'rm -rf /*'
};
validator(obj)

//Invalid request header: Invalid Version
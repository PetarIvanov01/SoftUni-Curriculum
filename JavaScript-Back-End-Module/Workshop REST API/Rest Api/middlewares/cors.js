module.exports = () => {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,POST,PUT,DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

        next();
    }
}
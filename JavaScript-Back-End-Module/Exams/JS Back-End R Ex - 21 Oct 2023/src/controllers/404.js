const errorHandler = (req, res) => {

    res.render('errors/404', {
        title: '404 page'
    })

}

module.exports =  errorHandler
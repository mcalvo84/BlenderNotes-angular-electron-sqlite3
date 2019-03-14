module.exports = app => {
    // Init
    app.db.sequelize.sync().done(() => {
        app.listen(app.get('port'), () => {
            console.log('Server on port', app.get('port'));
        })
    });
}

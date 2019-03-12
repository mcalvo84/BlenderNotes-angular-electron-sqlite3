
module.exports = ( mainWindow, ipcMain, knex ) => {



    ipcMain.on("mainWindowLoaded", function () {
        if (knex) {
            let result = knex.select("FirstName").from("Users")
            result.then(function (rows) {
                mainWindow.webContents.send("resultSent", rows);
            })
        }
    });
}

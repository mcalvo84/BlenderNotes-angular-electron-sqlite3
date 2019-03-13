
function mainWindowLoaded(knex, ipcMain, mainWindow) {
  ipcMain.on("mainWindowLoaded", function () {
    let result = knex.select("FirstName").from("Users")
    result.then(function (rows) {
      mainWindow.webContents.send("resultSent", rows);
    })
  })
};

module.exports = {
    init: (knex, ipcMain, mainWindow) => {
      mainWindowLoaded(knex, ipcMain, mainWindow);
    }
}

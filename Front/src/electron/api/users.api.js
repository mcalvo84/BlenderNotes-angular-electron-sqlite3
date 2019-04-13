
function usersGetUsers(knex, ipcMain, mainWindow) {
  ipcMain.on("usersGetUsers", function () {
    let result = knex.select("FirstName").from("Users")
    result.then(function (rows) {
      mainWindow.webContents.send("resultSent", rows);
    })
  })
};

module.exports = {
    init: (knex, ipcMain, mainWindow) => {
      usersGetUsers(knex, ipcMain, mainWindow);
    }
}

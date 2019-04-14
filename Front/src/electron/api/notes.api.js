

function GetNotesFromPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[notes][get][fromPost]", function (evt, id) {
    var query =
      'select * from Notes ' +
      'where Notes.PostId = ' + id;

      knex.raw(query).then(function(result) {
        mainWindow.webContents.send("[notes][result][fromPost]", result);
      });
    })
}

module.exports = {
    init: (knex, ipcMain, mainWindow) => {
      GetNotesFromPost(knex, ipcMain, mainWindow);
    }
}

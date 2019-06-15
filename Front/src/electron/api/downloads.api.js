

function GetDownloadsFromPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[downloads][get][fromPost]", function (evt, id) {
    var query =
      'select * from Posts_Downloads ' +
      'where Posts_Downloads.PostId = ' + id;

      knex.raw(query).then(function(result) {
        mainWindow.webContents.send("[downloads][result][fromPost]", result);
      });
  })
}

function AddDownload(knex, ipcMain, mainWindow, jetpack) {
  ipcMain.on("[downloads][add]", function (evt, path) {
    var filename = path.split('/')[path.split('/').length - 1];
    jetpack.copy(path, './DATA/Downloads/'+filename, { overwrite: true });

    let myNotification = new Notification('filename', {
      body: 'Fichero subido a: \n - ./DATA/Downloads/'+filename
    })
  });
}

module.exports = {
    init: (knex, ipcMain, mainWindow, jetpack) => {
      GetDownloadsFromPost(knex, ipcMain, mainWindow);
      AddDownload(knex, ipcMain, mainWindow, jetpack);
    }
}

function OpenFile(knex, ipcMain, mainWindow, shell) {
  ipcMain.on("[open][file]", function(evt, url, name) {
    shell.openItem(url);
  });
}


function GetDownloadsFromPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[downloads][get][fromPost]", function (evt, id) {
    var query =
      'select Downloads.id, Downloads.name, Downloads.url from Posts_Downloads ' +
      'left join Downloads on Posts_Downloads.downloadID = Downloads.id ' +
      'where Posts_Downloads.postID = ' + id + ' ';

      knex.raw(query).then(function(result) {
        console.log("FILES :: ", result);
        mainWindow.webContents.send("[downloads][result][fromPost]", result);
      });
    })
}

function AddDownload(knex, ipcMain, mainWindow, jetpack) {
  ipcMain.on("[downloads][add]", function (evt, path, postId) {
    var filename = path.split('/')[path.split('/').length - 1];
    // FS COPY
    jetpack.copy(path, './DATA/Downloads/'+postId+'/'+filename, { overwrite: true });
    // INSERT IN TABLE DOWNLOADS
    knex.insert({
      url: 'DATA/Downloads/'+postId+'/',
      name: filename
    })
    .returning('id')
    .into('Downloads')
    .then(function (result) {
      var idDownload = result[0];
      console.log("DOWNLOAD RESULT :: ", result[0])
      // INSERT IN TABLE POST_DOWNLOADS
      knex.insert({
        postID: postId,
        downloadID: idDownload
      })
      .returning('id')
      .into('Posts_Downloads')
      .then(function (result) {
        // GET UPLOADS OF POST
        var query =
        'select Downloads.id, Downloads.name, Downloads.url from Posts_Downloads ' +
        'left join Downloads on Posts_Downloads.downloadID = Downloads.id ' +
        'where Posts_Downloads.postID = ' + postId + ' ';
        knex.raw(query).then(function(result) {
          console.log("FILES :: ", result);
          // SYSTEM NOTIFICATION
          let myNotification = new Notification('filename', {
            body: 'Fichero subido a: \n - ./DATA/Downloads/'+postId+'/'+filename
          })
          mainWindow.webContents.send("[downloads][result][fromPost]", result);
        });
      });
    });
  });
}

module.exports = {
    init: (knex, ipcMain, mainWindow, jetpack, shell) => {
      GetDownloadsFromPost(knex, ipcMain, mainWindow);
      AddDownload(knex, ipcMain, mainWindow, jetpack);
      OpenFile(knex, ipcMain, mainWindow, shell);
    }
}

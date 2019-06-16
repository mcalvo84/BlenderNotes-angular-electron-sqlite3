/**
 *
 * @param {*} ipcMain
 * @param {*} ytdl
 * @param {*} fs
 */
function videoVideo(ipcMain, ytdl, fs) {
  ipcMain.on("[videos][video]", function (evt, videoInfo) {
    //let fileName = videoInfo.title.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, '') + '.mp4';
    //let video = ytdl(videoInfo.id, { quality: 'highestvideo', format: 'mp4' });

    let fileName = 'testvideo.mp4';
    let videoId = 'WRlTyTU4w7o';
    let video = ytdl(videoId, { quality: 'highestvideo', format: 'mp4' });

    //video.pipe(fs.createWriteStream(config.get('videoPath') + '/' + fileName));
    video.pipe(fs.createWriteStream('./DATA/Videos/' + fileName));

    console.error('... descargando ...');

    video.on('error', (error) => {
      console.error('error', error);
    });

    video.on('end', () => {
      console.error('end', end);
      mainWindow.webContents.send("[video][result][video]", null);
    });

    video.on('progress', (chunkLength, videoed, total) => {

      const floatVideoed = videoed / total;
      let percentage = (floatVideoed * 100).toFixed(2);

      if (percentage % 2 === 0) {
        console.error('progress', percentage);
      }
    });
  });
}

/**
 * 1. INSERT IN TABLE VIDEOS
 * 2. INSERT IN TABLE POST_VIDEOS
 * 3. GET VIDEOS OF POST
 * 4. SYSTEM NOTIFICATION
 *
 * @param {*} knex
 * @param {*} ipcMain
 * @param {*} mainWindow
 */
function AddVideo(knex, ipcMain, mainWindow) {
  ipcMain.on("[videos][add]", function (evt, videoName, videoId, postId) {
    knex.insert({ identificator: videoId, name: videoName, source: 'Youtube' })
    .returning('id')
    .into('Videos')
    .then(function (result) {
      var idVideo = result[0];
      knex.insert({ postID: postId, videoID: idVideo })
      .returning('id')
      .into('Posts_Videos')
      .then(function (result) {
        var query =
        'select Videos.id, Videos.name, Videos.identificator, Videos.source from Posts_Videos ' +
        'left join Videos on Posts_Videos.videoID = Videos.id ' +
        'where Posts_Videos.postID = ' + postId + ' ';
        knex.raw(query).then(function(result) {
          let myNotification = new Notification('filename', {
            body: 'Video Guardado: \n - Youtube \n - ' + videoName
          })
          mainWindow.webContents.send("[videos][result][add]", result);
        });
      });
    });
  });
}

/**
 *
 * @param {*} knex
 * @param {*} ipcMain
 * @param {*} mainWindow
 */
function getVideosFromPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[videos][get][fromPost]", function (evt, postId) {
    var query =
    'select Videos.id, Videos.name, Videos.identificator, Videos.source from Posts_Videos ' +
    'left join Videos on Posts_Videos.videoID = Videos.id ' +
    'where Posts_Videos.postID = ' + postId + ' ';
      knex.raw(query).then(function(result) {
        mainWindow.webContents.send("[videos][result][fromPost]", result);
      });
    })
}

/**
 *
 * @param {*} knex
 * @param {*} ipcMain
 * @param {*} mainWindow
 */
function addVideoToPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[videos][add][toPost]", function (evt, idVideo, idPost) {
    knex.insert({ postID: idPost, videoID: idVideo })
    .returning('postID')
    .into('Posts_Videos')
    .then(function (result) {
      mainWindow.webContents.send("[video][add][result][toPost]", result);
    });
  });
}

/**
 *
 * @param {*} knex
 * @param {*} ipcMain
 * @param {*} mainWindow
 */
function removeVideoFromPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[videos][remove][fromPost]", function (evt, idVideo, idPost) {
    var query = 'delete from Posts_Videos where postID = ' + idPost + ' and videoID = ' + idVideo;
    knex.raw(query).then(function(result) {
      // mainWindow.webContents.send("[video][remove][result][fromPost]", result);
        var query =
        'select Videos.id, Videos.name, Videos.identificator, Videos.source from Posts_Videos ' +
        'left join Videos on Posts_Videos.videoID = Videos.id ' +
        'where Posts_Videos.postID = ' + idPost + ' ';
        knex.raw(query).then(function(result) {
          let myNotification = new Notification('filename', {
            body: 'Video Borrado'
          })
          mainWindow.webContents.send("[videos][result][add]", result);
        });
    });
  });
}

/**
 *
 */
module.exports = {
  init: (knex, ipcMain, mainWindow, ytdl, fs) => {
    getVideosFromPost(knex, ipcMain, mainWindow);
    addVideoToPost(knex, ipcMain, mainWindow);
    removeVideoFromPost(knex, ipcMain, mainWindow);
    videoVideo(ipcMain, ytdl, fs);
    AddVideo(knex, ipcMain, mainWindow);
  }
};


function postsGetPosts(knex, ipcMain, mainWindow) {
    ipcMain.on("postsGetPosts", function () {
      let result = knex.select("*").from("Posts")
      result.then(function (rows) {
        mainWindow.webContents.send("postsGetPostsResultSent", rows);
      })
    })
  };
  
  module.exports = {
      init: (knex, ipcMain, mainWindow) => {
        postsGetPosts(knex, ipcMain, mainWindow);
      }
  }
  
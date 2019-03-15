
function postsGetPosts(knex, ipcMain, mainWindow) {
  ipcMain.on("postsGetPosts", function () {
    let result = knex.select("*").from("Posts")
    result.then(function (rows) {
      mainWindow.webContents.send("postsGetPostsResultSent", rows);
    })
  })
};

function postsGetPostById(knex, ipcMain, mainWindow) {
  ipcMain.on("postsGetPostById", function (evt, id) {
    let result = knex.select("*").from("Posts").where("id", id)
    result.then(function (rows) {
      mainWindow.webContents.send("postsGetPostByIdResultSent", rows);
    })
  })
};

  module.exports = {
      init: (knex, ipcMain, mainWindow) => {
        postsGetPosts(knex, ipcMain, mainWindow);
        postsGetPostById(knex, ipcMain, mainWindow);
      }
  }

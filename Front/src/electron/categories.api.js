
function catGetCategoryTypes(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategoryTypes", function () {
    let result = knex.select("*").from("TagTypes")
    result.then(function (rows) {
      mainWindow.webContents.send("catGetCategoryTypesResultSent", rows);
    })
  })
};

function catGetCategories(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategories", function () {
    let result = knex.select("*").from("Tags")
    result.then(function (rows) {
      mainWindow.webContents.send("catGetCategoriesResultSent", rows);
    })
  })
};

module.exports = {
    init: (knex, ipcMain, mainWindow) => {
      catGetCategoryTypes(knex, ipcMain, mainWindow);
      catGetCategories(knex, ipcMain, mainWindow);
    }
}

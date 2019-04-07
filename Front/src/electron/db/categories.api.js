function catGetCategoryTypes(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategoryTypes", function() {
    let result = knex.select("*").from("TagTypes");
    result.then(function(rows) {
      mainWindow.webContents.send("catGetCategoryTypesResultSent", rows);
    });
  });
}

function catGetCategories(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategories", function() {
    let result = knex.select("*").from("Tags");
    //console.log("result DEL catGetCategories :: ", result)
    //console.log("-----------------------")
    result.then(function(rows) {
      mainWindow.webContents.send("catGetCategoriesResultSent", rows);
    });
  });
}

function catGetCategoriesByType(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategoriesByType", function(evt, id) {
    //console.log("ID DEL TIPO :: ", id)
    let result = knex
      .select("*")
      .from("Tags")
      .where("TagTypeId", id);
    //console.log("result DEL TIPO :: ", result)
    //console.log("-----------------------")
    result.then(function(rows) {
      //console.log(result)
      mainWindow.webContents.send("catGetCategoriesByTypeResultSent", rows);
    });
  });
}

function catGetCategoriesList(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategoriesList", function() {
    var query =
      "" +
      "select T.id as tid, T.name as tname,  TT.id as ttid, TT.name as ttname from  Tags as T " +
      "left join TagTypes as TT on TT.id = T.TagTypeId " +
      "order by ttid asc , tid asc";

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("catGetCategoriesListResultSent", result);
    });
  });
}

module.exports = {
  init: (knex, ipcMain, mainWindow) => {
    catGetCategoryTypes(knex, ipcMain, mainWindow);
    catGetCategories(knex, ipcMain, mainWindow);
    catGetCategoriesByType(knex, ipcMain, mainWindow);
    catGetCategoriesList(knex, ipcMain, mainWindow);
  }
};

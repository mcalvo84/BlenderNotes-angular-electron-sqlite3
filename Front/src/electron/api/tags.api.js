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
    result.then(function(rows) {
      mainWindow.webContents.send("catGetCategoriesResultSent", rows);
    });
  });
}

function catGetCategoriesByType(knex, ipcMain, mainWindow) {
  ipcMain.on("catGetCategoriesByType", function(evt, id) {
    let result = knex
      .select("*")
      .from("Tags")
      .where("TagTypeId", id);
    result.then(function(rows) {
      mainWindow.webContents.send("catGetCategoriesByTypeResultSent", rows);
    });
  });
}

/**
 * - Use for get all tags with theirs super categories
 */
function catGetCategoriesList(knex, ipcMain, mainWindow) {
  ipcMain.on("[tags][get][allTags]", function() {
    var query =
      "select T.id as tid, T.name as tname,  TT.id as ttid, TT.name as ttname from  Tags as T " +
      "left join TagTypes as TT on TT.id = T.TagTypeId " +
      "order by ttid asc , tid asc";

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("[tags][result][allTags]", result);
    });
  });
}

/**
 * - When user select a tag on sidebar in OR mode
 * - Use for get categories in which the user can still filtering and founding results
 */
function getAbaliableTagsForFilteredPosts(knex, ipcMain, mainWindow) {
  ipcMain.on('[tags][get][OR]', function(evt, listTags) {
    var query =
      'select Posts_Tags.tagID ' +
      'from Posts  ' +
      'left join Posts_Tags on Posts_Tags.postID = Posts.id  ' +
      'where Posts.id in ( ' +
      '  select postID as id  ' +
      '  from (  ' +
      '    select postID, count(Posts_Tags.postID) as counter  ' +
      '    from Posts_Tags   ' +
      '    where Posts_Tags.tagID in (' + listTags.toString() + ')  ' +
      '    group by Posts_Tags.postID  ' +
      '    having counter = ' + listTags.length  +
      '  )  ' +
      ')  ' +
      'and Posts.published = 1 ';

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send('[tags][result][OR]', result);
    });
  });
}

function GetTagsFromPost(knex, ipcMain, mainWindow) {
  ipcMain.on("[tags][get][fromPost]", function (evt, id) {
    var query =
      'select Tags.id, Tags.name, TagTypes.id as categoryId, TagTypes.name as categoryName from Posts_Tags ' +
      'left join Tags on Posts_Tags.tagID = Tags.id ' +
      'left join TagTypes on Tags.TagTypeId = TagTypes.id ' +
      'where Posts_Tags.postID = ' + id + ' ' +
      'order by  TagTypes.id ASC ';

      knex.raw(query).then(function(result) {
        mainWindow.webContents.send("[tags][result][fromPost]", result);
      });
    })
}

module.exports = {
  init: (knex, ipcMain, mainWindow) => {
    catGetCategoryTypes(knex, ipcMain, mainWindow);
    catGetCategories(knex, ipcMain, mainWindow);
    catGetCategoriesByType(knex, ipcMain, mainWindow);
    catGetCategoriesList(knex, ipcMain, mainWindow);
    GetTagsFromPost(knex, ipcMain, mainWindow);
    getAbaliableTagsForFilteredPosts(knex, ipcMain, mainWindow);
  }
};

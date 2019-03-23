
/* function postsGetPosts(knex, ipcMain, mainWindow) {
  ipcMain.on("postsGetPosts", function (evt, listTags) {
    let result = knex.select("*").from("Posts")
    result.then(function (rows) {
      mainWindow.webContents.send("postsGetPostsResultSent", rows);
    })
  })
}; */

/*
"select postID as id from ( " +
"select postID, count(Posts_Tags.postID) as counter " +
"from Posts_Tags  " +
"where Posts_Tags.tagID in (" + listTags.toString() + ") " +
"group by Posts_Tags.postID " +
"having counter = " + listTags.length +
") " +
*/


function postsGetPosts(knex, ipcMain, mainWindow) {
  ipcMain.on("postsGetPosts", function(evt, listTags) {
    var query =
      "" +
      "select distinct Posts.id, Posts.title, Posts.body, Images.url as mainImage from Posts " +
      "left join Posts_Tags on Posts_Tags.postID = Posts.id " +
      "left join Tags on Posts_Tags.tagID = Tags.id " +
      "left join TagTypes on TagTypes.id = Tags.TagTypeId " +
      "left join Images on Images.id = Posts.ImageId ";

    if (listTags && listTags.length > 0) {
      query = query +
        "where Posts.id in (" +
          "select postID as id from ( " +
            "select postID, count(Posts_Tags.postID) as counter " +
            "from Posts_Tags  " +
            "where Posts_Tags.tagID in (" + listTags.toString() + ") " +
            "group by Posts_Tags.postID " +
            "having counter = " + listTags.length +
          ") " +
        ") " +
        "and Posts.published = 0";
    } else {
      query = query + "where Posts.published = 0";
    }
    console.log(query, listTags);

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("postsGetPostsResultSent", result);
    });
  });
}

function getAbaliableTagsForFilteredPosts() {
  /*
  "select Posts_Tags.tagID " +
  "from Posts  " +
  "left join Posts_Tags on Posts_Tags.postID = Posts.id  " +
  "where Posts.id in ( " +
  "  select postID as id  " +
  "  from (  " +
  "    select postID, count(Posts_Tags.postID) as counter  " +
  "    from Posts_Tags   " +
  "    where Posts_Tags.tagID in (" + listTags.toString() + ")  " +
  "    group by Posts_Tags.postID  " +
  "    having counter = " + listTags.length  +
  "  )  " +
  ")  " +
  "and Posts.published = 0 " +
  */
}


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

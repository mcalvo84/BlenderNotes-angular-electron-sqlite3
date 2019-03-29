
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
        "and Posts.published = 1";
    } else {
      query = query + "where Posts.published = 1";
    }
    console.log(query, listTags);

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("postsGetPostsResultSent", result);
    });
  });
}

function getAbaliableTagsForFilteredPosts(knex, ipcMain, mainWindow) {
  ipcMain.on("postsGetAbaliableFilersForPosts", function(evt, listTags) {
    var query =
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
      "and Posts.published = 1 ";

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("postsGetAbaliableFilersForPostsResultSent", result);
    });
  });
}


function postsGetPostById(knex, ipcMain, mainWindow) {
  ipcMain.on("postsGetPostById", function (evt, id) {
    let result = knex.select("*").from("Posts").where("id", id)
    result.then(function (rows) {
      mainWindow.webContents.send("postsGetPostByIdResultSent", rows);
    })
  })
};

function addSimplePost(knex, ipcMain, mainWindow) {
  ipcMain.on("addSimplePost", function(evt, post) {
    knex.insert({
      title: post.title,
      body: post.description,
      BlogrollId: null,
      ImageId: null,
      UserId: null
    })
    .returning('id')
    .into('Posts')
    .then(function (id) {
      mainWindow.webContents.send("addSimplePostResultSent", id[0]);
    });
  });
}

function addImageSimplePost(knex, ipcMain, mainWindow) {
  ipcMain.on("addImageSimplePost", function(evt, imgSrc) {
    knex.insert({
      url: imgSrc
    })
    .returning('id')
    .into('Images')
    .then(function (id) {
      mainWindow.webContents.send("addImageSimplePostResultSent", id[0]);
    });
  });
}

function updatePostImage(knex, ipcMain, mainWindow) {
  ipcMain.on("updatePostImage", function(evt, ids) {
    var query =
      "UPDATE Posts SET ImageId = " + ids.imgID + " WHERE id = " + ids.postID;
    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("updatePostImageResultSent", result);
    });
  });
}


  module.exports = {
      init: (knex, ipcMain, mainWindow) => {
        postsGetPosts(knex, ipcMain, mainWindow);
        postsGetPostById(knex, ipcMain, mainWindow);
        getAbaliableTagsForFilteredPosts(knex, ipcMain, mainWindow);
        addSimplePost(knex, ipcMain, mainWindow);
        addImageSimplePost(knex, ipcMain, mainWindow);
        updatePostImage(knex, ipcMain, mainWindow);
      }
  }

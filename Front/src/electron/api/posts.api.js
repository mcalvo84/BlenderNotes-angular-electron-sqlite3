
var http = require('http');
var fs   = require('fs');

/**
 * Get list of posts
 */
function GetPosts(knex, ipcMain, mainWindow) {
  ipcMain.on('[posts][get][list]', function(evt, listTags, published = 1, max = 5, offset = 0) {
    var query =
      'select distinct Posts.id, Posts.title, Posts.body, Images.url as mainImage from Posts ' +
      'left join Posts_Tags on Posts_Tags.postID = Posts.id ' +
      'left join Tags on Posts_Tags.tagID = Tags.id ' +
      'left join TagTypes on TagTypes.id = Tags.TagTypeId ' +
      'left join Images on Images.id = Posts.ImageId ';

    if (listTags && listTags.length > 0) {
      query = query +
        'where Posts.id in (' +
          'select postID as id from ( ' +
            'select postID, count(Posts_Tags.postID) as counter ' +
            'from Posts_Tags  ' +
            'where Posts_Tags.tagID in (' + listTags.toString() + ') ' +
            'group by Posts_Tags.postID ' +
            'having counter = ' + listTags.length +
          ') ' +
        ') ' +
        'and Posts.published = ' + published;
    } else {
      query = query + 'where Posts.published = ' + published;
    }
    query = query + ' ORDER BY Posts.id DESC LIMIT ' + offset + ', ' + max;

    knex.raw(query).then(function(result) {
      let key = '[posts][result][list]';
      if (published == 0) { key += '[unpublished]' }
      if (published == 1) { key += '[published]' }
      if (published == 2) { key += '' }
      mainWindow.webContents.send(key, result);
    });
  });
}


function GetPostById(knex, ipcMain, mainWindow) {
  ipcMain.on("[posts][get][byID]", function (evt, id) {

    var query =
    'select Posts.*, Images.url as mainImage, Users.userName as authorName, Blogrolls.name as blogrollName, Blogrolls.url as blogrollUrl from Posts ' +
    'left join Blogrolls on Posts.BlogrollId = Blogrolls.id ' +
    'left join Images on Posts.ImageId = Images.id ' +
    'left join Users on Posts.UserId = Users.id ' +
    'where Posts.id = ' + id;

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("[posts][result][byID]", result);
    });
    // let result = knex.select("*").from("Posts").where("id", id)
    // result.then(function (rows) {
    //   mainWindow.webContents.send("[posts][result][byID]", rows);
    // })
  })
};

function addSimplePost(knex, ipcMain, mainWindow) {
  ipcMain.on("addSimplePost", function(evt, post) {
    knex.insert({
      title: post.title,
      body: post.description,
      BlogrollId: null,
      ImageId: null,
      UserId: null,
      original: post.link
    })
    .returning('id')
    .into('Posts')
    .then(function (id) {
      mainWindow.webContents.send("addSimplePostResultSent", id[0]);
    });
  });
}

function updateSimplePost(knex, ipcMain, mainWindow) {
  ipcMain.on("[post][update][simple]", function(evt, post, id) {
    knex.update({
      title: post.title,
      body: post.body,
      original: post.original,
      published: post.published,
      updatedAt: formatDate(new Date())
    })
    .where({id})
    .returning('id')
    .into('Posts')
    .then(function (id) {
      mainWindow.webContents.send("[posts][result][update][simple]", id[0]);
    });
/*     var query =
    "UPDATE Posts " +
    "SET " +
      "title='"+ post.title +"' " +
      "body='"+ post.body +"' " +
      "original='"+ post.original +"' " +
      "published="+ post.published +" " +
      "updatedAt='"+ formatDate(new Date()) +"' " +
    "WHERE  Posts.id = " +  id;

    console.log(query)

    knex.raw(query).then(function(result) {
      mainWindow.webContents.send("[posts][result][update][simple]", result);
    }); */
  });
}

function addImageSimplePost(knex, ipcMain, mainWindow) {
  ipcMain.on("addImageSimplePost", function(evt, imgSrc) {
    let splitPath = imgSrc.split("/");
    var file = fs.createWriteStream("./DATA/Images/MainImages/" + splitPath[splitPath.length - 1]); // splitPath[splitPath.length - 1]
    var request = http.get(imgSrc.replace("https:", "http:"), function(response) {
      response.pipe(file);
    });

    knex.insert({
      url: "./DATA/Images/MainImages/" + splitPath[splitPath.length - 1] // imgSrc // "./DATA/Images/MainImages/created_file.jpg"
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

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      hours = d.getHours();
      minutes = d.getMinutes();
      seconds = d.getSeconds();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;
  if (seconds.length < 2) seconds = '0' + seconds;

  return [year, month, day ].join('-') + ' ' + [ hours, minutes, seconds ].join(':');
}

  module.exports = {
      init: (knex, ipcMain, mainWindow) => {
        GetPosts(knex, ipcMain, mainWindow);
        GetPostById(knex, ipcMain, mainWindow);
        addSimplePost(knex, ipcMain, mainWindow);
        addImageSimplePost(knex, ipcMain, mainWindow);
        updatePostImage(knex, ipcMain, mainWindow);
        updateSimplePost(knex, ipcMain, mainWindow);
      }
  }

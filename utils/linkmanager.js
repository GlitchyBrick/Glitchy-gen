// Main Module For './links'


let fs = require("fs");


var moe = {
  create: function(name, link,inside) {
    if (!name || !link || !inside) {
      return;
    }
    var dataa = fs.readFileSync("/app/links/example.json");
    fs.writeFileSync("/app/links/" + name, dataa);
  },
  delete: function(name) {
    if (!name) {
      return;
    }
    if (fs.existsSync("/app/links/" + name)) {
      fs.rename(
        "/app/links/" + name,
        "/app/links/DELETED.json",
        function(err) {
          if (err) console.log("ERROR: " + err);
        }
      );
    }
  },
  exists: function(name) {
    if (!name) {
      return;
    }
    if (fs.existsSync("/app/links/" + name)) {
      return true;
    } else {
      return false;
    }
  },
  get: function(name) {
    if (!name) {
      return;
    }
    if (fs.existsSync("/app/links/" + name)) {
      return JSON.parse(fs.readFileSync("/app/links/" + name));
    }
  },
  update: function(name,data) {
    if (!name || !data) {
      return;
    }
    if (fs.existsSync("/app/links/" + name)) {
      fs.writeFile(
        "/app/links/" + name,
        JSON.stringify(data),
        err => {
          if (err) console.error(err);
        }
      );
    } else {
      return;
    }
  }
};

for (var key in moe) {
  module.exports[key] = moe[key];
}

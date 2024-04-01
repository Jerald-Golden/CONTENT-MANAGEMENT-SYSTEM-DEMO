const express = require("express");
const multer = require("multer");
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
app.use(express.static("App"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//Json reading

var DataPath = "JSON/home_data.json";
var Data;
fs.readFile(DataPath, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    Data = JSON.parse(data);
  }
});
var ItemDataPath = "JSON/products_data.json";
var ItemData;
fs.readFile(ItemDataPath, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    ItemData = JSON.parse(data);
  }
});
var LayoutDataPath = "JSON/layout_data.json";
var LayoutData;
fs.readFile(LayoutDataPath, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    LayoutData = JSON.parse(data);
  }
});


//disk reading

var slideImgpath;
const slideImgstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "App/uploads/slideImg");
  },
  filename: function (req, file, cb) {
    slideImgpath = Date.now() + "_" + file.originalname;
    cb(null, slideImgpath);
  },
});

var secImgpath;
const secImgstorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/secImg", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/secImg", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/secImg");
  },
  filename: function (req, file, cb) {
    secImgpath = Date.now() + "_" + file.originalname;
    cb(null, secImgpath);
  },
});

var itempath;
const itemstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "App/uploads/items");
  },
  filename: function (req, file, cb) {
    itempath = Date.now() + "_" + file.originalname;
    cb(null, itempath);
  },
});

var lay1imgpath;
const lay1storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/layimg/layimg1", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/layimg/layimg1", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/layimg/layimg1");
  },
  filename: function (req, file, cb) {
    lay1imgpath = Date.now() + "_" + file.originalname;
    cb(null, lay1imgpath);
  },
});

var lay2imgpath;
const lay2storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/layimg/layimg2", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/layimg/layimg2", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/layimg/layimg2");
  },
  filename: function (req, file, cb) {
    lay2imgpath = Date.now() + "_" + file.originalname;
    cb(null, lay2imgpath);
  },
});

var lay3imgpath;
const lay3storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/layimg/layimg3", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/layimg/layimg3", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/layimg/layimg3");
  },
  filename: function (req, file, cb) {
    lay3imgpath = Date.now() + "_" + file.originalname;
    cb(null, lay3imgpath);
  },
});

var lay4imgpath;
const lay4storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/layimg/layimg4", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/layimg/layimg4", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/layimg/layimg4");
  },
  filename: function (req, file, cb) {
    lay4imgpath = Date.now() + "_" + file.originalname;
    cb(null, lay4imgpath);
  },
});

var lay5imgpath;
const lay5storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/layimg/layimg5", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/layimg/layimg5", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/layimg/layimg5");
  },
  filename: function (req, file, cb) {
    lay5imgpath = Date.now() + "_" + file.originalname;
    cb(null, lay5imgpath);
  },
});

var lay6imgpath;
const lay6storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    fs.readdir("App/uploads/layimg/layimg6", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join("App/uploads/layimg/layimg6", file);
        fs.unlinkSync(filePath);
      });
    });
    cb(null, "App/uploads/layimg/layimg6");
  },
  filename: function (req, file, cb) {
    lay6imgpath = Date.now() + "_" + file.originalname;
    cb(null, lay6imgpath);
  },
});


//uploading data

const SlideImgupload = multer({ storage: slideImgstorage });
app.post("/ApplyslideImg", SlideImgupload.single("image"), (req, res) => {
  slideImgpath = "/uploads/slideImg/" + slideImgpath;
  Data.slides.push({ image: slideImgpath });
  var jsonString = JSON.stringify(Data);

  fs.writeFile("JSON/home_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      const imageUrls = Data.slides.map((slide) => slide.image);
      res.json({ imageUrls });
    }
  });
});

const SecImgupload = multer({ storage: secImgstorage });
app.post("/ApplysecImg", SecImgupload.single("image"), (req, res) => {
  secImgpath = "/uploads/secImg/" + secImgpath;
  Data.secImg = secImgpath;
  var jsonString = JSON.stringify(Data);

  fs.writeFile("JSON/home_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(Data.secImg);
    }
  });
});

const Itemsupload = multer({ storage: itemstorage });
app.post("/Applyitem", Itemsupload.single("image"), (req, res) => {
  const itemClass = req.body.itemClass[0];
  const itemName = req.body.itemName;
  const itemDescription = req.body.itemDescription;
  itempath = "/uploads/items/" + itempath;
  ItemData.items.push({
    item: [{ source: itempath }, { name: itemName }, { des: itemDescription }, { class: itemClass }],
  });
  var jsonString = JSON.stringify(ItemData);

  fs.writeFile("JSON/products_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(ItemData);
    }
  });
});

const lay1upload = multer({ storage: lay1storage });
app.post("/Applyimg1", lay1upload.single("image"), (req, res) => {
  const newtitle = (req.body.title);
  LayoutData.title = newtitle;
  lay1imgpath = "/uploads/layimg/layimg1/" + lay1imgpath;
  LayoutData.lay1 = lay1imgpath;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

const lay2upload = multer({ storage: lay2storage });
app.post("/Applyimg2", lay2upload.single("image"), (req, res) => {
  lay2imgpath = "/uploads/layimg/layimg2/" + lay2imgpath;
  LayoutData.lay2 = lay2imgpath;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

const lay3upload = multer({ storage: lay3storage });
app.post("/Applyimg3", lay3upload.single("image"), (req, res) => {
  lay3imgpath = "/uploads/layimg/layimg3/" + lay3imgpath;
  LayoutData.lay3 = lay3imgpath;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

const lay4upload = multer({ storage: lay4storage });
app.post("/Applyimg4", lay4upload.single("image"), (req, res) => {
  lay4imgpath = "/uploads/layimg/layimg4/" + lay4imgpath;
  LayoutData.lay4 = lay4imgpath;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

const lay5upload = multer({ storage: lay5storage });
app.post("/Applyimg5", lay5upload.single("image"), (req, res) => {
  lay5imgpath = "/uploads/layimg/layimg5/" + lay5imgpath;
  LayoutData.lay5 = lay5imgpath;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

const lay6upload = multer({ storage: lay6storage });
app.post("/Applyimg6", lay6upload.single("image"), (req, res) => {
  lay6imgpath = "/uploads/layimg/layimg6/" + lay6imgpath;
  LayoutData.lay6 = lay6imgpath;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

//reading data

app.post("/Addslides", function (req, res) {
  var url = req.body.url;
  Data.slides.push({ image: url });
  var jsonString = JSON.stringify(Data);

  fs.writeFile("JSON/home_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      const imageUrls = Data.slides.map((slide) => slide.image);
      res.json({ imageUrls });
    }
  });
});

app.post("/Addtexts", function (req, res) {
  var pritext = req.body.pritext;
  Data.pritext = pritext;
  var jsonString = JSON.stringify(Data);

  fs.writeFile("JSON/home_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(Data.pritext);
    }
  });
});

app.post("/Addlay1texts", function (req, res) {
  var lay1text = req.body.lay1text;
  LayoutData.lay1text = lay1text;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData.lay1text);
    }
  });
});

app.get("/getPritext", (req, res) => {
  const pritext = require("./JSON/home_data.json");
  res.json(pritext);
});

app.get("/getlaytext", (req, res) => {
  const laytext = require("./JSON/layout_data.json");
  res.json(laytext);
});

app.get("/getSecondImg", (req, res) => {
  const secondImgData = require("./JSON/home_data.json");
  res.json(secondImgData);
});

app.get("/getLayImg", (req, res) => {
  const layImgData = require("./JSON/layout_data.json");
  res.json(layImgData);
});

app.get("/getSlides", (req, res) => {
  const slidesData = require("./JSON/home_data.json");
  res.json(slidesData);
});

app.get("/Fetchslides", (req, res) => {
  const imageData = require("./JSON/home_data.json");

  if (imageData.slides && imageData.slides.length > 0) {
    const imageUrls = imageData.slides.map((slide) => slide.image);
    res.json({ imageUrls });
  } else {
    res.status(400).json({ error: "No image URLs available" });
  }
});

app.get("/Deleteslides", (req, res) => {
  if (Data.slides && Data.slides.length > 0) {
    let path = Data.slides.pop();
    let filePath = "App"+ path.image;
    fs.unlinkSync(filePath);
    fs.writeFile("JSON/home_data.json", JSON.stringify(Data), (err) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        const imageUrls = Data.slides.map((slide) => slide.image);
        res.json({ imageUrls });
      }
    });
  } else {
    res.status(400).json({ error: "No images to delete" });
  }
});

app.get("/getitems", (req, res) => {
  const itemsData = require("./JSON/products_data.json");
  res.json(itemsData);
});

app.get("/DeleteCard", (req, res) => {
  if (ItemData.items && ItemData.items.length > 0) {
    let path =ItemData.items.pop();
    let filePath = "App"+ (path.item.find(item => item.source)?.source);
    fs.unlinkSync(filePath);
    fs.writeFile("JSON/products_data.json", JSON.stringify(ItemData), (err) => {
      res.json(ItemData);
    });
  } else {
    res.status(400).json({ error: "No items to delete" });
  }
});

app.get("/Addlayout1", function (req, res) {
  LayoutData.layout1 = true;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

app.get("/Removelayout1", function (req, res) {
  LayoutData.layout1 = false;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

app.get("/Addlayout2", function (req, res) {
  LayoutData.layout2 = true;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

app.get("/Removelayout2", function (req, res) {
  LayoutData.layout2 = false;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

app.get("/Addlayout3", function (req, res) {
  LayoutData.layout3 = true;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

app.get("/Removelayout3", function (req, res) {
  LayoutData.layout3 = false;
  var jsonString = JSON.stringify(LayoutData);

  fs.writeFile("JSON/layout_data.json", jsonString, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(LayoutData);
    }
  });
});

app.get("/getlayouts", (req, res) => {
  const layout = require("./JSON/layout_data.json");
  res.json(layout);
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

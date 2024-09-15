const express = require("express");

const multer = require("multer");

const imageSize = require("image-size");

const sharp = require("sharp");

var width;

var format;

var outputFilePath;

var height;

const bodyParser = require("body-parser");

const fs = require("fs");

const path = require("path");

var dir = "public";
var subDirectory = "public/uploads";

var previewBuffer;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);

  fs.mkdirSync(subDirectory);
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

var upload = multer({ storage: storage, fileFilter: imageFilter });

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/imageDisplay", async (req, res) => {
  const imagePath = "output.png"; // Replace with your image path
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading image file");
    } else {
      // Send image as binary data (buffer)
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": data.length,
      });
      res.end(data); // Send the buffer as the response
    }
  });
});

app.post("/preview", async (req, res) => {
  try {
    width = parseInt(req.body.width);

    height = parseInt(req.body.height);
    // imagePath = "C:\Users\shivam\OneDrive\Desktop\image-processing\public\uploads\file-1726376839504"
    rotationDegree = parseInt(req.body.rotationDegree);
    brightnessLevel = parseInt(req.body.brightnessLevel);
    saturationLevel = parseFloat(req.body.saturationLevel);
    contrastLevel = parseFloat(req.body.contrastLevel);
    const previewBuffer = await generatePreview(
      width,
      height,
      rotationDegree,
      brightnessLevel,
      saturationLevel,
      contrastLevel,
      req,
      res
    );

    res.writeHead(200, {
      "Content-Type": "image/jpeg", // Set appropriate content type
    });
    res.end(previewBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating preview");
  }
});

app.post("/processimage", upload.single("file"), (req, res) => {
  format = req.body.format;

  width = parseInt(req.body.width);

  height = parseInt(req.body.height);

  rotationDegree = parseInt(req.body.rotationDegree);
  brightnessLevel = parseInt(req.body.brightnessLevel);
  saturationLevel = parseFloat(req.body.saturationLevel);
  contrastLevel = parseFloat(req.body.contrastLevel);

  if (req.file) {
    console.log(req.file.path);

    if (isNaN(width) || isNaN(height)) {
      var dimensions = imageSize(req.file.path);

      console.log(dimensions);

      width = parseInt(dimensions.width);

      height = parseInt(dimensions.height);

      processImage(
        width,
        height,
        rotationDegree,
        brightnessLevel,
        saturationLevel,
        contrastLevel,
        req,
        res
      );
    } else {
      processImage(
        width,
        height,
        rotationDegree,
        brightnessLevel,
        saturationLevel,
        contrastLevel,
        req,
        res
      );
    }
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});

function processImage(
  width,
  height,
  rotationDegree,
  brightnessLevel,
  saturationLevel,
  contrastLevel,
  req,
  res
) {
  outputFilePath = "output." + format;

  if (req.file) {
    sharp(req.file.path)
      .resize(width, height)
      .rotate(rotationDegree)
      .linear(contrastLevel, brightnessLevel)
      .modulate({ saturation: saturationLevel })
      .toFile(outputFilePath, (err, info) => {
        if (err) throw err;
        res.download(outputFilePath, (err) => {
          if (err) throw err;
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      });
  }
}

async function generatePreview(
  width,
  height,
  rotationDegree,
  brightnessLevel,
  saturationLevel,
  contrastLevel,
  req,
  res
) {
  // outputFilePath = Date.now() + "output." + format;
  try {
    if (req.file) {
      const imageBuffer = await sharp(req.file.path)
        .resize(width, height)
        .rotate(rotationDegree)
        .linear(contrastLevel, brightnessLevel)
        .modulate({ saturation: saturationLevel })
        .toBuffer();
      previewBuffer = imageBuffer;
    }
  } catch (error) {
    console.error("Error generating preview:", error);
    throw error;
  }
}

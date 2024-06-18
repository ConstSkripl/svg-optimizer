const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");

const svgoConfig = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          convertColors: false,
          removeViewBox: false,
        },
      },
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill-opacity)",
      },
    },
  ],
};

async function optimizeSVGs(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeSVGs(filePath);
    } else if (path.extname(file) === ".svg") {
      const svgData = fs.readFileSync(filePath, "utf-8");
      const optimizedSVG = optimize(svgData, {
        path: filePath,
        ...svgoConfig,
      }).data;
      fs.writeFileSync(filePath, optimizedSVG);
      console.log(`Optimized: ${filePath}`);
    }
  }
}

module.exports = { optimizeSVGs };

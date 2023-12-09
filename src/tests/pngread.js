import fs from "fs";

export const getPngData = (path) => {
  const buffer = fs.readFileSync(path);
  const pngData = new Uint8Array(buffer.buffer);
  const dataView = new DataView(buffer.buffer);

  if (dataView.getUint32(0) !== 0x89504e47) {
    console.error("Not a valid PNG file");
    return;
  }

  // Start searching for chunks after the PNG signature
  let offset = 8;
  let txt_chunks = {};
  // Loop through the chunks in the PNG file
  while (offset < pngData.length) {
    // Get the length of the chunk
    const length = dataView.getUint32(offset);
    // Get the chunk type
    const type = String.fromCharCode(...pngData.slice(offset + 4, offset + 8));
    if (type === "tEXt" || type == "comf") {
      // Get the keyword
      let keyword_end = offset + 8;
      while (pngData[keyword_end] !== 0) {
        keyword_end++;
      }
      const keyword = String.fromCharCode(
        ...pngData.slice(offset + 8, keyword_end)
      );
      // Get the text
      const contentArraySegment = pngData.slice(
        keyword_end + 1,
        offset + 8 + length
      );
      const contentJson = Array.from(contentArraySegment)
        .map((s) => String.fromCharCode(s))
        .join("");
      txt_chunks[keyword] = contentJson;
    }

    offset += 12 + length;
  }

  return txt_chunks;
};

const pngData = getPngData(
  "/Users/fyzz/Development/Next/gallery/public/Instant LoRA 3.png"
);

// get all strings in "<random node>".class_type
const array = Object.keys(JSON.parse(pngData.prompt)).map((key) => {
    if (JSON.parse(pngData.prompt)[key].class_type === "CLIPTextEncode") {
        return JSON.parse(pngData.prompt)[key].inputs.text;
    }
})

console.log(array);
// console.log(JSON.parse(pngData.prompt));

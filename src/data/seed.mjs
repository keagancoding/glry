import fs from "fs";

const baseUrl = "/Users/fyzz/Development/Next/gallery/public";
const output = "/Users/fyzz/Development/Next/gallery/src/data";

const formatPhotos = () => {
  // fs.unlinkSync(`${output}/photos.json`);
  // fs.unlinkSync(`${output}/tags.json`);
  const tagsUsed = [];
  const photos = fs.readdirSync(baseUrl).map((fileName) => {
    // tag logic for now just random
    const tag = ["one", "two", "three", "four"][Math.floor(Math.random() * 4)];

    // add tag it its not in the list
    if (!tagsUsed.includes(tag)) {
      tagsUsed.push(tag);
    }

    return {
      src: `/${fileName}`,
      tags: [tag],
    };
  });

  fs.writeFileSync(
    `${output}/photos.json`,
    JSON.stringify({ photos }, null, 2)
  );

  fs.writeFileSync(
    `${output}/tags.json`,
    JSON.stringify({ tags: tagsUsed }, null, 2)
  );

  console.log(
`🌱 Seeded Local Data
- ${photos.length} photos
- ${tagsUsed.length} tags
  `
  );
};

formatPhotos();

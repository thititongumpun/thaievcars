import {writeFileSync} from "node:fs";
import {mkdirSync} from "node:fs";

const size = 32;
const width = size;
const height = size;
const pixels = Buffer.alloc(width * height * 4);

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const row = height - 1 - y;
  const index = (row * width + x) * 4;
  pixels[index] = b;
  pixels[index + 1] = g;
  pixels[index + 2] = r;
  pixels[index + 3] = a;
}

function fillRect(x0, y0, x1, y1, color) {
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      setPixel(x, y, ...color);
    }
  }
}

function fillCircle(cx, cy, radius, color) {
  for (let y = cy - radius; y <= cy + radius; y += 1) {
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) {
        setPixel(x, y, ...color);
      }
    }
  }
}

function fillRoundedRect(x0, y0, x1, y1, radius, color) {
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const dx = x < x0 + radius ? x0 + radius - x : x >= x1 - radius ? x - (x1 - radius - 1) : 0;
      const dy = y < y0 + radius ? y0 + radius - y : y >= y1 - radius ? y - (y1 - radius - 1) : 0;
      if (dx * dx + dy * dy <= radius * radius) {
        setPixel(x, y, ...color);
      }
    }
  }
}

fillRoundedRect(0, 0, 32, 32, 7, [34, 197, 94, 255]);
fillRect(7, 18, 26, 23, [5, 46, 22, 255]);
fillRect(10, 13, 23, 19, [5, 46, 22, 255]);
fillRect(12, 14, 21, 17, [220, 252, 231, 255]);
fillCircle(10, 23, 3, [248, 250, 252, 255]);
fillCircle(23, 23, 3, [248, 250, 252, 255]);
fillRect(22, 7, 29, 10, [248, 250, 252, 255]);
fillRect(24, 5, 27, 12, [248, 250, 252, 255]);

const bitmapHeader = Buffer.alloc(40);
bitmapHeader.writeUInt32LE(40, 0);
bitmapHeader.writeInt32LE(width, 4);
bitmapHeader.writeInt32LE(height * 2, 8);
bitmapHeader.writeUInt16LE(1, 12);
bitmapHeader.writeUInt16LE(32, 14);
bitmapHeader.writeUInt32LE(0, 16);
bitmapHeader.writeUInt32LE(pixels.length, 20);

const mask = Buffer.alloc(Math.ceil(width / 32) * 4 * height);
const imageData = Buffer.concat([bitmapHeader, pixels, mask]);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const entry = Buffer.alloc(16);
entry.writeUInt8(width, 0);
entry.writeUInt8(height, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(imageData.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12);

mkdirSync("public", {recursive: true});
writeFileSync("public/favicon.ico", Buffer.concat([header, entry, imageData]));

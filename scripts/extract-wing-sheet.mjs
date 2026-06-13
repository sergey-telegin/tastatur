import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { deflateSync, inflateSync } from "node:zlib";

const sourcePath = "assets/source/flykey-wing-animation-sheet.png";
const outputDir = "assets/game/key/wings-from-sheet";
const separatedOutputDir = "assets/game/key/wings-separated";

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

const crc32 = (buffers) => {
  let crc = 0xffffffff;
  for (const buffer of buffers) {
    for (const byte of buffer) {
      crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const chunk = (type, data = Buffer.alloc(0)) => {
  const name = Buffer.from(type, "ascii");
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  name.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32([name, data]), 8 + data.length);
  return out;
};

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
};

const decodePng = (buffer) => {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Source is not a PNG file.");
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
    throw new Error(`Unsupported PNG format: bitDepth=${bitDepth}, colorType=${colorType}`);
  }

  const channels = colorType === 6 ? 4 : 3;
  const bpp = channels;
  const stride = width * channels;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(width * height * 4);
  let input = 0;
  let previous = Buffer.alloc(stride);

  for (let y = 0; y < height; y += 1) {
    const filter = raw[input];
    input += 1;
    const row = Buffer.alloc(stride);

    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? row[x - bpp] : 0;
      const up = previous[x] || 0;
      const upLeft = x >= bpp ? previous[x - bpp] || 0 : 0;
      const value = raw[input + x];
      if (filter === 0) row[x] = value;
      else if (filter === 1) row[x] = (value + left) & 0xff;
      else if (filter === 2) row[x] = (value + up) & 0xff;
      else if (filter === 3) row[x] = (value + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) row[x] = (value + paeth(left, up, upLeft)) & 0xff;
      else throw new Error(`Unsupported PNG filter ${filter}`);
    }
    input += stride;

    for (let x = 0; x < width; x += 1) {
      const src = x * channels;
      const dst = (y * width + x) * 4;
      pixels[dst] = row[src];
      pixels[dst + 1] = row[src + 1];
      pixels[dst + 2] = row[src + 2];
      pixels[dst + 3] = channels === 4 ? row[src + 3] : 255;
    }

    previous = row;
  }

  return { width, height, pixels };
};

const encodePng = ({ width, height, pixels }) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  return Buffer.concat([
    Buffer.from("89504e470d0a1a0a", "hex"),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND")
  ]);
};

const sample = (source, x, y) => {
  const clampedX = Math.max(0, Math.min(source.width - 1, Math.round(x)));
  const clampedY = Math.max(0, Math.min(source.height - 1, Math.round(y)));
  const index = (clampedY * source.width + clampedX) * 4;
  return [
    source.pixels[index],
    source.pixels[index + 1],
    source.pixels[index + 2],
    source.pixels[index + 3]
  ];
};

const removeBlackBackground = ([r, g, b, a]) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  if (max < 10 || (max < 30 && chroma < 12)) return [r, g, b, 0];
  if (max < 92 && chroma < 48) return [r, g, b, 0];
  return [r, g, b, a];
};

const isSheetBackground = (pixels, width, x, y) => {
  const index = (y * width + x) * 4;
  const r = pixels[index];
  const g = pixels[index + 1];
  const b = pixels[index + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  return max < 118 && chroma < 58;
};

const eraseConnectedBackground = ({ width, height, pixels }) => {
  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const id = y * width + x;
    if (visited[id]) return;
    visited[id] = 1;
    if (isSheetBackground(pixels, width, x, y)) stack.push([x, y]);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const [x, y] = stack.pop();
    pixels[(y * width + x) * 4 + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
};

const cropFrame = (source, frameIndex, side = "pair") => {
  const cellW = source.width / 5;
  const cellH = source.height / 4;
  const col = frameIndex % 5;
  const row = Math.floor(frameIndex / 5);
  const sx = col * cellW;
  const sy = row * cellH + 18;
  const sw = cellW;
  const sh = 178;
  const width = 640;
  const height = 360;
  const pixels = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dst = (y * width + x) * 4;
      if (x < 72 || x >= 568 || y < 36 || y >= 286 || (x < 130 && y < 94)) {
        pixels[dst + 3] = 0;
        continue;
      }

      const px = sx + ((x - 72) / 496) * sw;
      const py = sy + ((y - 36) / 250) * sh;
      const center = sx + sw / 2;
      if ((side === "left" && px > center + 14) || (side === "right" && px < center - 14)) {
        pixels[dst + 3] = 0;
        continue;
      }

      const [r, g, b, a] = removeBlackBackground(sample(source, px, py));
      pixels[dst] = r;
      pixels[dst + 1] = g;
      pixels[dst + 2] = b;
      pixels[dst + 3] = a;
    }
  }

  const frame = { width, height, pixels };
  eraseConnectedBackground(frame);
  return frame;
};

mkdirSync(outputDir, { recursive: true });
mkdirSync(join(separatedOutputDir, "left"), { recursive: true });
mkdirSync(join(separatedOutputDir, "right"), { recursive: true });
const source = decodePng(readFileSync(sourcePath));

for (let frame = 0; frame < 20; frame += 1) {
  const png = encodePng(cropFrame(source, frame));
  const fileName = `wing-frame-${String(frame + 1).padStart(2, "0")}.png`;
  writeFileSync(join(outputDir, fileName), png);

  for (const side of ["left", "right"]) {
    const sidePng = encodePng(cropFrame(source, frame, side));
    const sideFileName = `wing-${side}-${String(frame + 1).padStart(2, "0")}.png`;
    writeFileSync(join(separatedOutputDir, side, sideFileName), sidePng);
  }
}

console.log(`Extracted 20 pair frames into ${outputDir}`);
console.log(`Extracted 20 left/right wing frames into ${separatedOutputDir}`);

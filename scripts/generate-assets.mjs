import * as fs from "fs";
import * as zlib from "zlib";

// ---- GLB Generator ----
function createGLB() {
  const gltf = {
    asset: { version: "2.0", generator: "KSpace" },
    scene: 0,
    scenes: [{ nodes: [0, 1, 2] }],
    nodes: [
      { name: "card", mesh: 0 },
      { name: "clip", mesh: 1, translation: [0, -0.55, 0.01] },
      { name: "clamp", mesh: 2, translation: [0, -0.55, 0.03] },
    ],
    meshes: [
      { name: "card", primitives: [{ attributes: { POSITION: 0, NORMAL: 1, TEXCOORD_0: 2 }, indices: 3, material: 0 }] },
      { name: "clip", primitives: [{ attributes: { POSITION: 4, NORMAL: 5 }, material: 1 }] },
      { name: "clamp", primitives: [{ attributes: { POSITION: 6, NORMAL: 7 }, material: 1 }] },
    ],
    materials: [
      { name: "base", pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], roughnessFactor: 0.9, metallicFactor: 0.8 } },
      { name: "metal", pbrMetallicRoughness: { baseColorFactor: [0.8, 0.8, 0.8, 1], roughnessFactor: 0.3, metallicFactor: 1 } },
    ],
    accessors: [
      { bufferView: 0, componentType: 5126, count: 24, type: "VEC3", max: [0.35, 0.5, 0.005], min: [-0.35, -0.5, -0.005] },
      { bufferView: 1, componentType: 5126, count: 24, type: "VEC3" },
      { bufferView: 2, componentType: 5126, count: 24, type: "VEC2" },
      { bufferView: 3, componentType: 5125, count: 36, type: "SCALAR" },
      { bufferView: 4, componentType: 5126, count: 24, type: "VEC3", max: [0.025, 0.075, 0.01], min: [-0.025, -0.075, -0.01] },
      { bufferView: 5, componentType: 5126, count: 24, type: "VEC3" },
      { bufferView: 6, componentType: 5126, count: 24, type: "VEC3", max: [0.05, 0.04, 0.015], min: [-0.05, -0.04, -0.015] },
      { bufferView: 7, componentType: 5126, count: 24, type: "VEC3" },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: 288 },
      { buffer: 0, byteOffset: 288, byteLength: 288 },
      { buffer: 0, byteOffset: 576, byteLength: 192 },
      { buffer: 0, byteOffset: 768, byteLength: 144 },
      { buffer: 0, byteOffset: 912, byteLength: 288 },
      { buffer: 0, byteOffset: 1200, byteLength: 288 },
      { buffer: 0, byteOffset: 1488, byteLength: 288 },
      { buffer: 0, byteOffset: 1776, byteLength: 288 },
    ],
    buffers: [{ byteLength: 2064 }],
  };

  const jsonStr = JSON.stringify(gltf);
  let jsonBuf = Buffer.from(jsonStr, "utf8");
  while (jsonBuf.length % 4 !== 0) jsonBuf = Buffer.concat([jsonBuf, Buffer.from(" ")]);

  function boxVerts(w, h, d) {
    const hw = w / 2, hh = h / 2, hd = d / 2;
    return new Float32Array([
      -hw, -hh, hd, hw, -hh, hd, hw, hh, hd, -hw, hh, hd,
      -hw, -hh, -hd, -hw, hh, -hd, hw, hh, -hd, hw, -hh, -hd,
      -hw, hh, hd, hw, hh, hd, hw, hh, -hd, -hw, hh, -hd,
      -hw, -hh, hd, -hw, -hh, -hd, hw, -hh, -hd, hw, -hh, hd,
      hw, -hh, hd, hw, -hh, -hd, hw, hh, -hd, hw, hh, hd,
      -hw, -hh, hd, -hw, hh, hd, -hw, hh, -hd, -hw, -hh, -hd,
    ]);
  }

  function boxNorms() {
    return new Float32Array([
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    ]);
  }

  function boxUVs() {
    return new Float32Array([
      0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1,
      0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1,
      0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1,
    ]);
  }

  function boxIndices() {
    return new Uint32Array([
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
    ]);
  }

  const cardVerts = boxVerts(0.7, 1.0, 0.01);
  const cardNorms = boxNorms();
  const cardUVs = boxUVs();
  const cardIdx = boxIndices();
  const clipVerts = boxVerts(0.05, 0.15, 0.02);
  const clipNorms = boxNorms();
  const clampVerts = boxVerts(0.1, 0.08, 0.03);
  const clampNorms = boxNorms();

  let binBuf = Buffer.concat([
    Buffer.from(cardVerts.buffer),
    Buffer.from(cardNorms.buffer),
    Buffer.from(cardUVs.buffer),
    Buffer.from(cardIdx.buffer),
    Buffer.from(clipVerts.buffer),
    Buffer.from(clipNorms.buffer),
    Buffer.from(clampVerts.buffer),
    Buffer.from(clampNorms.buffer),
  ]);
  while (binBuf.length % 4 !== 0) binBuf = Buffer.concat([binBuf, Buffer.from([0])]);

  const totalLen = 12 + 8 + jsonBuf.length + 8 + binBuf.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(totalLen, 8);

  const jsonChunk = Buffer.alloc(8);
  jsonChunk.writeUInt32LE(jsonBuf.length, 0);
  jsonChunk.writeUInt32LE(0x4e4f534a, 4);

  const binChunk = Buffer.alloc(8);
  binChunk.writeUInt32LE(binBuf.length, 0);
  binChunk.writeUInt32LE(0x004e4942, 4);

  return Buffer.concat([header, jsonChunk, jsonBuf, binChunk, binBuf]);
}

// ---- PNG Generator ----
function crc32(buf) {
  let crc = 0xffffffff;
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function makePNGChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createLanyardPNG() {
  const width = 256,
    height = 16;
  const IHDR = Buffer.alloc(13);
  IHDR.writeUInt32BE(width, 0);
  IHDR.writeUInt32BE(height, 4);
  IHDR.writeUInt8(8, 8);
  IHDR.writeUInt8(2, 9);
  IHDR.writeUInt8(0, 10);
  IHDR.writeUInt8(0, 11);
  IHDR.writeUInt8(0, 12);

  const rawData = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    rawData[y * (1 + width * 3)] = 0;
    for (let x = 0; x < width; x++) {
      const off = y * (1 + width * 3) + 1 + x * 3;
      const v = 180 + Math.floor(75 * Math.sin((x / 20 + y / 5) * Math.PI));
      rawData[off] = v;
      rawData[off + 1] = v;
      rawData[off + 2] = v;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    makePNGChunk("IHDR", IHDR),
    makePNGChunk("IDAT", compressed),
    makePNGChunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---- Main ----
fs.mkdirSync("public/assets/lanyard", { recursive: true });
fs.writeFileSync("public/assets/lanyard/card.glb", createGLB());
console.log("✓ card.glb created");
fs.writeFileSync("public/assets/lanyard/lanyard.png", createLanyardPNG());
console.log("✓ lanyard.png created");

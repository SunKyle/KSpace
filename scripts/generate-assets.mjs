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

// ---- PNG Generator (minimal valid 64x64 striped texture) ----
function createLanyardPNG() {
  // Generate a simple striped pattern as raw RGBA pixels
  const size = 64;
  const rawPixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const off = (y * size + x) * 4;
      const stripe = Math.sin(x * 0.15 + y * 0.3) > 0 ? 200 : 120;
      rawPixels[off] = stripe;     // R
      rawPixels[off + 1] = stripe; // G
      rawPixels[off + 2] = stripe; // B
      rawPixels[off + 3] = 255;    // A
    }
  }

  // Filter each row (filter byte 0 = None)
  const rowLen = 1 + size * 4;
  const rawData = Buffer.alloc(size * rowLen);
  for (let y = 0; y < size; y++) {
    rawData[y * rowLen] = 0; // filter: None
    rawPixels.copy(rawData, y * rowLen + 1, y * size * 4, (y + 1) * size * 4);
  }

  const compressed = zlib.deflateSync(rawData);

  // Build PNG manually
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const IHDR = Buffer.alloc(13);
  IHDR.writeUInt32BE(size, 0);
  IHDR.writeUInt32BE(size, 4);
  IHDR.writeUInt8(8, 8);  // bit depth
  IHDR.writeUInt8(6, 9);  // color type: RGBA
  IHDR.writeUInt8(0, 10);
  IHDR.writeUInt8(0, 11);
  IHDR.writeUInt8(0, 12);

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = ((c >>> 8) ^ [
        0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f,
        0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988,
        0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2,
        0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7,
        0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
        0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172,
        0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c,
        0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59,
        0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423,
        0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
        0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x01db7106,
        0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433,
        0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d,
        0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e,
        0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
        0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65,
        0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7,
        0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0,
        0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa,
        0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
        0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81,
        0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a,
        0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84,
        0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
        0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
        0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc,
        0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e,
        0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b,
        0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55,
        0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
        0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28,
        0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d,
        0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f,
        0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38,
        0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
        0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777,
        0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69,
        0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2,
        0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc,
        0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
        0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693,
        0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94,
        0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
      ][(c ^ buf[i]) & 0xff]) >>> 0;
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeB = Buffer.from(type, "ascii");
    const crc = crc32(Buffer.concat([typeB, data]));
    const crcB = Buffer.alloc(4);
    crcB.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeB, data, crcB]);
  }

  return Buffer.concat([
    signature,
    chunk("IHDR", IHDR),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---- Main ----
fs.mkdirSync("public/assets/lanyard", { recursive: true });
fs.writeFileSync("public/assets/lanyard/card.glb", createGLB());
console.log("✓ card.glb created");
fs.writeFileSync("public/assets/lanyard/lanyard.png", createLanyardPNG());
console.log("✓ lanyard.png created");

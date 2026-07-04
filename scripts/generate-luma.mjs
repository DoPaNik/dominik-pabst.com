import sharp from 'sharp';

const SOURCE_PHOTO_URL =
  'https://heise.cloudimg.io/v7/https://images.ctfassets.net/3ujuzjed3id8/6566ZA8PfVFTyCwwbUO17D/7bd437a2561ed3251834a7e8583ce58b/Novatec_Mitarbeiterportraits_Dominik_Pabst_003.jpg?org_if_sml=1&w=800&gray=1&bright=10&sharp=1&q=80&optipress=2';
const LUMA_OUTPUT_PATH = 'public/images/dominik-luma.png';
const LOW = 70, HIGH = 150, BLUR = 4, CLOSE_R = 18;

async function blurMask(buf, width, height, sigma) {
  const { data } = await sharp(buf, { raw: { width, height, channels: 1 } })
    .blur(sigma)
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

function floodFillBackground(buf, width, height) {
  // returns Uint8Array: 1 = background pixel reachable from border (value===0, connected to edge)
  const reached = new Uint8Array(width * height);
  const stack = [];
  const seed = (x, y) => {
    const idx = y * width + x;
    if (buf[idx] === 0) stack.push(idx);
  };
  for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height - 1); }
  for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y); }
  while (stack.length) {
    const idx = stack.pop();
    if (reached[idx]) continue;
    reached[idx] = 1;
    const x = idx % width, y = (idx - x) / width;
    for (const [nx, ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]) {
      if (nx<0||ny<0||nx>=width||ny>=height) continue;
      const nIdx = ny*width+nx;
      if (reached[nIdx] || buf[nIdx] !== 0) continue;
      stack.push(nIdx);
    }
  }
  return reached;
}

function largestComponent(buf, width, height) {
  const visited = new Uint8Array(width * height);
  let largest = [];
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] !== 255 || visited[i]) continue;
    const stack = [i];
    const comp = [];
    visited[i] = 1;
    while (stack.length) {
      const idx = stack.pop();
      comp.push(idx);
      const x = idx % width, y = (idx - x) / width;
      for (const [nx, ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]) {
        if (nx<0||ny<0||nx>=width||ny>=height) continue;
        const nIdx = ny*width+nx;
        if (visited[nIdx] || buf[nIdx] !== 255) continue;
        visited[nIdx] = 1;
        stack.push(nIdx);
      }
    }
    if (comp.length > largest.length) largest = comp;
  }
  return largest;
}

async function main() {
  const res = await fetch(SOURCE_PHOTO_URL);
  const photoBuf = Buffer.from(await res.arrayBuffer());

  const { data, info } = await sharp(photoBuf).grayscale().blur(BLUR).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  let mask = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    const v = data[i];
    mask[i] = (v < LOW || v > HIGH) ? 255 : 0;
  }

  let dilated = Buffer.from(await blurMask(mask, width, height, CLOSE_R));
  for (let i = 0; i < dilated.length; i++) dilated[i] = dilated[i] > 8 ? 255 : 0;

  let closed = Buffer.from(await blurMask(dilated, width, height, CLOSE_R));
  for (let i = 0; i < closed.length; i++) closed[i] = closed[i] > 247 ? 255 : 0;

  const largest = largestComponent(closed, width, height);
  const silhouette = Buffer.alloc(width * height);
  for (const idx of largest) silhouette[idx] = 255;

  // fill any enclosed holes (background pixels not reachable from the border)
  const reachedBg = floodFillBackground(silhouette, width, height);
  for (let i = 0; i < silhouette.length; i++) {
    if (silhouette[i] === 0 && !reachedBg[i]) silhouette[i] = 255;
  }

  // feather the edge slightly for anti-aliasing
  const feathered = Buffer.from(await blurMask(silhouette, width, height, 2));

  // Luma map: brightness pre-blurred to the scale the rain grid will downsample to (removing
  // skin/hair texture noise that would otherwise alias), then contrast-stretched so the broad
  // facial tones (forehead, eye sockets, nose bridge, mouth) survive the downsample. Masked to
  // the silhouette — used to modulate glyph density/brightness so the face reads through the
  // falling code.
  const { data: sharpData } = await sharp(photoBuf)
    .grayscale()
    .blur(9)
    .normalize()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const luma = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const t = Math.round(Math.pow(sharpData[i] / 255, 0.7) * 255);
    const o = i * 4;
    luma[o] = t;
    luma[o + 1] = t;
    luma[o + 2] = t;
    luma[o + 3] = feathered[i];
  }

  await sharp(luma, { raw: { width, height, channels: 4 } }).png().toFile(LUMA_OUTPUT_PATH);
  console.log(`Luma map written to ${LUMA_OUTPUT_PATH}`);
}

main();

import sharp from 'sharp';

/**
 * Fetches the source portrait photo and stores it as a 4:5 display asset
 * for the About-page MatrixPortrait (real <img>, canvas is an enhancement).
 */
const SOURCE_PHOTO_URL =
  'https://heise.cloudimg.io/v7/https://images.ctfassets.net/3ujuzjed3id8/6566ZA8PfVFTyCwwbUO17D/7bd437a2561ed3251834a7e8583ce58b/Novatec_Mitarbeiterportraits_Dominik_Pabst_003.jpg?org_if_sml=1&w=1200&gray=1&bright=10&sharp=1&q=90&optipress=2';
const OUTPUT_PATH = 'public/images/dominik-portrait.jpg';
const WIDTH = 840;
const HEIGHT = 1050; // 4:5

const res = await fetch(SOURCE_PHOTO_URL);
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());

await sharp(buf)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUTPUT_PATH);

console.log(`Portrait written to ${OUTPUT_PATH} (${WIDTH}x${HEIGHT})`);

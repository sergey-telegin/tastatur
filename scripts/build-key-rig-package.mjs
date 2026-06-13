import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = path.join(repoRoot, "assets/game/key-rig");
const svgDir = path.join(packageRoot, "svg");
const pngDir = path.join(packageRoot, "parts");
const renderDir = path.join(packageRoot, ".render");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });
mkdirSync(renderDir, { recursive: true });

const defs = `
  <defs>
    <radialGradient id="fur" cx="42%" cy="34%" r="62%">
      <stop offset="0" stop-color="#9ee2ff"/>
      <stop offset="0.58" stop-color="#3b9fdb"/>
      <stop offset="1" stop-color="#11679c"/>
    </radialGradient>
    <linearGradient id="hoodie" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe66d"/>
      <stop offset="1" stop-color="#f2ad13"/>
    </linearGradient>
    <linearGradient id="dark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#17354e"/>
      <stop offset="1" stop-color="#061624"/>
    </linearGradient>
    <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.96"/>
      <stop offset="0.62" stop-color="#e9fbff" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#adcfd9" stop-opacity="0.46"/>
    </linearGradient>
  </defs>`;

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${defs}${inner}</svg>`;
const eye = (cx, cy, rx = 83, ry = 96, pupil = 43) => `
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff"/>
  <circle cx="${cx + 18}" cy="${cy + 15}" r="${pupil}" fill="#06233a"/>
  <circle cx="${cx + 38}" cy="${cy - 18}" r="17" fill="#fff"/>`;

const parts = {
  "01_head": wrap(`
    <ellipse cx="512" cy="486" rx="232" ry="208" fill="url(#fur)"/>
    <path d="M315 458c31-81 113-132 206-127 91 5 160 63 185 141-52-42-114-60-188-59-77 2-143 17-203 45z" fill="#73c4f4" opacity=".42"/>
    <ellipse cx="410" cy="502" rx="40" ry="26" fill="#ff84a4" opacity=".62"/>
    <ellipse cx="616" cy="502" rx="40" ry="26" fill="#ff84a4" opacity=".62"/>
    <path d="M452 553c39 43 99 43 138 0" fill="none" stroke="#061624" stroke-width="24" stroke-linecap="round"/>
    <path d="M430 404c34-21 72-22 108-2" fill="none" stroke="#092c45" stroke-width="18" stroke-linecap="round" opacity=".82"/>
    <path d="M614 404c-34-21-72-22-108-2" fill="none" stroke="#092c45" stroke-width="18" stroke-linecap="round" opacity=".82"/>
    <circle cx="489" cy="497" r="7" fill="#061624" opacity=".78"/>
    <circle cx="535" cy="497" r="7" fill="#061624" opacity=".78"/>`),
  "02_body": wrap(`
    <path d="M328 384c27-119 105-188 184-188s157 69 184 188l36 246c15 104-72 178-220 178s-235-74-220-178z" fill="url(#fur)"/>
    <path d="M336 392c63 64 290 64 353 0l39 241c15 101-72 175-216 175s-231-74-216-175z" fill="url(#hoodie)"/>
    <path d="M392 504c46 42 194 45 240 0l26 236c-48 43-244 43-292 0z" fill="#ffc72c"/>
    <path d="M452 392c14-43 38-69 60-69s46 26 60 69c-34 36-86 36-120 0z" fill="#0d4d75"/>
    <path d="M486 535h56v188h-56z" fill="#fff" opacity=".95"/>
    <path d="M553 626l81-91h67l-95 105 102 83h-75l-80-64z" fill="#fff" opacity=".95"/>`),
  "03_left_antenna": wrap(`
    <path d="M626 795C526 608 432 396 310 207" fill="none" stroke="#061624" stroke-width="42" stroke-linecap="round"/>
    <path d="M626 795C526 608 432 396 310 207" fill="none" stroke="#25577c" stroke-width="14" stroke-linecap="round" opacity=".62"/>
    <ellipse cx="292" cy="184" rx="70" ry="43" transform="rotate(-23 292 184)" fill="#061624"/>
    <ellipse cx="267" cy="164" rx="25" ry="10" transform="rotate(-23 267 164)" fill="#315f83" opacity=".72"/>`),
  "04_right_antenna": wrap(`
    <path d="M398 795c100-187 194-399 316-588" fill="none" stroke="#061624" stroke-width="42" stroke-linecap="round"/>
    <path d="M398 795c100-187 194-399 316-588" fill="none" stroke="#25577c" stroke-width="14" stroke-linecap="round" opacity=".62"/>
    <ellipse cx="732" cy="184" rx="70" ry="43" transform="rotate(23 732 184)" fill="#061624"/>
    <ellipse cx="757" cy="164" rx="25" ry="10" transform="rotate(23 757 164)" fill="#315f83" opacity=".72"/>`),
  "05_left_eye": wrap(eye(512, 512)),
  "06_right_eye": wrap(eye(512, 512)),
  "07_left_wing": wrap(`
    <path d="M724 169C461 199 266 426 303 698c16 117 99 160 196 86 142-108 242-348 225-615z" fill="url(#wing)" stroke="#91b8c4" stroke-width="16"/>
    <path d="M671 272C530 374 423 533 378 730M610 248c-45 176-60 345-48 508M528 311c-72 142-105 281-96 425" fill="none" stroke="#718f9b" stroke-width="10" opacity=".52" stroke-linecap="round"/>`),
  "08_right_wing": wrap(`
    <path d="M300 169c263 30 458 257 421 529-16 117-99 160-196 86C383 676 283 436 300 169z" fill="url(#wing)" stroke="#91b8c4" stroke-width="16"/>
    <path d="M353 272c141 102 248 261 293 458M414 248c45 176 60 345 48 508M496 311c72 142 105 281 96 425" fill="none" stroke="#718f9b" stroke-width="10" opacity=".52" stroke-linecap="round"/>`),
  "09_left_arm": wrap(`
    <path d="M716 360c-158 22-267 123-297 267-14 66 34 96 91 47 70-60 111-159 159-252z" fill="#18344c"/>
    <path d="M676 366c-134 39-219 128-247 257" fill="none" stroke="#315f83" stroke-width="18" opacity=".45" stroke-linecap="round"/>
    <path d="M384 682c-63 22-126 13-155-28 54-31 121-28 177 4 15 9 8 18-22 24z" fill="#17344d"/>`),
  "10_right_arm": wrap(`
    <path d="M308 360c158 22 267 123 297 267 14 66-34 96-91 47-70-60-111-159-159-252z" fill="#18344c"/>
    <path d="M348 366c134 39 219 128 247 257" fill="none" stroke="#315f83" stroke-width="18" opacity=".45" stroke-linecap="round"/>
    <path d="M640 682c63 22 126 13 155-28-54-31-121-28-177 4-15 9-8 18 22 24z" fill="#17344d"/>`),
  "11_left_leg": wrap(`
    <path d="M582 202c-31 156-54 313-75 470" fill="none" stroke="url(#dark)" stroke-width="58" stroke-linecap="round"/>
    <ellipse cx="498" cy="712" rx="52" ry="38" fill="#071827"/>
    <path d="M510 308c25-17 54-12 75 15" fill="none" stroke="#315f83" stroke-width="13" opacity=".5" stroke-linecap="round"/>`),
  "12_right_leg": wrap(`
    <path d="M442 202c31 156 54 313 75 470" fill="none" stroke="url(#dark)" stroke-width="58" stroke-linecap="round"/>
    <ellipse cx="526" cy="712" rx="52" ry="38" fill="#071827"/>
    <path d="M514 308c-25-17-54-12-75 15" fill="none" stroke="#315f83" stroke-width="13" opacity=".5" stroke-linecap="round"/>`),
  "13_left_foot": wrap(`
    <path d="M514 596c-98 2-179-25-191-82 73-66 201-62 283-11 25 61-9 91-92 93z" fill="#071827"/>
    <path d="M371 509c57-28 127-27 189 1" fill="none" stroke="#315f83" stroke-width="14" opacity=".42" stroke-linecap="round"/>`),
  "14_right_foot": wrap(`
    <path d="M510 596c98 2 179-25 191-82-73-66-201-62-283-11-25 61 9 91 92 93z" fill="#071827"/>
    <path d="M653 509c-57-28-127-27-189 1" fill="none" stroke="#315f83" stroke-width="14" opacity=".42" stroke-linecap="round"/>`),
  "15_closed_eyes": wrap(`
    <path d="M350 512c56 40 116 40 172 0" fill="none" stroke="#061624" stroke-width="28" stroke-linecap="round"/>
    <path d="M502 512c56 40 116 40 172 0" fill="none" stroke="#061624" stroke-width="28" stroke-linecap="round"/>`),
  "16_surprised_eyes": wrap(`${eye(416, 512, 96, 110, 44)}${eye(608, 512, 96, 110, 44)}`),
  "17_scared_eyes": wrap(`
    <ellipse cx="416" cy="512" rx="91" ry="107" fill="#fff"/>
    <ellipse cx="608" cy="512" rx="91" ry="107" fill="#fff"/>
    <circle cx="438" cy="548" r="33" fill="#06233a"/>
    <circle cx="586" cy="548" r="33" fill="#06233a"/>
    <path d="M348 391c55-36 112-40 171-10M505 381c59-30 116-26 171 10" fill="none" stroke="#061624" stroke-width="20" stroke-linecap="round"/>`),
  "18_focused_angry_eyes": wrap(`
    <path d="M315 430c84-42 160-38 223 12" fill="none" stroke="#061624" stroke-width="24" stroke-linecap="round"/>
    <path d="M709 430c-84-42-160-38-223 12" fill="none" stroke="#061624" stroke-width="24" stroke-linecap="round"/>
    <ellipse cx="416" cy="526" rx="82" ry="86" fill="#fff"/>
    <ellipse cx="608" cy="526" rx="82" ry="86" fill="#fff"/>
    <circle cx="446" cy="532" r="38" fill="#06233a"/>
    <circle cx="578" cy="532" r="38" fill="#06233a"/>
    <circle cx="462" cy="506" r="15" fill="#fff"/>
    <circle cx="594" cy="506" r="15" fill="#fff"/>`)
};

for (const [name, svg] of Object.entries(parts)) {
  const svgPath = path.join(svgDir, `${name}.svg`);
  const pngPath = path.join(pngDir, `${name}.png`);
  const htmlPath = path.join(renderDir, `${name}.html`);
  writeFileSync(svgPath, svg);
  writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:1024px;height:1024px;background:transparent;overflow:hidden}img{width:1024px;height:1024px;display:block}</style></head><body><img src="../svg/${name}.svg"></body></html>`);
  execFileSync(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--disable-extensions",
    "--window-size=1024,1024",
    "--default-background-color=00000000",
    `--screenshot=${pngPath}`,
    `file://${htmlPath}`
  ], { stdio: "ignore" });
}

writeFileSync(path.join(packageRoot, "metadata.json"), JSON.stringify({
  canvas: { width: 1024, height: 1024, background: "transparent" },
  visualReference: "/var/folders/c2/nv51x8yd527crhwx_b0xp5w80000gn/T/codex-clipboard-141cca90-dd87-451b-af6c-ec316c719133.png",
  parts: Object.fromEntries(Object.keys(parts).map((name) => [name, {
    png: `parts/${name}.png`,
    svg: `svg/${name}.svg`,
    pivot: { x: 512, y: 512 }
  }])),
  pivotsAndAttachments: {
    head: { rotationPoint: { x: 512, y: 694 }, bodyAttachment: { x: 512, y: 330 } },
    antennae: { leftHeadAttachment: { x: 425, y: 305 }, rightHeadAttachment: { x: 599, y: 305 } },
    wings: { leftBodyAttachment: { x: 420, y: 430 }, rightBodyAttachment: { x: 604, y: 430 } },
    arms: { leftShoulder: { x: 370, y: 410 }, rightShoulder: { x: 654, y: 410 } },
    legs: { leftHip: { x: 468, y: 760 }, rightHip: { x: 556, y: 760 } },
    feet: { leftAnkle: { x: 498, y: 712 }, rightAnkle: { x: 526, y: 712 } },
    eyes: { headFaceAttachment: { x: 512, y: 500 } }
  },
  animationStateMachine: {
    states: ["idle", "blink", "hover", "jump", "fall", "land", "turnLeft", "turnRight", "shoot", "recoil", "hit", "celebrate", "think"],
    blendPaths: ["idle->jump->fall->land->idle", "idle<->turnLeft", "idle<->turnRight", "idle->shoot->recoil->idle", "any->hit->idle"],
    secondaryMotion: ["antenna spring", "wing micro flutter", "hoodie bounce", "eye darts", "breathing scale"]
  }
}, null, 2));

rmSync(renderDir, { recursive: true, force: true });
console.log(`Built ${Object.keys(parts).length} FlyKey rig PNG parts in ${pngDir}`);

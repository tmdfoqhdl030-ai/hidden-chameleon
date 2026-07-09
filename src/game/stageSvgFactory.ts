import type { Stage } from "./gameTypes";

type SceneKind = "store" | "cafe" | "library" | "subway" | "kitchen" | "office" | "park" | "market" | "bedroom" | "posters";
type PoseKind = "wave" | "crawl" | "hang" | "jump" | "crouch" | "lean" | "star" | "peek" | "run" | "sit" | "stretch" | "tiptoe";

type StageDraft = Omit<Stage, "svg"> & {
  scene: SceneKind;
  pose: PoseKind;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  base: string;
  accent: string;
  line: string;
};

const rootSvg = (background: string, content: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img">
    <defs>
      <radialGradient id="stageLight" cx="24%" cy="12%" r="92%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.52"/>
        <stop offset="0.5" stop-color="${background}" stop-opacity="0.94"/>
        <stop offset="1" stop-color="#172033" stop-opacity="0.18"/>
      </radialGradient>
      <radialGradient id="bodyVolume" cx="28%" cy="18%" r="86%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.66"/>
        <stop offset="0.42" stop-color="${background}" stop-opacity="0.42"/>
        <stop offset="1" stop-color="#0f172a" stop-opacity="0.2"/>
      </radialGradient>
      <filter id="objectLift" x="-25%" y="-25%" width="155%" height="160%">
        <feDropShadow dx="1.6" dy="2.2" stdDeviation="1.25" flood-color="#0f172a" flood-opacity="0.28"/>
      </filter>
      <filter id="strongLift" x="-35%" y="-35%" width="175%" height="180%">
        <feDropShadow dx="2.2" dy="3.1" stdDeviation="1.5" flood-color="#0f172a" flood-opacity="0.34"/>
      </filter>
      <filter id="softGrain" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="noise"/>
        <feColorMatrix in="noise" type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.08"/>
        </feComponentTransfer>
        <feBlend in="SourceGraphic" mode="multiply"/>
      </filter>
    </defs>
    <rect width="100" height="100" fill="${background}"/>
    <path d="M0 0 H100 V66 H0Z" fill="#ffffff" opacity="0.08"/>
    <path d="M0 66 H100 V100 H0Z" fill="#0f172a" opacity="0.05"/>
    <path d="M0 66 L18 58 H82 L100 66 V100 H0Z" fill="#ffffff" opacity="0.1"/>
    <rect width="100" height="100" fill="url(#stageLight)"/>
    <path d="M4 5 H96 Q98 5 98 7 V94 Q98 97 95 97 H5 Q2 97 2 94 V7 Q2 5 4 5Z" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.22"/>
    <path d="M8 90 C30 96 70 96 92 90" fill="none" stroke="#0f172a" stroke-width="5" opacity="0.08"/>
    <rect width="100" height="100" fill="#ffffff" opacity="0.05" filter="url(#softGrain)"/>
    ${content}
  </svg>
`;

const overlaySvg = (content: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img">
    <defs>
      <radialGradient id="bodyVolume" cx="28%" cy="18%" r="86%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.82"/>
        <stop offset="0.34" stop-color="#f8fafc" stop-opacity="0.44"/>
        <stop offset="0.68" stop-color="#64748b" stop-opacity="0.2"/>
        <stop offset="1" stop-color="#0f172a" stop-opacity="0.34"/>
      </radialGradient>
      <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.7"/>
        <stop offset="0.44" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="1" stop-color="#0f172a" stop-opacity="0.22"/>
      </linearGradient>
      <filter id="strongLift" x="-35%" y="-35%" width="175%" height="180%">
        <feDropShadow dx="1.8" dy="2.8" stdDeviation="1.35" flood-color="#0f172a" flood-opacity="0.32"/>
      </filter>
      <filter id="innerSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="blur"/>
        <feOffset dx="1.1" dy="1.5" result="offsetBlur"/>
        <feComposite in="offsetBlur" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="innerShadow"/>
        <feColorMatrix in="innerShadow" type="matrix" values="0 0 0 0 0.04 0 0 0 0 0.08 0 0 0 0 0.14 0 0 0 0.46 0"/>
        <feBlend in="SourceGraphic" mode="multiply"/>
      </filter>
    </defs>
    ${content}
  </svg>
`;

const poseBodyPath = (pose: PoseKind): string => {
  const poses: Record<PoseKind, string> = {
    wave: "M-5 13 C1 8 19 8 24 12 L25 5 C25.6 2.4 29 2.8 29.3 5.5 L29.8 17 C30 20 26.8 21.5 24.8 19.4 L20.5 15.5 L18.8 34 C18.6 36 15 36 14.5 34 L11.8 22 L9.2 34 C8.8 36 5 36 4.6 34 L3 18 L-4 21 C-7 22.3 -8 18.5 -6 16.8Z",
    crawl: "M-8 18 C-2 11 16 10 24 15 L31 13 C34 12.2 35.2 15.7 32.6 17.4 L25 22 L13 21 L8 31 C7 33.2 3.7 32.2 4.4 29.8 L7 22 L-2 25 C-5 26.3 -7.8 21.8 -8 18Z",
    hang: "M-4 15 C1 10 19 10 24 15 L28 3 C29 0.5 32.5 1.7 31.6 4.4 L28 16 L19 18 L18.2 34 C18 36 14.8 36 14.4 34 L12 22 L9.6 34 C9.1 36 5.8 36 5.5 34 L5 18 L-4 16 L-7 5 C-8 2.5 -4.7 1 -3.6 3.5Z",
    jump: "M-5 13 C1 8 19 8 24 13 L31 9 C34 7.4 36 11 33.5 13.2 L25 20 L18.5 18 L24 31 C25.2 33.8 21.8 35.6 20 33 L14 23 L7 33 C5.4 35.4 1.8 33.4 3.2 30.8 L9 18 L3 20 L-5 14 C-7.4 12.3 -6.5 9 -4 10.3Z",
    crouch: "M-5 15 C0 10 19 10 24 15 L29 17 C32 18.3 30.7 22.5 27.8 21.5 L21 19 L18 27 L23 31 C25.3 32.8 23 36 20.4 34.6 L12 29 L4 34.5 C1.6 36 -0.8 32.7 1.4 31 L7 27 L4 19 L-3 21.5 C-6 22.7 -8 18.3 -5 15Z",
    lean: "M-1 11 C5 7 22 10 26 15 L31 22 C32.8 24.7 29.2 27 27.3 24.4 L22 18 L17 35 C16.3 37 12.8 36.4 13 34.2 L14 23 L6 34 C4.5 36.2 1 34 2.4 31.8 L8 20 L1 20 L-6 23 C-8.7 24.2 -10 20.2 -7.3 18.8Z",
    star: "M-6 13 C0 8 20 8 26 13 L34 9 C36.5 7.8 38 11.5 35.6 13.2 L27 20 L20 18 L24 33 C24.8 35.8 21.2 37 19.8 34.5 L13.5 22 L6.7 34.5 C5.3 37 1.8 35.5 2.8 32.8 L7 18 L0 20 L-8.5 13.2 C-10.8 11.4 -8.6 7.8 -6 13Z",
    peek: "M-3 14 C2 9 18 9 23 14 L29 14 C32 14 32.5 18.1 29.8 19.2 L22 22 L19 34 C18.5 36 15 36 14.5 34 L12 24 L9.5 34 C9 36 5.5 36 5 34 L2 22 L-5 19 C-8 17.7 -6.5 13.7 -3 14Z",
    run: "M-5 13 C1 8 19 8 24 13 L31 17 C33.7 18.8 31.5 22.5 29 20.8 L21 16 L17 23 L23 31 C25 33.3 22 36 19.8 33.9 L13 26 L5 34 C3 36 -0.2 33.2 1.8 31 L8 24 L3 18 L-5 20.4 C-8 21.8 -9 17.8 -6.2 16.3Z",
    sit: "M-4 13 C1 8 19 8 24 13 L28 19 C30 21.8 26.4 24.4 24.5 21.8 L20 17 L18 26 L26 29 C28.8 30 27.8 34 25 33.5 L14 31 L5 35 C2.1 36.2 0.2 32.3 2.8 30.8 L9 27 L4 18 L-3 21 C-6 22.2 -8 18.1 -5.4 16.3Z",
    stretch: "M-5 13 C1 8 19 8 24 12 L32 6 C34.4 4.2 36.7 7.6 34.5 9.5 L25 18 L19 18 L19 34 C18.8 36 15.3 36 14.8 34 L12 22 L9.2 34 C8.8 36 5.2 36 5 34 L5 18 L-2 14 L-8 8 C-10.2 5.8 -7.6 2.8 -5.4 5Z",
    tiptoe: "M-5 13 C1 8 19 8 24 13 L29 16 C31.8 17.7 30 21.7 27.4 20.2 L21 16 L18 34 C17.7 36 14.2 36 14 33.8 L13 21 L10.5 35 C10.1 37.2 6.5 36.8 6.5 34.5 L7 18 L-3 21 C-6 22.3 -8 18.3 -5 13Z"
  };

  return poses[pose];
};

const mascotPattern = (draft: StageDraft) => {
  if (draft.scene === "cafe") {
    return Array.from({ length: 10 }, (_, row) => {
      const y = -8 + row * 4.2;
      const bricks = Array.from({ length: 5 }, (_, index) => {
        const x = -7 + index * 7.7 + (row % 2 ? 3.8 : 0);
        return `<rect x="${x}" y="${y}" width="7" height="3.4" rx="0.4" fill="${draft.base}"/>`;
      }).join("");
      return `${bricks}<path d="M-8 ${y + 3.6} H33" stroke="${draft.line}" stroke-width="0.7" opacity="0.82"/>`;
    }).join("");
  }

  if (draft.scene === "park") {
    return Array.from({ length: 36 }, (_, index) => {
      const x = -7 + ((index * 7) % 40);
      const y = -8 + ((index * 11) % 48);
      return `<ellipse cx="${x}" cy="${y}" rx="2.8" ry="1.6" transform="rotate(${(index * 37) % 180} ${x} ${y})" fill="${index % 2 ? draft.base : draft.accent}" opacity="0.86"/>`;
    }).join("");
  }

  if (draft.scene === "market") {
    return Array.from({ length: 34 }, (_, index) => {
      const x = -7 + ((index * 7) % 40);
      const y = -7 + ((index * 5) % 45);
      return `<circle cx="${x}" cy="${y}" r="${1.7 + (index % 3) * 0.45}" fill="${index % 2 ? draft.base : draft.accent}" opacity="0.88"/>`;
    }).join("");
  }

  if (draft.scene === "bedroom") {
    return Array.from({ length: 26 }, (_, index) => {
      const x = -7 + ((index * 9) % 39);
      const y = -6 + ((index * 6) % 45);
      return `<path d="M${x} ${y} q3 -3.7 6 0 q-3 3.7 -6 0Z" fill="${index % 2 ? draft.base : draft.accent}" opacity="0.78"/>`;
    }).join("");
  }

  if (draft.scene === "kitchen" || draft.scene === "posters") {
    return Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 5 }, (_, index) => `<rect x="${-7 + index * 8}" y="${-8 + row * 5}" width="7.2" height="4.4" rx="0.6" fill="${index % 2 ? draft.base : draft.accent}" opacity="0.78"/>`).join("")
    ).join("");
  }

  if (draft.scene === "library" || draft.scene === "store") {
    return Array.from({ length: 30 }, (_, index) => {
      const x = -7 + ((index * 5.3) % 40);
      const y = -8 + Math.floor(index / 5) * 6.3;
      return `<rect x="${x}" y="${y}" width="4.2" height="8" rx="0.6" fill="${index % 2 ? draft.base : draft.accent}" opacity="0.82"/>
        <line x1="${x + 2}" y1="${y + 1.2}" x2="${x + 2}" y2="${y + 7}" stroke="#ffffff" stroke-opacity="0.22" stroke-width="0.35"/>`;
    }).join("");
  }

  return Array.from({ length: 11 }, (_, index) => `<path d="M-8 ${-7 + index * 4} H33" stroke="${index % 2 ? draft.base : draft.accent}" stroke-width="3.1" opacity="0.78"/>`).join("");
};

const mascot = (draft: StageDraft) => {
  const bodyPath = poseBodyPath(draft.pose);

  return `
  <g transform="translate(${draft.x} ${draft.y}) scale(${draft.scale})" opacity="${draft.opacity}" filter="url(#strongLift)">
    <defs>
      <clipPath id="mascotMask">
        <circle cx="12" cy="3.5" r="7.2"/>
        <path d="${bodyPath}"/>
      </clipPath>
    </defs>
    <ellipse cx="15" cy="39" rx="13.5" ry="3.8" fill="#0f172a" opacity="0.18"/>
    <g transform="translate(2.3 3)" opacity="0.28">
      <circle cx="12" cy="3.5" r="7.2" fill="#0f172a"/>
      <path d="${bodyPath}" fill="#0f172a"/>
    </g>
    <g filter="url(#innerSoftShadow)">
      <circle cx="12" cy="3.5" r="7.2" fill="url(#bodyVolume)" opacity="0.5"/>
      <path d="${bodyPath}" fill="url(#bodyVolume)" opacity="0.5"/>
    </g>
    <g clip-path="url(#mascotMask)">
      <rect x="-9" y="-9" width="44" height="50" fill="${draft.base}" opacity="0.82"/>
      ${mascotPattern(draft)}
      <ellipse cx="2" cy="-3" rx="11" ry="27" fill="#ffffff" opacity="0.2"/>
      <ellipse cx="28" cy="28" rx="13" ry="20" fill="#0f172a" opacity="0.16"/>
      <path d="M-8 38 C5 29 20 30 34 39" fill="none" stroke="#0f172a" stroke-width="5" stroke-opacity="0.08"/>
      <path d="M-5 -5 C5 -10 19 -10 27 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-opacity="0.12"/>
    </g>
    <g clip-path="url(#mascotMask)" opacity="0.72">
      <circle cx="9.5" cy="1.2" r="5.2" fill="#ffffff" opacity="0.18"/>
      <path d="M4 13 C7 10 16 10 20 13" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity="0.22"/>
      <path d="M5 19 C8 24 16 24 20 19" fill="none" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round" opacity="0.11"/>
    </g>
    <circle cx="12" cy="3.5" r="7.2" fill="none" stroke="url(#rimLight)" stroke-width="1.05" opacity="0.42"/>
    <path d="${bodyPath}" fill="none" stroke="url(#rimLight)" stroke-width="1.05" stroke-linejoin="round" opacity="0.42"/>
    <path d="M6.5 0.2 C9 -2 14 -2.2 17.4 -0.6" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.24"/>
    <path d="${bodyPath}" fill="none" stroke="#ffffff" stroke-width="0.35" opacity="0.16"/>
  </g>
`;
};

const cover = (draft: StageDraft) => {
  if (draft.scene === "office") {
    return `<g filter="url(#objectLift)" opacity="0.62">
      <rect x="22" y="48" width="51" height="13" rx="2.5" fill="#eef2f6"/>
      <path d="M25 52 H69 M25 56 H69" stroke="#aeb9c4" stroke-width="0.7"/>
      <rect x="63" y="66" width="24" height="16" rx="2" fill="#f8fafc" transform="rotate(-5 75 74)"/>
    </g>`;
  }

  if (draft.scene === "store" || draft.scene === "library") {
    return `<g filter="url(#objectLift)" opacity="0.56">
      <rect x="0" y="39" width="100" height="2.8" fill="#a97855"/>
      <rect x="0" y="60" width="100" height="2.8" fill="#a97855"/>
    </g>`;
  }

  if (draft.scene === "park") {
    return Array.from({ length: 38 }, (_, index) => {
      const x = 2 + ((index * 19) % 96);
      const y = 3 + ((index * 29) % 80);
      const colors = ["#83b86f", "#77aa64", "#95c77f", "#6fa35f"];
      return `<ellipse cx="${x}" cy="${y}" rx="3.5" ry="2.1" transform="rotate(${(index * 41) % 180} ${x} ${y})" fill="${colors[index % colors.length]}" opacity="0.46"/>`;
    }).join("");
  }

  if (draft.scene === "market") {
    return Array.from({ length: 30 }, (_, index) => {
      const x = 8 + ((index * 17) % 84);
      const y = 18 + ((index * 13) % 64);
      const colors = ["#e9a850", "#d98d4d", "#cbd264", "#e6b652"];
      return `<circle cx="${x}" cy="${y}" r="${2.2 + (index % 3) * 0.4}" fill="${colors[index % colors.length]}" opacity="0.52"/>`;
    }).join("");
  }

  if (draft.scene === "kitchen") {
    return Array.from({ length: 10 }, (_, index) => `<path d="M${index * 10} 0 V100 M0 ${index * 10} H100" stroke="#ffffff" stroke-width="0.85" opacity="0.48"/>`).join("");
  }

  if (draft.scene === "bedroom") {
    return Array.from({ length: 24 }, (_, index) => {
      const x = 7 + ((index * 16) % 86);
      const y = 24 + ((index * 17) % 58);
      return `<path d="M${x} ${y} q3 -4 6 0 q-3 4 -6 0Z" fill="${index % 2 ? "#b8c7e6" : "#d4def1"}" opacity="0.5"/>`;
    }).join("");
  }

  if (draft.scene === "cafe") {
    return Array.from({ length: 7 }, (_, index) => `<path d="M0 ${28 + index * 8.4} H100" stroke="#eadccd" stroke-width="1.2" opacity="0.64"/>`).join("");
  }

  return `<rect x="0" y="34" width="100" height="2" fill="#ffffff" opacity="0.22"/><rect x="0" y="63" width="100" height="2" fill="#ffffff" opacity="0.18"/>`;
};

const storeScene = (draft: StageDraft) => {
  const rows = [18, 39, 60, 81];
  const products = rows.map((base, row) => {
    const boxes = Array.from({ length: 11 }, (_, index) => {
      const x = 2 + index * 8.7;
      const h = 9 + ((index + row) % 5) * 1.4;
      const colors = ["#dcefff", "#ffe2e8", "#e4f5df", "#fff0c6", "#eadff7", "#ffd9bf"];
      return `<g>
        <rect x="${x}" y="${base - h}" width="6.6" height="${h}" rx="1" fill="${colors[(index + row) % colors.length]}"/>
        <rect x="${x + 1.1}" y="${base - h + 2}" width="4.4" height="1.1" rx="0.5" fill="#ffffff" opacity="0.52"/>
      </g>`;
    }).join("");
    return `${boxes}<rect x="1" y="${base}" width="98" height="2.8" rx="1" fill="#c8d2dc"/><rect x="1" y="${base}" width="98" height="0.7" fill="#ffffff" opacity="0.38"/>`;
  }).join("");
  const fixtures = `<path d="M0 86 L28 70 H72 L100 86 V100 H0Z" fill="#dfe7ef" opacity="0.82"/>
    <path d="M26 70 H74" stroke="#b8c4d0" stroke-width="1.2"/>
    <rect x="4" y="3" width="24" height="8" rx="2" fill="#3182f6" opacity="0.78"/>
    <rect x="71" y="4" width="22" height="7" rx="2" fill="#ffcf5a" opacity="0.82"/>
    <rect x="37" y="4" width="26" height="5" rx="2.5" fill="#ffffff" opacity="0.75"/>
    <path d="M7 90 H93" stroke="#ffffff" stroke-width="1.4" opacity="0.55"/>`;
  return rootSvg("#f7f9fc", `<g filter="url(#objectLift)">${fixtures}${products}</g>${mascot(draft)}${cover(draft)}`);
};

const cafeScene = (draft: StageDraft) => {
  const wall = Array.from({ length: 13 }, (_, y) =>
    Array.from({ length: 7 }, (_, x) => {
      const offset = y % 2 === 0 ? 0 : 8;
      const shade = ["#c77f71", "#b96f62", "#d49a8d", "#a96055"][(x + y) % 4];
      return `<rect x="${x * 16 - offset}" y="${y * 7.8}" width="15.2" height="6.8" rx="1" fill="${shade}"/>`;
    }).join("")
  ).join("");
  const decor = `<path d="M0 70 C23 64 73 64 100 70 V100 H0Z" fill="#8f5e49" opacity="0.55"/>
    <rect x="0" y="66" width="100" height="8" rx="2" fill="#6f4b3f" opacity="0.72"/>
    <rect x="8" y="12" width="20" height="17" rx="3" fill="#ead7c6" opacity="0.62"/>
    <circle cx="18" cy="20" r="5" fill="#a96055" opacity="0.45"/>
    <rect x="65" y="14" width="24" height="18" rx="3" fill="#ead7c6" opacity="0.58"/>
    <path d="M70 25 C75 18 81 18 86 25" fill="none" stroke="#a96055" stroke-width="2" opacity="0.45"/>
    <circle cx="22" cy="72" r="7" fill="#ead7c6" opacity="0.8"/>
    <rect x="18" y="66" width="8" height="10" rx="2" fill="#ffffff" opacity="0.85"/>
    <circle cx="76" cy="74" r="8" fill="#d49a8d" opacity="0.72"/>`;
  return rootSvg("#c88678", `<g filter="url(#objectLift)">${wall}${decor}</g>${mascot(draft)}${cover(draft)}`);
};

const libraryScene = (draft: StageDraft) => {
  const shelves = [22, 45, 68, 91].map((base, row) => {
    const books = Array.from({ length: 18 }, (_, index) => {
      const x = 1.5 + index * 5.4;
      const h = 10 + ((index * 3 + row) % 7);
      const colors = ["#7f9caf", "#b98d68", "#8ca56f", "#c8a6a0", "#d8c170", "#9b7fab"];
      return `<rect x="${x}" y="${base - h}" width="3.8" height="${h}" rx="0.65" fill="${colors[(index + row) % colors.length]}"/>
        <line x1="${x + 1.9}" y1="${base - h + 2}" x2="${x + 1.9}" y2="${base - 2}" stroke="#ffffff" stroke-opacity="0.2" stroke-width="0.45"/>`;
    }).join("");
    return `${books}<rect x="0" y="${base}" width="100" height="3.2" fill="#9c6f50"/><rect x="0" y="${base}" width="100" height="0.8" fill="#f1d7bb" opacity="0.25"/>`;
  }).join("");
  const room = `<path d="M0 93 L22 76 H78 L100 93 V100 H0Z" fill="#b98d68" opacity="0.35"/>
    <rect x="4" y="3" width="7" height="90" rx="2" fill="#7a523b" opacity="0.5"/>
    <rect x="89" y="3" width="7" height="90" rx="2" fill="#7a523b" opacity="0.5"/>
    <rect x="39" y="5" width="22" height="5" rx="2" fill="#fff4dc" opacity="0.72"/>`;
  return rootSvg("#f0e6d8", `<g filter="url(#objectLift)">${room}${shelves}</g>${mascot(draft)}${cover(draft)}`);
};

const subwayScene = (draft: StageDraft) => {
  const seats = Array.from({ length: 5 }, (_, index) => {
    const x = 3 + index * 19.3;
    const color = index % 2 ? "#8fb0c9" : "#a8c0d1";
    return `<rect x="${x}" y="43" width="17.5" height="34" rx="4" fill="${color}"/>
      <rect x="${x}" y="35" width="17.5" height="11" rx="3" fill="#c3d3df"/>
      <path d="M${x + 2} 46 V73" stroke="#ffffff" stroke-width="0.8" opacity="0.25"/>`;
  }).join("");
  const rails = `<rect x="0" y="21" width="100" height="3.5" fill="#cbd5df"/>
    <circle cx="16" cy="17" r="4" fill="#edf2f7"/><circle cx="50" cy="17" r="4" fill="#edf2f7"/><circle cx="84" cy="17" r="4" fill="#edf2f7"/>
    <rect x="8" y="6" width="23" height="13" rx="3" fill="#c6d8e6"/>
    <rect x="39" y="6" width="23" height="13" rx="3" fill="#c6d8e6"/>
    <rect x="70" y="6" width="23" height="13" rx="3" fill="#c6d8e6"/>
    <path d="M0 78 H100 V100 H0Z" fill="#9fb1bf" opacity="0.65"/>
    <path d="M12 100 L41 78 M59 78 L88 100" stroke="#e8eef3" stroke-width="1.2" opacity="0.55"/>`;
  return rootSvg("#eef3f7", `<g filter="url(#objectLift)">${rails}${seats}</g>${mascot(draft)}${cover(draft)}`);
};

const kitchenScene = (draft: StageDraft) => {
  const tiles = Array.from({ length: 10 }, (_, y) =>
    Array.from({ length: 10 }, (_, x) => {
      const shade = ["#edf5f6", "#dfeaec", "#f8fbfb"][(x + y) % 3];
      return `<rect x="${x * 10 + 0.25}" y="${y * 10 + 0.25}" width="9.5" height="9.5" rx="1.15" fill="${shade}"/>`;
    }).join("")
  ).join("");
  const props = `<rect x="0" y="66" width="100" height="34" fill="#c9d6dc" opacity="0.72"/>
    <rect x="5" y="71" width="25" height="18" rx="4" fill="#e8f0f2"/>
    <rect x="60" y="62" width="26" height="15" rx="4" fill="#c7d5da"/><circle cx="72" cy="69" r="5" fill="#edf5f6" opacity="0.55"/>
    <path d="M16 12 L16 38 M21 12 L18 38 M25 12 L25 38" stroke="#aebfc5" stroke-width="1.2"/>
    <rect x="8" y="70" width="24" height="12" rx="3" fill="#dbe7ea"/>
    <rect x="34" y="72" width="20" height="13" rx="3" fill="#f5fafb"/>
    <circle cx="44" cy="78" r="4" fill="#dfeaec"/>
    <rect x="76" y="80" width="17" height="8" rx="2" fill="#f8fbfb"/>`;
  return rootSvg("#edf5f6", `<g filter="url(#objectLift)">${tiles}${props}</g>${mascot(draft)}${cover(draft)}`);
};

const officeScene = (draft: StageDraft) => {
  const desk = `<rect x="0" y="0" width="100" height="100" fill="#d8b28a"/>
    <path d="M0 17 H100 M0 39 H100 M0 61 H100 M0 83 H100" stroke="#b98f6a" stroke-width="0.8" opacity="0.38"/>
    <path d="M24 0 V100 M52 0 V100 M78 0 V100" stroke="#b98f6a" stroke-width="0.7" opacity="0.26"/>`;
  const monitor = `<rect x="27" y="8" width="45" height="27" rx="3.2" fill="#2d3748"/><rect x="30" y="11" width="39" height="21" rx="2" fill="#dce8f3"/><rect x="43" y="35" width="13" height="4" rx="1.2" fill="#475569"/><rect x="37" y="39" width="25" height="3" rx="1.4" fill="#64748b"/>`;
  const keyboard = `<rect x="22" y="48" width="51" height="13" rx="2.5" fill="#eef2f6"/>
    ${Array.from({ length: 26 }, (_, index) => `<rect x="${25 + (index % 13) * 3.5}" y="${51 + Math.floor(index / 13) * 4.1}" width="2.3" height="2" rx="0.45" fill="#aeb9c4" opacity="0.82"/>`).join("")}
    <rect x="38" y="58" width="20" height="1.7" rx="0.8" fill="#aeb9c4" opacity="0.82"/>`;
  const items = `<rect x="7" y="14" width="16" height="22" rx="2.2" fill="#f4f7fb"/><path d="M10 20 H20 M10 25 H18 M10 30 H19" stroke="#9aa8b6" stroke-width="0.8"/>
    <rect x="78" y="12" width="14" height="10" rx="1.8" fill="#f6dc78"/><rect x="80" y="25" width="13" height="9" rx="1.8" fill="#f2a6aa"/>
    <circle cx="83" cy="53" r="6.2" fill="#edf2f7"/><circle cx="83" cy="53" r="3.6" fill="#c9a47d" opacity="0.55"/>
    <rect x="9" y="68" width="21" height="19" rx="2.5" fill="#e8f0f7"/><rect x="63" y="66" width="24" height="16" rx="2" fill="#f8fafc" transform="rotate(-5 75 74)"/>`;
  return rootSvg("#d7b08a", `<g filter="url(#objectLift)">${desk}${monitor}${keyboard}${items}</g>${mascot(draft)}${cover(draft)}`);
};

const parkScene = (draft: StageDraft) => {
  const leaves = Array.from({ length: 130 }, (_, index) => {
    const x = 3 + ((index * 23) % 96);
    const y = 4 + ((index * 31) % 84);
    const r = 2.3 + (index % 4) * 0.65;
    const colors = ["#83b86f", "#77aa64", "#95c77f", "#6fa35f", "#a3cf85"];
    return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.65}" transform="rotate(${(index * 37) % 180} ${x} ${y})" fill="${colors[index % colors.length]}"/>`;
  }).join("");
  const ground = `<rect x="0" y="80" width="100" height="20" fill="#c7b184" opacity="0.62"/>
    <path d="M0 82 C20 78 40 86 61 82 C78 79 89 81 100 78 V100 H0Z" fill="#b89f75" opacity="0.36"/>
    <path d="M38 100 C45 84 55 84 62 100Z" fill="#d9c290" opacity="0.55"/>
    <rect x="6" y="19" width="7" height="68" rx="3" fill="#8a6848" opacity="0.68"/>
    <rect x="86" y="22" width="6" height="58" rx="3" fill="#8a6848" opacity="0.58"/>
    <rect x="16" y="78" width="22" height="5" rx="2" fill="#8b6b4a"/>
    <rect x="18" y="83" width="3" height="8" fill="#6e563d"/><rect x="33" y="83" width="3" height="8" fill="#6e563d"/>`;
  return rootSvg("#e8f4df", `<g filter="url(#objectLift)">${leaves}${ground}</g>${mascot(draft)}${cover(draft)}`);
};

const marketScene = (draft: StageDraft) => {
  const crates = `<rect x="4" y="9" width="92" height="80" rx="7" fill="#edf1e7"/>
    <rect x="8" y="16" width="84" height="29" rx="4" fill="#f4d27a" opacity="0.58"/>
    <rect x="8" y="52" width="84" height="29" rx="4" fill="#d9e28a" opacity="0.58"/>
    <path d="M9 45 H91 M9 81 H91" stroke="#9c7a4f" stroke-width="3" opacity="0.35"/>
    <rect x="12" y="4" width="26" height="7" rx="2" fill="#78b96f"/>
    <rect x="62" y="4" width="25" height="7" rx="2" fill="#f0b35a"/>`;
  const fruit = Array.from({ length: 115 }, (_, index) => {
    const x = 11 + ((index * 13) % 80);
    const y = 18 + ((index * 19) % 62);
    const colors = ["#e9a850", "#d98d4d", "#cbd264", "#e6b652", "#b7c968"];
    return `<circle cx="${x}" cy="${y}" r="${2 + (index % 3) * 0.42}" fill="${colors[index % colors.length]}"/>`;
  }).join("");
  return rootSvg("#fbfcf5", `<g filter="url(#objectLift)">${crates}${fruit}</g>${mascot(draft)}${cover(draft)}`);
};

const bedroomScene = (draft: StageDraft) => {
  const blanket = `<rect x="0" y="0" width="100" height="100" fill="#e8dde2"/>
    <rect x="8" y="14" width="84" height="78" rx="9" fill="#9aa7c8" opacity="0.35"/>
    <rect x="12" y="20" width="76" height="68" rx="9" fill="#c8d4ed"/>
    <ellipse cx="50" cy="38" rx="36" ry="14" fill="#ffffff" opacity="0.16"/>
    <rect x="18" y="23" width="23" height="14" rx="5" fill="#eef3fb" opacity="0.8"/>
    <rect x="59" y="24" width="22" height="13" rx="5" fill="#e5ebf6" opacity="0.78"/>`;
  const pattern = Array.from({ length: 92 }, (_, index) => {
    const x = 7 + ((index * 17) % 86);
    const y = 23 + ((index * 23) % 62);
    return `<path d="M${x} ${y} q3 -4 6 0 q-3 4 -6 0Z" fill="${index % 2 ? "#b8c7e6" : "#d4def1"}" opacity="0.75"/>`;
  }).join("");
  return rootSvg("#f5f0ee", `<g filter="url(#objectLift)">${blanket}${pattern}</g>${mascot(draft)}${cover(draft)}`);
};

const postersScene = (draft: StageDraft) => {
  const posters = Array.from({ length: 20 }, (_, index) => {
    const x = 2 + (index % 5) * 19.5;
    const y = 4 + Math.floor(index / 5) * 23.5;
    const colors = ["#f4cf6a", "#ef9fa7", "#8fc7c2", "#a7b8ea", "#f1c27d"];
    const fill = colors[index % colors.length];
    return `<rect x="${x}" y="${y}" width="17.2" height="21.2" rx="2" fill="${fill}"/><circle cx="${x + 8.6}" cy="${y + 7}" r="4" fill="#ffffff" opacity="0.25"/><rect x="${x + 3}" y="${y + 14}" width="11" height="1.5" rx="0.8" fill="#ffffff" opacity="0.35"/><rect x="${x + 4}" y="${y + 17}" width="9" height="1.1" rx="0.6" fill="#ffffff" opacity="0.25"/>`;
  }).join("");
  const lights = `<rect x="0" y="0" width="100" height="7" fill="#2d3748" opacity="0.28"/>
    <circle cx="18" cy="6" r="3" fill="#fff1a6" opacity="0.85"/>
    <circle cx="50" cy="6" r="3" fill="#ffd1df" opacity="0.8"/>
    <circle cx="82" cy="6" r="3" fill="#bce7ff" opacity="0.8"/>
    <path d="M0 88 H100 V100 H0Z" fill="#2d3748" opacity="0.12"/>`;
  return rootSvg("#f8f2dc", `<g filter="url(#objectLift)">${posters}${lights}</g>${mascot(draft)}${cover(draft)}`);
};

const sceneMap: Record<SceneKind, (draft: StageDraft) => string> = {
  store: storeScene,
  cafe: cafeScene,
  library: libraryScene,
  subway: subwayScene,
  kitchen: kitchenScene,
  office: officeScene,
  park: parkScene,
  market: marketScene,
  bedroom: bedroomScene,
  posters: postersScene
};

const sceneImages: Record<SceneKind, string> = {
  store: "/stage-backgrounds/store.jpg",
  cafe: "/stage-backgrounds/cafe.jpg",
  library: "/stage-backgrounds/library.jpg",
  subway: "/stage-backgrounds/subway.jpg",
  kitchen: "/stage-backgrounds/kitchen.jpg",
  office: "/stage-backgrounds/office.jpg",
  park: "/stage-backgrounds/park.jpg",
  market: "/stage-backgrounds/market.jpg",
  bedroom: "/stage-backgrounds/bedroom.jpg",
  posters: "/stage-backgrounds/posters.jpg"
};

const drafts: StageDraft[] = [
  { id: "convenience", title: "\uD3B8\uC758\uC810 \uC9C4\uC5F4\uB300", theme: "\uD3B8\uC758\uC810", scene: "store", pose: "wave", difficulty: 1, x: 57, y: 44, scale: 0.46, opacity: 0.62, base: "#dcefff", accent: "#ffe2e8", line: "#c8d2dc", answerZones: [{ type: "rect", x: 54, y: 42, width: 18, height: 19 }] },
  { id: "cafe", title: "\uCE74\uD398 \uBCBD\uBA74", theme: "\uCE74\uD398", scene: "cafe", pose: "lean", difficulty: 1, x: 41, y: 55, scale: 0.47, opacity: 0.62, base: "#b96f62", accent: "#d49a8d", line: "#eadccd", answerZones: [{ type: "rect", x: 37, y: 53, width: 18.5, height: 19.5 }] },
  { id: "library", title: "\uB3C4\uC11C\uAD00 \uCC45\uC7A5", theme: "\uB3C4\uC11C\uAD00", scene: "library", pose: "peek", difficulty: 2, x: 43, y: 39, scale: 0.43, opacity: 0.6, base: "#8ca56f", accent: "#b98d68", line: "#9c6f50", answerZones: [{ type: "rect", x: 40, y: 37, width: 16.5, height: 18.5 }] },
  { id: "subway", title: "\uC9C0\uD558\uCCA0 \uC88C\uC11D", theme: "\uC9C0\uD558\uCCA0", scene: "subway", pose: "sit", difficulty: 2, x: 29, y: 47, scale: 0.45, opacity: 0.6, base: "#8fb0c9", accent: "#a8c0d1", line: "#789db8", answerZones: [{ type: "rect", x: 25, y: 45, width: 17.5, height: 19 }] },
  { id: "kitchen", title: "\uC8FC\uBC29 \uD0C0\uC77C", theme: "\uC8FC\uBC29", scene: "kitchen", pose: "hang", difficulty: 3, x: 55, y: 44, scale: 0.39, opacity: 0.58, base: "#dfeaec", accent: "#f8fbfb", line: "#ffffff", answerZones: [{ type: "rect", x: 52, y: 42, width: 15.5, height: 17 }] },
  { id: "office", title: "\uC0AC\uBB34\uC2E4 \uCC45\uC0C1", theme: "\uC0AC\uBB34\uC2E4", scene: "office", pose: "crawl", difficulty: 3, x: 62, y: 45, scale: 0.36, opacity: 0.56, base: "#eef2f6", accent: "#d8b28a", line: "#aeb9c4", answerZones: [{ type: "rect", x: 58, y: 43, width: 14.5, height: 13.8 }] },
  { id: "park", title: "\uACF5\uC6D0 \uB098\uBB34", theme: "\uACF5\uC6D0", scene: "park", pose: "jump", difficulty: 4, x: 61, y: 27, scale: 0.34, opacity: 0.54, base: "#77aa64", accent: "#95c77f", line: "#68975a", answerZones: [{ type: "rect", x: 58, y: 25, width: 13.8, height: 15 }] },
  { id: "market", title: "\uB9C8\uD2B8 \uACFC\uC77C \uCF54\uB108", theme: "\uB9C8\uD2B8", scene: "market", pose: "crouch", difficulty: 4, x: 65, y: 52, scale: 0.35, opacity: 0.54, base: "#e6b652", accent: "#d98d4d", line: "#cb9b43", answerZones: [{ type: "rect", x: 62, y: 50, width: 13.8, height: 14.5 }] },
  { id: "bedroom", title: "\uCE68\uC2E4 \uC774\uBD88 \uBB34\uB2AC", theme: "\uCE68\uC2E4", scene: "bedroom", pose: "run", difficulty: 5, x: 23, y: 54, scale: 0.31, opacity: 0.5, base: "#b8c7e6", accent: "#d4def1", line: "#9eafd4", answerZones: [{ type: "rect", x: 20, y: 52, width: 12.8, height: 14 }] },
  { id: "posters", title: "\uB180\uC774\uACF5\uC6D0 \uD3EC\uC2A4\uD130 \uBCBD", theme: "\uB180\uC774\uACF5\uC6D0", scene: "posters", pose: "star", difficulty: 5, x: 62, y: 16, scale: 0.3, opacity: 0.48, base: "#f4cf6a", accent: "#ef9fa7", line: "#d8b452", answerZones: [{ type: "rect", x: 58.5, y: 15, width: 12.8, height: 13.5 }] },
  { id: "convenience-fridge", title: "\uD3B8\uC758\uC810 \uB0C9\uC7A5 \uCF54\uB108", theme: "\uD3B8\uC758\uC810", scene: "store", pose: "stretch", difficulty: 4, x: 31, y: 57, scale: 0.33, opacity: 0.52, base: "#e4f5df", accent: "#dcefff", line: "#c8d2dc", answerZones: [{ type: "rect", x: 28, y: 55, width: 12.8, height: 14.5 }] },
  { id: "park-bench", title: "\uACF5\uC6D0 \uBCA4\uCE58 \uC606", theme: "\uACF5\uC6D0", scene: "park", pose: "tiptoe", difficulty: 5, x: 34, y: 63, scale: 0.3, opacity: 0.48, base: "#95c77f", accent: "#77aa64", line: "#68975a", answerZones: [{ type: "rect", x: 31, y: 61, width: 12, height: 13.5 }] }
];

function tightenAnswerZones(draft: StageDraft): Stage["answerZones"] {
  const shrinkRatio = Math.max(0.68, 1 - draft.difficulty * 0.055);

  return draft.answerZones.map((zone) => {
    if (zone.type === "circle") {
      return { ...zone, radius: zone.radius * shrinkRatio };
    }

    const width = zone.width * shrinkRatio;
    const height = zone.height * shrinkRatio;
    return {
      ...zone,
      x: zone.x + (zone.width - width) / 2,
      y: zone.y + (zone.height - height) / 2,
      width,
      height
    };
  });
}

function camouflageOpacityForDifficulty(difficulty: StageDraft["difficulty"]): number {
  const currentOpacity = Math.max(0.36, 0.7 - difficulty * 0.058);
  return Math.min(0.86, currentOpacity * 1.21);
}

export function buildStageSvgs(): Stage[] {
  return drafts.map((draft) => ({
    ...draft,
    imageSrc: draft.imageSrc ?? sceneImages[draft.scene],
    svg: overlaySvg(mascot(draft)),
    camouflageOpacity: camouflageOpacityForDifficulty(draft.difficulty),
    answerZones: tightenAnswerZones(draft)
  }));
}







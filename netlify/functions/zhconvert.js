// netlify/functions/zhconvert.js

// 1) Replace paired ASCII quotes (") with 「 」
//    - opening quote gets a leading newline: \n「
//    - closing quote: 」
function replaceQuotationMarks(text) {
  let out = "";
  let openQuote = true;

  for (const ch of text) {
    if (ch === '"') {
      if (openQuote) out += "\n「";
      else out += "」";
      openQuote = !openQuote;
    } else {
      out += ch;
    }
  }
  return out;
}

// 2) Apply additional replacements (order matters)
// NOTE: if you had duplicate keys in Python dict, Python keeps the last one.
// Here we keep a single entry per key (use the final intended mapping).
const REPLACEMENTS = [
  ["分量", "份量"],
  ["余個", "餘個"],
  ["余留", "餘留"],
  ["下余", "下餘"],
  ["其余", "其餘"],
  ["余暇", "餘暇"],
  ["游戲", "遊戲"],
  ["游嬉", "遊嬉"],
  ["游玩", "遊玩"],
  ["游覽", "遊覽"],
  ["游藝", "遊藝"],
  ["野游", "野遊"],
  ["胡子", "鬍子"],
  ["胡須", "鬍鬚"],
  ["黑須", "黑鬚"],
  ["白須", "白鬚"],
  ["枝干", "枝榦"],
  ["兩只", "兩隻"],
  ["一只", "一隻"],
  ["干完", "幹完"],
  ["干燥", "乾燥"],
  ["干了", "乾了"],
  ["施舍", "施捨"],
  ["舍棄", "捨棄"],
  ["棄舍", "棄捨"],
  ["舍不得", "捨不得"],
  ["干什麼", "幹什麼"],
  ["沁進", "滲進"],
  ["沁到", "滲到"],
  ["關系", "關係"],
  ["卷著", "捲著"],
  // Your Python had several "卷來/卷起/卷在" mapping to "捲著/捲在".
  // Keeping the most reasonable interpretations:
  ["卷來", "捲來"],
  ["卷起", "捲起"],
  ["卷在", "捲在"],

  ["頭發", "頭髮"],
  ["垂發", "垂髮"],
  ["黑發", "黑髮"],
  ["秀發", "秀髮"],
  ["白發", "白髮"],
  ["鬢發", "鬢髮"],
  ["剪發", "剪髮"],
  ["留發", "留髮"],
  ["假發", "假髮"],
  ["留海發", "留海髮"],

  ["贊美", "讚美"],
  ["稱贊", "稱讚"],

  ["郁雨", "鬱雨"],
  ["憂郁", "憂鬱"],
  ["幽郁", "幽鬱"],
  ["郁金香", "鬱金香"],

  ["船只", "船隻"],
  ["肮髒", "骯髒"],
  ["仿佛", "仿彿"],
  ["放松", "放鬆"],
  ["迷蒙", "迷矇"],
  ["雜志", "雜誌"],
  ["回避", "迴避"],
  ["復雜", "複雜"],
  ["標准", "標準"],
  ["准備", "準備"],

  ["“", "「"],
  ["”", "」"],

  ["胡里胡涂", "糊裡糊塗"],

  ["——", "─"],
  ["──", "─"],
  ["－－", "─"],
  ["……", "⋯⋯"],

  ["牽掣", "牽制"],

  ["抽鬥", "抽斗"],
  ["漏鬥", "漏斗"],
  ["煙鬥", "煙斗"],

  ["希腊", "希臘"],
  ["標致", "標緻"],
  ["面團", "麵團"],

  ["雲雲", "云云"],
  ["則雲", "則云"],
  ["或雲", "或云"],
  ["所雲", "所云"],

  ["系獄", "繫獄"],

  ["酒顛", "酒癲"],

  ["采集", "採集"],
  ["采過", "採過"],
  ["采了", "採了"],
  ["采到", "採到"],
  ["采取", "採取"],

  ["鐘馗", "鍾馗"],

  ["提唱", "提倡"],

  ["蒲萄", "葡萄"],
  ["蒲陶", "葡萄"],
  ["蒲桃", "葡萄"],

  ["髮達", "發達"],

  ["香賓", "香檳"],
  ["響客", "饗客"],
  ["䦨姆", "蘭姆"],

  ["占有", "佔有"],
  ["占了", "佔了"],
  ["汙染", "污染"],

  // punctuation normalization (ASCII -> full-width)
  [",", "，"],
  ["?", "？"],
  ["!", "！"],
  [";", "；"],
  [":", "："],
];

function applyReplacements(text) {
  let s = text;
  for (const [from, to] of REPLACEMENTS) {
    if (!from) continue;
    // Use split/join for speed and to avoid regex escaping headaches
    s = s.split(from).join(to);
  }
  return s;
}

function postProcessTraditionalText(text) {
  let s = text;

  // A) replace ASCII " pairs into 「 」
  s = replaceQuotationMarks(s);

  // B) apply custom replacements
  s = applyReplacements(s);

  return s;
}

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const text = body.text || "";

    // Call zhconvert (server-side, no CORS issues)
    const resp = await fetch("https://api.zhconvert.org/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, converter: "Traditional" }),
    });

    const raw = await resp.text();

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: raw,
      };
    }

    // Expecting zhconvert JSON with { data: { text: "..." } }
    let json;
    try {
      json = JSON.parse(raw);
    } catch {
      return {
        statusCode: 502,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Invalid JSON from zhconvert" }),
      };
    }

    const converted = json?.data?.text ?? "";
    const processed = postProcessTraditionalText(converted);

    // Return same shape so your HTML code doesn't need changes
    const out = { ...json, data: { ...(json.data || {}), text: processed } };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(out),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: String(e?.message || e) }),
    };
  }
};

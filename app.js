/**
 * TextFlow · 智能排版工具
 * 核心逻辑：主题切换、编辑器、Markdown预览、AI排版
 */

/* =====================================================
   主题数据
   ===================================================== */
const THEMES = [
  { id: 'default',       name: '极简黑白',   cls: '',                  bg: '#f8f8f8', text: '#1a1a1a', accent: '#1a1a1a' },
  { id: 'titanium',      name: '钛灰简约',   cls: 'theme-titanium',    bg: '#f4f4f5', text: '#18181b', accent: '#3f3f46' },
  { id: 'blue-gray',     name: '蓝灰专业',   cls: 'theme-blue-gray',   bg: '#f0f4f8', text: '#1e2d3d', accent: '#2563eb' },
  { id: 'warm-cream',    name: '温和奶油',   cls: 'theme-warm-cream',  bg: '#faf6f0', text: '#3d2b1a', accent: '#c8773a' },
  { id: 'magazine',      name: '轻杂志风',   cls: 'theme-magazine',    bg: '#fafaf8', text: '#2c2a25', accent: '#d4581a' },
  { id: 'morning-mist',  name: '山见晨雾',   cls: 'theme-morning-mist',bg: '#f5f7f8', text: '#1e2830', accent: '#4a7a8a' },
  { id: 'forest-green',  name: '森染新机',   cls: 'theme-forest-green',bg: '#f2f8f3', text: '#0d2418', accent: '#1b7a42' },
  { id: 'mint-summer',   name: '青提夏日',   cls: 'theme-mint-summer', bg: '#f0faf4', text: '#1a3a28', accent: '#27ae60' },
  { id: 'mint-soda',     name: '薄荷苏打',   cls: 'theme-mint-soda',   bg: '#eefaf7', text: '#0d2e28', accent: '#0ea5a0' },
  { id: 'sea-salt',      name: '海盐气泡',   cls: 'theme-sea-salt',    bg: '#f0f8ff', text: '#0a2040', accent: '#0077cc' },
  { id: 'lavender',      name: '丁香花开',   cls: 'theme-lavender',    bg: '#f5f0fa', text: '#2d1a4a', accent: '#7c3aed' },
  { id: 'sakura',        name: '樱落雨后',   cls: 'theme-sakura',      bg: '#fdf5f8', text: '#3d1a28', accent: '#e0507a' },
  { id: 'red-velvet',    name: '红丝绒意',   cls: 'theme-red-velvet',  bg: '#fdf5f5', text: '#3d0a0a', accent: '#b91c1c' },
  { id: 'bordeaux',      name: '波多尔红',   cls: 'theme-bordeaux',    bg: '#f8f0f2', text: '#2e0810', accent: '#8b1a2c' },
  { id: 'sunset',        name: '落日余晖',   cls: 'theme-sunset',      bg: '#fff8f0', text: '#3d1a00', accent: '#e8550a' },
  { id: 'lemon',         name: '柠檬冰霜',   cls: 'theme-lemon',       bg: '#fffff0', text: '#2a2800', accent: '#b0a000' },
  { id: 'amber',         name: '琥珀流连',   cls: 'theme-amber',       bg: '#fdf8ed', text: '#2a1e00', accent: '#d4900a' },
  { id: 'kyoto-tea',     name: '京都茶道',   cls: 'theme-kyoto-tea',   bg: '#f5f2ec', text: '#2a2218', accent: '#6b5b30' },
  { id: 'autumn',        name: '秋日森林',   cls: 'theme-autumn',      bg: '#faf5ec', text: '#2e1e08', accent: '#c45c00' },
  { id: 'pine',          name: '苍松挺拔',   cls: 'theme-pine',        bg: '#ecf2ee', text: '#0c2018', accent: '#1a6040' },
  { id: 'retro',         name: '复古格调',   cls: 'theme-retro',       bg: '#f0e8d8', text: '#1e1408', accent: '#8a4a10' },
  { id: 'film',          name: '胶片记忆',   cls: 'theme-film',        bg: '#f2efe8', text: '#1e1c18', accent: '#7a6a45' },
  { id: 'ink',           name: '宣纸墨韵',   cls: 'theme-ink',         bg: '#f7f5f0', text: '#0a0a0a', accent: '#1a1208' },
  { id: 'futurism',      name: '未来主义',   cls: 'theme-futurism',    bg: '#f8fafe', text: '#1a1f3d', accent: '#4040dd' },
  { id: 'charcoal',      name: '炭黑商务',   cls: 'theme-charcoal',    bg: '#1a1a1a', text: '#e8e8e8', accent: '#e0a030' },
  { id: 'deep-blue',     name: '幽夜深蓝',   cls: 'theme-deep-blue',   bg: '#040c20', text: '#c8d8f8', accent: '#4477dd' },
  { id: 'midnight',      name: '午夜电台',   cls: 'theme-midnight',    bg: '#080c14', text: '#d4d8f0', accent: '#5b8dee' },
  { id: 'dark-forest',   name: '暗黑森林',   cls: 'theme-dark-forest', bg: '#0a1a0e', text: '#c0e8c8', accent: '#38d468' },
  { id: 'space',         name: '太空漫步',   cls: 'theme-space',       bg: '#060818', text: '#c8d5ff', accent: '#7a5cfa' },
  { id: 'cyberpunk',     name: '赛博朋克',   cls: 'theme-cyberpunk',   bg: '#0d0d1a', text: '#e0e0ff', accent: '#00ffcc' },
  { id: 'neon',          name: '霓虹幻影',   cls: 'theme-neon',        bg: '#0a0010', text: '#f0d0ff', accent: '#ff00cc' },
  { id: 'black-hole',    name: '黑洞极冷',   cls: 'theme-black-hole',  bg: '#000000', text: '#cccccc', accent: '#ffffff' },
];

const FONTS = [
  { name: '思源宋体', family: "'Noto Serif SC', serif" },
  { name: '思源黑体', family: "'Noto Sans SC', sans-serif" },
  { name: '小薇体',   family: "'ZCOOL XiaoWei', serif" },
  { name: '马善政',   family: "'Ma Shan Zheng', serif" },
  { name: '系统字体', family: "system-ui, sans-serif" },
];

/* =====================================================
   状态
   ===================================================== */
let currentTheme = THEMES[0];
let currentFont  = FONTS[0];
let previewVisible = true;
let autoSaveTimer = null;
let history = [];
let historyIndex = -1;
let isApplyingHistory = false;

/* =====================================================
   DOM 引用
   ===================================================== */
const editor         = document.getElementById('editor');
const previewContent = document.getElementById('previewContent');
const charCount      = document.getElementById('charCount');
const wordCount      = document.getElementById('wordCount');
const lineCount      = document.getElementById('lineCount');
const statusText     = document.getElementById('statusText');
const themeGrid      = document.getElementById('themeGrid');
const themeSearch    = document.getElementById('themeSearch');
const themeCount     = document.getElementById('themeCount');
const aiBtn          = document.getElementById('aiBtn');
const aiLoading      = document.getElementById('aiLoading');
const toast          = document.getElementById('toast');
const fontOptions    = document.getElementById('fontOptions');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeVal    = document.getElementById('fontSizeVal');
const lineHeightSlider = document.getElementById('lineHeightSlider');
const lineHeightVal  = document.getElementById('lineHeightVal');
const previewPane    = document.getElementById('previewPane');

/* =====================================================
   工具函数
   ===================================================== */
function showToast(msg, duration = 2000) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function setStatus(msg, timeout = 0) {
  statusText.textContent = msg;
  if (timeout) setTimeout(() => statusText.textContent = '就绪', timeout);
}

function updateStats() {
  const text = editor.value;
  charCount.textContent = text.length;
  // 中文词计数（中文字+英文词）
  const cnChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const enWords = (text.match(/\b[a-zA-Z]+\b/g) || []).length;
  wordCount.textContent = cnChars + enWords;
  lineCount.textContent = text === '' ? 0 : text.split('\n').length;
}

/* =====================================================
   Markdown 解析（轻量实现）
   ===================================================== */
function parseMarkdown(text) {
  if (!text.trim()) return '';

  // 转义 HTML
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = text.split('\n');
  let html = '';
  let inUL = false, inOL = false, inPre = false;

  const closeLists = () => {
    if (inUL) { html += '</ul>'; inUL = false; }
    if (inOL) { html += '</ol>'; inOL = false; }
  };

  const inlineMarkdown = (line) => {
    return line
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%" />');
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trimEnd();

    // 代码块
    if (line.startsWith('```')) {
      closeLists();
      if (inPre) { html += '</code></pre>'; inPre = false; }
      else { html += '<pre><code>'; inPre = true; }
      continue;
    }
    if (inPre) { html += esc(raw) + '\n'; continue; }

    // 标题
    if (/^#{1,6}\s/.test(line)) {
      closeLists();
      const m = line.match(/^(#{1,6})\s+(.+)/);
      const level = m[1].length;
      html += `<h${level}>${inlineMarkdown(esc(m[2]))}</h${level}>`;
      continue;
    }

    // 水平线
    if (/^[-*_]{3,}$/.test(line.trim())) {
      closeLists();
      html += '<hr />';
      continue;
    }

    // 引用
    if (line.startsWith('> ')) {
      closeLists();
      html += `<blockquote>${inlineMarkdown(esc(line.slice(2)))}</blockquote>`;
      continue;
    }

    // 无序列表
    if (/^[-*+]\s/.test(line)) {
      if (inOL) { html += '</ol>'; inOL = false; }
      if (!inUL) { html += '<ul>'; inUL = true; }
      html += `<li>${inlineMarkdown(esc(line.slice(2)))}</li>`;
      continue;
    }

    // 有序列表
    if (/^\d+\.\s/.test(line)) {
      if (inUL) { html += '</ul>'; inUL = false; }
      if (!inOL) { html += '<ol>'; inOL = true; }
      html += `<li>${inlineMarkdown(esc(line.replace(/^\d+\.\s/, '')))}</li>`;
      continue;
    }

    // 空行
    if (line.trim() === '') {
      closeLists();
      html += '';
      continue;
    }

    // 普通段落
    closeLists();
    html += `<p>${inlineMarkdown(esc(line))}</p>`;
  }

  closeLists();
  if (inPre) html += '</code></pre>';

  return html;
}

/* =====================================================
   实时预览
   ===================================================== */
function updatePreview() {
  const html = parseMarkdown(editor.value);
  if (!html) {
    previewContent.innerHTML = `
      <div class="preview-empty">
        <div class="empty-icon">✦</div>
        <p>在左侧输入内容，预览效果将实时显示在这里</p>
      </div>`;
  } else {
    previewContent.innerHTML = html;
  }
}

/* =====================================================
   AI 排版引擎（本地算法，无需 API）
   ===================================================== */
const AI_ENGINE = {
  // 模式：轻量微调
  light(text) {
    let lines = text.split('\n');
    // 修正中文标点
    lines = lines.map(l => l
      .replace(/,(?=[\u4e00-\u9fff])/g, '，')
      .replace(/\.(?=[\u4e00-\u9fff])/g, '。')
      .replace(/!(?=[\u4e00-\u9fff\s])/g, '！')
      .replace(/\?(?=[\u4e00-\u9fff\s])/g, '？')
      .replace(/;(?=[\u4e00-\u9fff])/g, '；')
      .replace(/:(?=[\u4e00-\u9fff])/g, '：')
      .replace(/\((?=[\u4e00-\u9fff])/g, '（')
      .replace(/\)(?=[\u4e00-\u9fff])/g, '）')
      // 删除多余空格
      .replace(/ {2,}/g, ' ')
      .trim()
    );
    // 合并连续空行
    const result = [];
    let blankCount = 0;
    for (const l of lines) {
      if (l === '') {
        blankCount++;
        if (blankCount <= 1) result.push(l);
      } else {
        blankCount = 0;
        result.push(l);
      }
    }
    return result.join('\n').trim();
  },

  // 模式：深度美化
  full(text) {
    let result = this.light(text);
    const paragraphs = result.split('\n\n').filter(p => p.trim());

    const formatted = paragraphs.map((para, i) => {
      const lines = para.trim().split('\n');
      const firstLine = lines[0];

      // 已有 Markdown 标记则保留
      if (/^#{1,6}\s|^[-*+]\s|^\d+\.\s|^>/.test(firstLine)) return para;

      // 首个段落自动加大标题
      if (i === 0 && firstLine.length <= 30 && !firstLine.endsWith('。') && !firstLine.endsWith('，')) {
        return `# ${firstLine}\n\n${lines.slice(1).join('\n')}`.trim();
      }

      // 短行（<= 20字）且无标点结尾 → 副标题
      if (lines.length === 1 && firstLine.length <= 20
        && !/[。，！？；：]$/.test(firstLine)
        && i > 0) {
        return `## ${firstLine}`;
      }

      return para;
    });

    return formatted.join('\n\n');
  },

  // 模式：小红书风格
  xhs(text) {
    const emojiPool = ['✨', '💫', '🌟', '💡', '🎯', '🌈', '💕', '🔥', '🌸', '⚡', '🍀', '🎊', '🌺', '💎', '🦋'];
    const getEmoji = () => emojiPool[Math.floor(Math.random() * emojiPool.length)];

    let result = this.light(text);
    const paragraphs = result.split('\n\n').filter(p => p.trim());

    const formatted = paragraphs.map((para, i) => {
      const lines = para.trim().split('\n');
      const firstLine = lines[0];

      if (/^#{1,6}\s/.test(firstLine)) return para;

      // 第一段：爆款标题
      if (i === 0) {
        const title = firstLine.length <= 40 ? firstLine : firstLine.slice(0, 25) + '…';
        const body = lines.slice(1).join('\n');
        return `${getEmoji()} **${title}** ${getEmoji()}\n\n${body}`.trim();
      }

      // 短行 → 分点要素
      if (lines.length <= 3 && firstLine.length <= 30) {
        return lines.map((l, idx) => {
          if (idx === 0 && l.length <= 20) return `${getEmoji()} ${l}`;
          return l;
        }).join('\n');
      }

      // 长段 → 结尾加感叹
      const last = lines[lines.length - 1];
      if (!/[！💫✨]$/.test(last)) {
        lines[lines.length - 1] = last + (last.endsWith('。') ? ' ✨' : '！');
      }

      return lines.join('\n');
    });

    // 结尾话题标签
    const tags = ['\n\n#生活灵感 #干货分享 #好好生活 #今日分享'];
    return formatted.join('\n\n') + tags[0];
  }
};

async function runAI() {
  const text = editor.value.trim();
  if (!text) { showToast('请先输入内容再排版'); return; }

  const mode = document.querySelector('input[name="aiMode"]:checked').value;

  aiBtn.style.display = 'none';
  aiLoading.classList.add('show');
  setStatus('AI 排版中…');

  // 模拟异步处理感
  await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

  try {
    const result = AI_ENGINE[mode](text);
    pushHistory(editor.value);
    editor.value = result;
    updatePreview();
    updateStats();
    setStatus('排版完成', 3000);
    showToast(`✦ ${mode === 'light' ? '轻量微调' : mode === 'full' ? '深度美化' : '小红书风格'}完成！`);
  } catch(e) {
    showToast('排版出错，请重试');
  }

  aiLoading.classList.remove('show');
  aiBtn.style.display = '';
}

/* =====================================================
   历史记录（撤销/重做）
   ===================================================== */
function pushHistory(val) {
  if (isApplyingHistory) return;
  history = history.slice(0, historyIndex + 1);
  history.push(val);
  if (history.length > 100) history.shift();
  historyIndex = history.length - 1;
}

function undo() {
  if (historyIndex <= 0) return;
  isApplyingHistory = true;
  historyIndex--;
  editor.value = history[historyIndex];
  updatePreview();
  updateStats();
  isApplyingHistory = false;
}

function redo() {
  if (historyIndex >= history.length - 1) return;
  isApplyingHistory = true;
  historyIndex++;
  editor.value = history[historyIndex];
  updatePreview();
  updateStats();
  isApplyingHistory = false;
}

/* =====================================================
   工具栏命令
   ===================================================== */
function applyFormat(cmd) {
  const start = editor.selectionStart;
  const end   = editor.selectionEnd;
  const sel   = editor.value.substring(start, end);
  const before = editor.value.substring(0, start);
  const after  = editor.value.substring(end);

  let insertion = '';
  let cursorOffset = 0;

  switch (cmd) {
    case 'bold':
      insertion = `**${sel || '加粗文字'}**`;
      cursorOffset = sel ? insertion.length : 2;
      break;
    case 'italic':
      insertion = `*${sel || '斜体文字'}*`;
      cursorOffset = sel ? insertion.length : 1;
      break;
    case 'h1':
      insertion = `\n# ${sel || '大标题'}\n`;
      cursorOffset = insertion.length;
      break;
    case 'h2':
      insertion = `\n## ${sel || '小标题'}\n`;
      cursorOffset = insertion.length;
      break;
    case 'ul':
      insertion = sel
        ? sel.split('\n').map(l => `- ${l}`).join('\n')
        : `- 列表项目\n- 列表项目\n- 列表项目`;
      cursorOffset = insertion.length;
      break;
    case 'quote':
      insertion = sel
        ? sel.split('\n').map(l => `> ${l}`).join('\n')
        : `> 引用文字`;
      cursorOffset = insertion.length;
      break;
    case 'undo':
      undo(); return;
    case 'redo':
      redo(); return;
  }

  pushHistory(editor.value);
  editor.value = before + insertion + after;
  const newPos = start + cursorOffset;
  editor.setSelectionRange(newPos, newPos);
  editor.focus();
  updatePreview();
  updateStats();
}

/* =====================================================
   主题系统
   ===================================================== */
function buildThemeGrid(filter = '') {
  themeGrid.innerHTML = '';
  const list = THEMES.filter(t => t.name.includes(filter));
  themeCount.textContent = list.length;

  list.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'theme-card' + (theme.id === currentTheme.id ? ' active' : '');
    card.dataset.id = theme.id;

    // 颜色预览
    const preview = document.createElement('div');
    preview.className = 'theme-preview';
    preview.style.background = theme.bg;
    preview.style.color = theme.accent;

    preview.innerHTML = `
      <div class="theme-preview-line title"></div>
      <div class="theme-preview-line body" style="opacity:.2;background:${theme.text}"></div>
      <div class="theme-preview-line short" style="opacity:.15;background:${theme.text}"></div>
    `;

    // 色点装饰
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:absolute;bottom:28px;right:8px;
      width:8px;height:8px;border-radius:50%;
      background:${theme.accent};opacity:.7;
    `;

    const label = document.createElement('div');
    label.className = 'theme-label';
    label.style.background = theme.bg;
    label.style.color = theme.text;
    label.textContent = theme.name;

    card.appendChild(preview);
    card.appendChild(dot);
    card.appendChild(label);

    card.addEventListener('click', () => applyTheme(theme));
    themeGrid.appendChild(card);
  });
}

function applyTheme(theme) {
  // 移除旧主题
  THEMES.forEach(t => { if (t.cls) document.body.classList.remove(t.cls); });
  // 应用新主题
  if (theme.cls) document.body.classList.add(theme.cls);
  currentTheme = theme;
  // 更新网格选中态
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.id === theme.id);
  });
  // 持久化
  localStorage.setItem('textflow-theme', theme.id);
  setStatus(`主题：${theme.name}`, 2000);
}

function loadSavedTheme() {
  const saved = localStorage.getItem('textflow-theme');
  if (saved) {
    const theme = THEMES.find(t => t.id === saved);
    if (theme) applyTheme(theme);
  }
}

/* =====================================================
   字体系统
   ===================================================== */
function buildFontOptions() {
  FONTS.forEach((font, i) => {
    const btn = document.createElement('button');
    btn.className = 'font-option-btn' + (i === 0 ? ' active' : '');
    btn.textContent = font.name;
    btn.style.fontFamily = font.family;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.font-option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      previewContent.style.fontFamily = font.family;
      currentFont = font;
    });
    fontOptions.appendChild(btn);
  });
}

/* =====================================================
   本地存储
   ===================================================== */
function saveContent() {
  const data = {
    content: editor.value,
    savedAt: new Date().toLocaleTimeString('zh-CN'),
    theme: currentTheme.id,
  };
  localStorage.setItem('textflow-content', JSON.stringify(data));
  setStatus(`已保存 ${data.savedAt}`, 3000);
  showToast('✓ 已保存到本地');
}

function loadSavedContent() {
  const saved = localStorage.getItem('textflow-content');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.content) {
        editor.value = data.content;
        updatePreview();
        updateStats();
        pushHistory(data.content);
      }
    } catch (e) {}
  }
}

/* =====================================================
   导出
   ===================================================== */
function exportHTML() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TextFlow 导出</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
  body { margin: 0; background: #f8f8f8; font-family: 'Noto Sans SC', sans-serif; }
  article { max-width: 720px; margin: 60px auto; padding: 40px 48px; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,.08); font-family: 'Noto Serif SC', serif; font-size: 16px; line-height: 1.9; color: #1a1a1a; }
  h1 { font-size: 26px; font-weight: 700; margin: 1.5em 0 .6em; }
  h2 { font-size: 20px; font-weight: 600; margin: 1.3em 0 .5em; border-bottom: 2px solid #eee; padding-bottom: 6px; }
  h3 { font-size: 17px; font-weight: 600; margin: 1.2em 0 .4em; }
  p { margin: .8em 0; text-align: justify; }
  blockquote { margin: 1.2em 0; padding: 12px 16px; background: #f5f5f5; border-left: 3px solid #ccc; border-radius: 0 6px 6px 0; }
  code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  pre { background: #f0f0f0; padding: 16px 20px; border-radius: 8px; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  ul, ol { padding-left: 1.5em; margin: .8em 0; }
  hr { border: none; height: 1px; background: #eee; margin: 2em 0; }
</style>
</head>
<body>
<article>
${previewContent.innerHTML}
</article>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `TextFlow_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.html`;
  a.click();
  showToast('✓ HTML 已导出');
}

/* =====================================================
   事件绑定
   ===================================================== */
// 编辑器输入
editor.addEventListener('input', () => {
  updatePreview();
  updateStats();
  setStatus('编辑中…');

  // 防抖自动保存
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    localStorage.setItem('textflow-content', JSON.stringify({ content: editor.value }));
    setStatus('已自动保存', 2000);
  }, 2000);

  // 历史记录（300ms防抖）
  clearTimeout(editor._histTimer);
  editor._histTimer = setTimeout(() => pushHistory(editor.value), 300);
});

// Tab 键缩进
editor.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    const end   = editor.selectionEnd;
    editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
    editor.setSelectionRange(start + 2, start + 2);
  }
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 's') { e.preventDefault(); saveContent(); }
    if (e.key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
  }
});

// 按钮
document.getElementById('saveBtn').addEventListener('click', saveContent);

document.getElementById('copyBtn').addEventListener('click', () => {
  if (!editor.value) { showToast('内容为空'); return; }
  navigator.clipboard.writeText(editor.value).then(() => showToast('✓ 已复制到剪贴板'));
});

document.getElementById('clearBtn').addEventListener('click', () => {
  if (!editor.value) return;
  if (confirm('确认清空所有内容？此操作无法撤销。')) {
    pushHistory(editor.value);
    editor.value = '';
    updatePreview();
    updateStats();
    showToast('已清空');
  }
});

document.getElementById('copyPreviewBtn').addEventListener('click', () => {
  const text = previewContent.innerText;
  if (!text.trim() || previewContent.querySelector('.preview-empty')) { showToast('预览为空'); return; }
  navigator.clipboard.writeText(text).then(() => showToast('✓ 已复制预览文本'));
});

document.getElementById('exportHtmlBtn').addEventListener('click', exportHTML);

document.getElementById('togglePreview').addEventListener('click', () => {
  previewVisible = !previewVisible;
  previewPane.style.display = previewVisible ? '' : 'none';
  document.getElementById('togglePreview').innerHTML = previewVisible
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;margin-right:5px"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>预览`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;margin-right:5px"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>显示预览`;
});

// AI 按钮
aiBtn.addEventListener('click', runAI);

// 工具栏格式化
document.querySelectorAll('.fmt-btn').forEach(btn => {
  btn.addEventListener('click', () => applyFormat(btn.dataset.cmd));
});

// 主题搜索
themeSearch.addEventListener('input', e => buildThemeGrid(e.target.value));

// 折叠面板
document.getElementById('themeToggle').addEventListener('click', function() {
  const chevron = this.querySelector('.chevron');
  const grid    = document.getElementById('themeGrid');
  const search  = document.querySelector('.theme-search-wrap');
  const collapsed = grid.style.display === 'none';
  grid.style.display = collapsed ? '' : 'none';
  search.style.display = collapsed ? '' : 'none';
  chevron.classList.toggle('open', !collapsed);
});

document.getElementById('fontToggle').addEventListener('click', function() {
  const chevron = this.querySelector('.chevron');
  const section = document.getElementById('fontSection');
  section.classList.toggle('collapsed');
  chevron.classList.toggle('open', !section.classList.contains('collapsed'));
});

// 字号 / 行距
fontSizeSlider.addEventListener('input', e => {
  const v = e.target.value;
  fontSizeVal.textContent = v + 'px';
  previewContent.style.fontSize = v + 'px';
  editor.style.fontSize = v + 'px';
});

lineHeightSlider.addEventListener('input', e => {
  const v = (e.target.value / 100).toFixed(1);
  lineHeightVal.textContent = v;
  previewContent.style.lineHeight = v;
  editor.style.lineHeight = v;
});

/* =====================================================
   初始化
   ===================================================== */
function init() {
  buildThemeGrid();
  buildFontOptions();
  loadSavedTheme();
  loadSavedContent();

  // 初始历史
  if (editor.value) pushHistory(editor.value);
  else pushHistory('');

  // chevron 初始状态
  document.querySelector('#themeToggle .chevron').classList.add('open');

  console.log('%cTextFlow 智能排版工具 ✦', 'font-size:16px;font-weight:bold;color:#7c3aed');
  console.log('%c32 个主题 · AI 排版 · Markdown 预览', 'color:#666');
}

document.addEventListener('DOMContentLoaded', init);

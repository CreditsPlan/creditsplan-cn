import { PROVIDER_NAME_MAP } from './shared/brands.js';
import {
  displayNameForProvider,
  providerSortOrder,
  sortPlansBySortOrder,
  supportedModelDisplay
} from './shared/plan-utils.js';
import { PLAN_TYPE_LABELS } from './plans-detail.js';
import { planQuotaDisplay, planUnitPriceDisplay } from './shared/quota-utils.js';

const EXPORT_COLUMNS = [
  { key: 'brand', label: '品牌' },
  { key: 'name', label: '套餐名称' },
  { key: 'planType', label: '套餐类型' },
  { key: 'monthlyPrice', label: '连续包月' },
  { key: 'quarterlyPrice', label: '连续包季' },
  { key: 'annualPrice', label: '连续包年' },
  { key: 'quota', label: '额度' },
  { key: 'unitPrice', label: '等效单价' },
  { key: 'model', label: '代表模型' },
  { key: 'status', label: '状态' },
  { key: 'verifiedAt', label: '核对日期' },
  { key: 'url', label: '来源链接' }
];

// 各列宽度（单位：默认字体字符数），与 EXPORT_COLUMNS 一一对应
const EXPORT_COL_WIDTHS = [14, 28, 12, 12, 12, 12, 24, 12, 30, 10, 12, 38];

// 模型价格导出列（「模型」价格对比视图）
const MODEL_EXPORT_COLUMNS = [
  { key: 'name', label: '模型' },
  { key: 'provider', label: '厂商' },
  { key: 'context', label: '上下文' },
  { key: 'inputPrice', label: '输入价（¥/百万 tokens）' },
  { key: 'outputPrice', label: '输出价（¥/百万 tokens）' },
  { key: 'docsUrl', label: '官方文档' }
];
const MODEL_EXPORT_COL_WIDTHS = [28, 14, 12, 22, 22, 42];
const MODEL_WORD_COL_WIDTHS = ['20%', '12%', '10%', '14%', '14%', '30%'];
const MODEL_PDF_RATIOS = [0.20, 0.12, 0.10, 0.14, 0.14, 0.30];
const MODEL_EXPORT_TITLE = '国内 AI 模型价格对比';

function modelPriceNumber(value) {
  if (value == null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formatModelContext(value) {
  const n = modelPriceNumber(value);
  if (n == null) return '';
  if (n >= 1000000) return `${(n / 1000000).toLocaleString('zh-CN', { maximumFractionDigits: 1 })}M`;
  if (n >= 1000) return `${(n / 1000).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}K`;
  return String(n);
}

function prepareModelPriceRows(models) {
  return models
    .filter(m => modelPriceNumber(m.raw?.input_price) != null || modelPriceNumber(m.raw?.output_price) != null)
    .map(m => {
      const input = modelPriceNumber(m.raw?.input_price);
      const output = modelPriceNumber(m.raw?.output_price);
      return {
        name: m.modelName || '',
        provider: PROVIDER_NAME_MAP[m.vendor] || m.vendor || '',
        context: formatModelContext(m.raw?.context_length),
        inputPrice: input != null ? `¥${input.toLocaleString('zh-CN', { maximumFractionDigits: 4 })}` : '',
        outputPrice: output != null ? `¥${output.toLocaleString('zh-CN', { maximumFractionDigits: 4 })}` : '',
        docsUrl: m.sourceUrl || ''
      };
    });
}

function prepareExportRows(plans, providerInfo) {
  const groups = new Map();
  for (const plan of plans) {
    const provider = String(plan.provider || '').trim();
    if (!groups.has(provider)) groups.set(provider, []);
    groups.get(provider).push(plan);
  }
  const sortedProviders = [...groups.keys()].sort((a, b) => (
    providerSortOrder(a, providerInfo, PROVIDER_NAME_MAP)
    - providerSortOrder(b, providerInfo, PROVIDER_NAME_MAP)
  ));
  const rows = [];
  for (const provider of sortedProviders) {
    const label = displayNameForProvider(provider, providerInfo, PROVIDER_NAME_MAP);
    const sorted = sortPlansBySortOrder(groups.get(provider));
    for (const plan of sorted) {
      rows.push({
        brand: label,
        name: plan.name || '',
        planType: PLAN_TYPE_LABELS[plan.planType] || plan.planType || '',
        monthlyPrice: cleanExportValue(plan.monthlyPrice),
        quarterlyPrice: cleanExportValue(plan.quarterlyPrice),
        annualPrice: cleanExportValue(plan.annualPrice),
        quota: planQuotaDisplay(plan)?.full || '',
        unitPrice: planUnitPriceDisplay(plan)?.text || '',
        model: supportedModelDisplay(plan) || '',
        status: plan.statusLabel || '',
        verifiedAt: plan.lastVerifiedAt || '待核对',
        url: plan.url || ''
      });
    }
  }
  return rows;
}

function cleanExportValue(value) {
  const text = String(value ?? '').trim();
  if (!text || text === '待更新' || text === '待确认' || text === '请以官网为准') return '';
  return text;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function exportTimestamp() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/* ─── Excel (.xlsx, real Office Open XML, zero dependencies) ─── */

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1);
    table[i] = crc >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function colLetter(index) {
  let letter = '';
  let n = index;
  while (n >= 0) {
    letter = String.fromCharCode(65 + (n % 26)) + letter;
    n = Math.floor(n / 26) - 1;
  }
  return letter;
}

function buildSheetXml(matrix, colWidths) {
  let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
  if (colWidths && colWidths.length) {
    xml += '<cols>';
    colWidths.forEach((width, i) => {
      xml += `<col min="${i + 1}" max="${i + 1}" width="${width}" customWidth="1"/>`;
    });
    xml += '</cols>';
  }
  xml += '<sheetData>';
  matrix.forEach((row, rowIndex) => {
    xml += `<row r="${rowIndex + 1}">`;
    row.forEach((cell, colIndex) => {
      const ref = colLetter(colIndex) + (rowIndex + 1);
      xml += `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(String(cell ?? ''))}</t></is></c>`;
    });
    xml += '</row>';
  });
  return `${xml}</sheetData></worksheet>`;
}

function zipStore(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = encoder.encode(file.data);
    const crc = crc32(dataBytes);
    const local = new Uint8Array(30 + nameBytes.length + dataBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, dataBytes.length, true);
    lv.setUint32(22, dataBytes.length, true);
    lv.setUint16(26, nameBytes.length, true);
    local.set(nameBytes, 30);
    local.set(dataBytes, 30 + nameBytes.length);
    localParts.push(local);
    const central = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, dataBytes.length, true);
    cv.setUint32(24, dataBytes.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint32(42, offset, true);
    central.set(nameBytes, 46);
    centralParts.push(central);
    offset += local.length;
  }
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  const total = new Uint8Array(offset + centralSize + 22);
  let pos = 0;
  for (const part of localParts) { total.set(part, pos); pos += part.length; }
  for (const part of centralParts) { total.set(part, pos); pos += part.length; }
  total.set(eocd, pos);
  return new Blob([total], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function buildXlsx(matrix, sheetName, colWidths) {
  const contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>';
  const rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${escapeXml(sheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;
  const workbookRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>';
  return zipStore([
    { name: '[Content_Types].xml', data: contentTypes },
    { name: '_rels/.rels', data: rels },
    { name: 'xl/workbook.xml', data: workbook },
    { name: 'xl/_rels/workbook.xml.rels', data: workbookRels },
    { name: 'xl/worksheets/sheet1.xml', data: buildSheetXml(matrix, colWidths) }
  ]);
}

export function exportPlansExcel(plans, providerInfo) {
  const rows = prepareExportRows(plans, providerInfo);
  if (!rows.length) return false;
  const matrix = [
    EXPORT_COLUMNS.map(col => col.label),
    ...rows.map(row => EXPORT_COLUMNS.map(col => row[col.key]))
  ];
  const blob = buildXlsx(matrix, '套餐数据', EXPORT_COL_WIDTHS);
  downloadBlob(blob, `creditsplan_套餐数据_${exportTimestamp()}.xlsx`);
  return true;
}

export function exportModelPricesExcel(models) {
  const rows = prepareModelPriceRows(models);
  if (!rows.length) return false;
  const matrix = [
    MODEL_EXPORT_COLUMNS.map(col => col.label),
    ...rows.map(row => MODEL_EXPORT_COLUMNS.map(col => row[col.key]))
  ];
  const blob = buildXlsx(matrix, '模型价格', MODEL_EXPORT_COL_WIDTHS);
  downloadBlob(blob, `creditsplan_模型价格_${exportTimestamp()}.xlsx`);
  return true;
}

/* ─── Word (.doc HTML document format) ─── */

const WORD_COL_WIDTHS = ['8%', '14%', '8%', '8%', '8%', '8%', '10%', '6%', '10%', '5%', '7%', '8%'];

function buildWordHtml(title, columns, colWidths, rows) {
  const headerHtml = columns.map((col, i) => `<th style="width:${colWidths[i]}">${escapeXml(col.label)}</th>`).join('');
  const bodyHtml = rows.map(row => (
    `<tr>${columns.map(col => `<td>${escapeXml(row[col.key])}</td>`).join('')}</tr>`
  )).join('\n');
  const dateStr = new Date().toLocaleDateString('zh-CN');
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${escapeXml(title)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page WordSection1 {size: 841.9pt 595.3pt; mso-page-orientation: landscape; margin: 36pt 36pt 36pt 36pt;}
div.WordSection1 {page: WordSection1;}
body{font-family:"Microsoft YaHei","PingFang SC",sans-serif;font-size:11px;color:#1e293b;}
h1{font-size:18px;margin-bottom:4px;}
p.meta{color:#64748b;font-size:10px;margin-top:0;}
table{border-collapse:collapse;width:100%;table-layout:fixed;}
th,td{border:1px solid #cbd5e1;padding:4px 6px;text-align:left;vertical-align:top;word-wrap:break-word;word-break:break-all;}
th{background:#f1f5f9;font-weight:bold;white-space:nowrap;}
</style></head>
<body>
<div class="WordSection1">
<h1>${escapeXml(title)}</h1>
<p class="meta">数据来源：creditsplan.cn · 导出日期：${dateStr} · 共 ${rows.length} 条记录 · 真实价格请以厂商官网为准</p>
<table><thead><tr>${headerHtml}</tr></thead><tbody>
${bodyHtml}
</tbody></table>
</div>
</body></html>`;
}

export function exportPlansWord(plans, providerInfo) {
  const rows = prepareExportRows(plans, providerInfo);
  if (!rows.length) return false;
  const html = buildWordHtml('国内 AI Coding 套餐对比数据', EXPORT_COLUMNS, WORD_COL_WIDTHS, rows);
  const blob = new Blob(['\uFEFF', html], { type: 'application/msword;charset=utf-8' });
  downloadBlob(blob, `creditsplan_套餐数据_${exportTimestamp()}.doc`);
  return true;
}

export function exportModelPricesWord(models) {
  const rows = prepareModelPriceRows(models);
  if (!rows.length) return false;
  const html = buildWordHtml(MODEL_EXPORT_TITLE, MODEL_EXPORT_COLUMNS, MODEL_WORD_COL_WIDTHS, rows);
  const blob = new Blob(['\uFEFF', html], { type: 'application/msword;charset=utf-8' });
  downloadBlob(blob, `creditsplan_模型价格_${exportTimestamp()}.doc`);
  return true;
}

/* ─── PDF (Canvas rendering, zero dependencies) ─── */

const PDF_PAGE_WIDTH = 842;   // A4 landscape @96dpi
const PDF_PAGE_HEIGHT = 595;
const PDF_MARGIN = 36;
const PDF_HEADER_HEIGHT = 52;
const PDF_LINE_HEIGHT = 14;
const PDF_CELL_PAD_Y = 5;
const PDF_HEAD_ROW_HEIGHT = 24;
const PDF_FONT = '11px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif';
const PDF_FONT_BOLD = 'bold 11px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif';
const PDF_TITLE_FONT = 'bold 16px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif';

const PDF_COL_RATIOS = [0.08, 0.14, 0.08, 0.08, 0.08, 0.08, 0.10, 0.06, 0.10, 0.05, 0.07, 0.08];

function pdfColWidths(ratios) {
  const total = PDF_PAGE_WIDTH - PDF_MARGIN * 2;
  return ratios.map(ratio => total * ratio);
}

function wrapText(ctx, text, maxWidth) {
  const value = String(text || '');
  if (!value) return [''];
  if (ctx.measureText(value).width <= maxWidth) return [value];
  const lines = [];
  let current = '';
  for (const char of value) {
    if (current && ctx.measureText(current + char).width > maxWidth) {
      lines.push(current);
      current = char;
    } else {
      current += char;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function renderPdfPages(rows, title, columns, ratios) {
  const colWidths = pdfColWidths(ratios);
  const tableWidth = PDF_PAGE_WIDTH - PDF_MARGIN * 2;
  const bodyTop = PDF_MARGIN + PDF_HEADER_HEIGHT;
  const pageBottom = PDF_PAGE_HEIGHT - PDF_MARGIN - 24;

  const measureCtx = document.createElement('canvas').getContext('2d');
  measureCtx.font = PDF_FONT;
  const wrappedRows = rows.map(row => {
    const cells = columns.map((col, colIndex) =>
      wrapText(measureCtx, row[col.key], colWidths[colIndex] - 10)
    );
    const maxLines = Math.max(1, ...cells.map(lines => lines.length));
    return { cells, height: maxLines * PDF_LINE_HEIGHT + PDF_CELL_PAD_Y * 2 };
  });

  const pagesContent = [];
  let currentPage = [];
  let usedHeight = 0;
  for (const wrapped of wrappedRows) {
    if (currentPage.length && usedHeight + wrapped.height > pageBottom - bodyTop - PDF_HEAD_ROW_HEIGHT) {
      pagesContent.push(currentPage);
      currentPage = [];
      usedHeight = 0;
    }
    currentPage.push(wrapped);
    usedHeight += wrapped.height;
  }
  if (currentPage.length) pagesContent.push(currentPage);

  const pageCount = pagesContent.length;
  const pages = [];

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const canvas = document.createElement('canvas');
    canvas.width = PDF_PAGE_WIDTH * 2;
    canvas.height = PDF_PAGE_HEIGHT * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT);

    ctx.fillStyle = '#0f172a';
    ctx.font = PDF_TITLE_FONT;
    ctx.fillText(title, PDF_MARGIN, PDF_MARGIN + 18);
    ctx.font = PDF_FONT;
    ctx.fillStyle = '#64748b';
    const dateStr = new Date().toLocaleDateString('zh-CN');
    ctx.fillText(
      `数据来源：creditsplan.cn · 导出日期：${dateStr} · 第 ${pageIndex + 1}/${pageCount} 页`,
      PDF_MARGIN, PDF_MARGIN + 38
    );

    let y = bodyTop;
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(PDF_MARGIN, y, tableWidth, PDF_HEAD_ROW_HEIGHT);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(PDF_MARGIN, y, tableWidth, PDF_HEAD_ROW_HEIGHT);
    ctx.font = PDF_FONT_BOLD;
    ctx.fillStyle = '#1e293b';
    ctx.textBaseline = 'middle';
    let x = PDF_MARGIN;
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      ctx.fillText(columns[colIndex].label, x + 5, y + PDF_HEAD_ROW_HEIGHT / 2);
      x += colWidths[colIndex];
    }
    y += PDF_HEAD_ROW_HEIGHT;

    ctx.font = PDF_FONT;
    const pageRows = pagesContent[pageIndex];
    for (let rowIndex = 0; rowIndex < pageRows.length; rowIndex++) {
      const wrapped = pageRows[rowIndex];
      if (rowIndex % 2 === 1) {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(PDF_MARGIN, y, tableWidth, wrapped.height);
      }
      ctx.strokeStyle = '#e2e8f0';
      ctx.strokeRect(PDF_MARGIN, y, tableWidth, wrapped.height);
      x = PDF_MARGIN;
      ctx.fillStyle = '#334155';
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        const cellLines = wrapped.cells[colIndex];
        for (let lineIndex = 0; lineIndex < cellLines.length; lineIndex++) {
          ctx.fillText(cellLines[lineIndex], x + 5, y + PDF_CELL_PAD_Y + lineIndex * PDF_LINE_HEIGHT + PDF_LINE_HEIGHT / 2);
        }
        x += colWidths[colIndex];
      }
      y += wrapped.height;
    }

    for (let colIndex = 0; colIndex <= columns.length; colIndex++) {
      const lineX = PDF_MARGIN + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(lineX, bodyTop);
      ctx.lineTo(lineX, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('真实价格请以厂商官网为准 — creditsplan.cn', PDF_MARGIN, PDF_PAGE_HEIGHT - 16);

    pages.push(canvas.toDataURL('image/jpeg', 0.92));
  }
  return pages;
}

function buildPdfFromJpegs(jpegDataUrls) {
  const objects = [];
  const pageObjectIds = [];
  let nextId = 1;
  const catalogId = nextId++;
  const pagesId = nextId++;

  for (const dataUrl of jpegDataUrls) {
    const binary = atob(dataUrl.split(',')[1]);
    const imageId = nextId++;
    const contentId = nextId++;
    pageObjectIds.push(contentId);
    objects.push({
      id: imageId,
      data: `<< /Type /XObject /Subtype /Image /Width 1684 /Height 1190 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${binary.length} >>\nstream\n${binary}\nendstream`
    });
    objects.push({
      id: contentId,
      data: `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 842 595] /Contents ${nextId} 0 R /Resources << /XObject << /Im0 ${imageId} 0 R >> >> >>`
    });
    const stream = `q 842 0 0 595 0 0 cm /Im0 Do Q`;
    objects.push({ id: nextId++, data: `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream` });
  }

  const kids = pageObjectIds.map(id => `${id} 0 R`).join(' ');
  objects.unshift(
    { id: pagesId, data: `<< /Type /Pages /Kids [${kids}] /Count ${pageObjectIds.length} >>` },
    { id: catalogId, data: `<< /Type /Catalog /Pages ${pagesId} 0 R >>` }
  );
  objects.sort((a, b) => a.id - b.id);

  let pdf = '%PDF-1.4\n';
  const offsets = new Map();
  for (const obj of objects) {
    offsets.set(obj.id, pdf.length);
    pdf += `${obj.id} 0 obj\n${obj.data}\nendobj\n`;
  }
  const xrefOffset = pdf.length;
  const maxId = objects.length;
  pdf += `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
  for (const obj of objects) {
    pdf += `${String(offsets.get(obj.id)).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${maxId + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: 'application/pdf' });
}

export function exportPlansPdf(plans, providerInfo) {
  const rows = prepareExportRows(plans, providerInfo);
  if (!rows.length) return false;
  const jpegPages = renderPdfPages(rows, '国内 AI Coding 套餐对比数据', EXPORT_COLUMNS, PDF_COL_RATIOS);
  const blob = buildPdfFromJpegs(jpegPages);
  downloadBlob(blob, `creditsplan_套餐数据_${exportTimestamp()}.pdf`);
  return true;
}

export function exportModelPricesPdf(models) {
  const rows = prepareModelPriceRows(models);
  if (!rows.length) return false;
  const jpegPages = renderPdfPages(rows, MODEL_EXPORT_TITLE, MODEL_EXPORT_COLUMNS, MODEL_PDF_RATIOS);
  const blob = buildPdfFromJpegs(jpegPages);
  downloadBlob(blob, `creditsplan_模型价格_${exportTimestamp()}.pdf`);
  return true;
}

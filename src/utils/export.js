export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function transactionsToCSV(rows) {
  const headers = ["id", "date", "description", "amount", "category", "type"];
  if (!rows.length) {
    return `${headers.join(",")}\n`;
  }
  const esc = (v) => {
    const s = String(v ?? "");
    if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ].join("\n");
}

export function exportTransactionsCSV(rows) {
  const csv = transactionsToCSV(rows);
  downloadBlob(
    "transactions.csv",
    new Blob([csv], { type: "text/csv;charset=utf-8" })
  );
}

export function exportTransactionsJSON(rows) {
  const json = JSON.stringify(rows, null, 2);
  downloadBlob(
    "transactions.json",
    new Blob([json], { type: "application/json;charset=utf-8" })
  );
}

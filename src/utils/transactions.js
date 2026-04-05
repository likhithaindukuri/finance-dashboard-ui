export function sortTransactions(list, sortBy) {
  const copy = [...list];
  switch (sortBy) {
    case "date-desc":
      return copy.sort((a, b) => b.date.localeCompare(a.date));
    case "date-asc":
      return copy.sort((a, b) => a.date.localeCompare(b.date));
    case "amount-desc":
      return copy.sort((a, b) => b.amount - a.amount);
    case "amount-asc":
      return copy.sort((a, b) => a.amount - b.amount);
    default:
      return copy;
  }
}

export function groupTransactions(list, groupBy) {
  if (groupBy === "none") {
    return [{ key: "all", label: null, items: list }];
  }
  if (groupBy === "category") {
    const map = new Map();
    for (const t of list) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category).push(t);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, items]) => ({
        key,
        label: `Category · ${key}`,
        items: [...items].sort((a, b) => b.date.localeCompare(a.date)),
      }));
  }
  if (groupBy === "month") {
    const map = new Map();
    for (const t of list) {
      const m = t.date.slice(0, 7);
      if (!map.has(m)) map.set(m, []);
      map.get(m).push(t);
    }
    return [...map.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, items]) => ({
        key,
        label: key,
        items: [...items].sort((a, b) => b.date.localeCompare(a.date)),
      }));
  }
  return [{ key: "all", label: null, items: list }];
}

export function uniqueCategories(transactions) {
  const set = new Set(transactions.map((t) => t.category));
  return [...set].sort((a, b) => a.localeCompare(b));
}

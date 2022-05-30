export default [
  { name: 'Trash', rarity: 0, price: 0 },
  { name: 'Cheap Fish', rarity: 0.1, price: 10 },
  { name: 'Average Fish', rarity: 0.4, price: 30 },
  { name: 'Rare Fish', rarity: 0.9, price: 100 },
].sort((a, b) => b.rarity - a.rarity)

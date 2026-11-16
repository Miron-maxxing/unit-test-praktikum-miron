function calculateTotal(items, discountCode) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }

  if (items.length === 0) {
    return 0;
  }

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  let total = subtotal;

  if (discountCode === 'STUDENT10') {
    total = total * 0.9;
  }

  // Parandatud: saatmiskulu lisandub ainult alla 100 € ostule
  // (ostusumma enne allahindlust).
  const freeShipping = subtotal >= 100;
  if (!freeShipping) {
    total += 5;
  }

  return total;
}

module.exports = { calculateTotal };

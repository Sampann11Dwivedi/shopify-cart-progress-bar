
function updateCartProgressBar() {
  fetch('/cart.js')
    .then(res => res.json())
    .then(cart => {
      const goal = 2000;
      const total = cart.total_price / 100;
      const remaining = Math.max(0, goal - total);
      const percent = Math.min(100, (total / goal) * 100);

      const fill = document.getElementById('cart-progress-fill');
      const messageEl = document.getElementById('cart-progress-message');
      const discountEl = document.getElementById('cart-discount-code');

      if (fill) fill.style.width = `${percent}%`;

      if (messageEl) {
        if (total >= goal) {
          messageEl.innerText = '🎉 You’ve unlocked Free Shipping!';
          if (discountEl) discountEl.style.display = 'block';
        } else {
          messageEl.innerText = `🛒 Add ₹${remaining} more to unlock Free Shipping!`;
          if (discountEl) discountEl.style.display = 'none';
        }
      }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartProgressBar();

  // Repeat every 3 seconds to detect cart updates via AJAX
  setInterval(updateCartProgressBar, 3000);
});

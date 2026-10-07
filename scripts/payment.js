/**
 * Project Nova — Payment & Membership Checkout Engine
 * Handles billing cycles, checkout modal, card preview, promo codes & receipt generator
 */

class NovaPayment {
  constructor() {
    this.billingCycle = 'annual'; // 'monthly' | 'annual'
    this.selectedPlan = null;
    this.discountApplied = 0;
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderPricingCards();
  }

  bindEvents() {
    // Billing Cycle Toggle
    const billingMonthlyBtn = document.getElementById('billing-monthly-btn');
    const billingAnnualBtn = document.getElementById('billing-annual-btn');

    if (billingMonthlyBtn && billingAnnualBtn) {
      billingMonthlyBtn.addEventListener('click', () => {
        this.billingCycle = 'monthly';
        billingMonthlyBtn.classList.add('active');
        billingAnnualBtn.classList.remove('active');
        this.renderPricingCards();
      });

      billingAnnualBtn.addEventListener('click', () => {
        this.billingCycle = 'annual';
        billingAnnualBtn.classList.add('active');
        billingMonthlyBtn.classList.remove('active');
        this.renderPricingCards();
      });
    }

    // Checkout Modal close
    const checkoutCloseBtn = document.getElementById('checkout-modal-close');
    const checkoutOverlay = document.getElementById('checkout-modal-overlay');
    if (checkoutCloseBtn) {
      checkoutCloseBtn.addEventListener('click', () => this.closeCheckout());
    }
    if (checkoutOverlay) {
      checkoutOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutOverlay) this.closeCheckout();
      });
    }

    // Payment Method Tabs
    const paymentTabs = document.querySelectorAll('.payment-tab-btn');
    paymentTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        paymentTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const method = tab.getAttribute('data-method');
        this.switchPaymentMethod(method);
      });
    });

    // Live Card Input Mirroring
    const cardNumInput = document.getElementById('card-number-input');
    const cardNameInput = document.getElementById('card-name-input');
    const cardExpInput = document.getElementById('card-exp-input');

    const cardNumDisplay = document.getElementById('card-num-display');
    const cardNameDisplay = document.getElementById('card-name-display');
    const cardExpDisplay = document.getElementById('card-exp-display');

    if (cardNumInput && cardNumDisplay) {
      cardNumInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        val = val.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = val;
        cardNumDisplay.textContent = val || '•••• •••• •••• ••••';
      });
    }

    if (cardNameInput && cardNameDisplay) {
      cardNameInput.addEventListener('input', (e) => {
        cardNameDisplay.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
      });
    }

    if (cardExpInput && cardExpDisplay) {
      cardExpInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
        e.target.value = val;
        cardExpDisplay.textContent = val || 'MM/YY';
      });
    }

    // Promo Code Application
    const promoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('promo-code-input');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === 'NOVA2026' || code === 'FUTURE') {
          this.discountApplied = 0.15;
          window.NovaApp.showToast('Promo code applied: 15% VIP discount!', 'success');
          this.updateCheckoutSummary();
        } else {
          window.NovaApp.showToast('Invalid promo code. Try "NOVA2026"', 'info');
        }
      });
    }

    // Confirm Payment Submit
    const paySubmitBtn = document.getElementById('pay-submit-btn');
    if (paySubmitBtn) {
      paySubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.processPayment();
      });
    }
  }

  renderPricingCards() {
    const container = document.getElementById('pricing-cards-container');
    if (!container || !window.NOVA_DATA) return;

    container.innerHTML = window.NOVA_DATA.plans.map(plan => {
      const price = this.billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
      const billedNote = plan.monthlyPrice === 0 ? 'No credit card required' : 
        (this.billingCycle === 'annual' ? `Billed $${price * 12} annually` : 'Billed monthly');

      return `
        <div class="pricing-card ${plan.featured ? 'featured' : ''}">
          ${plan.badge ? `<div class="pricing-card-badge">${plan.badge}</div>` : ''}
          <h3>${plan.name}</h3>
          <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-secondary);">${plan.description}</p>
          
          <div class="pricing-price">
            ${plan.monthlyPrice === 0 ? '$0' : `$${price}`}
            <span>/${plan.period}</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: -8px;">${billedNote}</div>

          <div class="pricing-features">
            ${plan.features.map(f => `
              <div class="pricing-feature-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>

          <button class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}" onclick="window.NovaPaymentInstance.openCheckout('${plan.id}')" style="width: 100%; margin-top: auto;">
            ${plan.ctaText}
          </button>
        </div>
      `;
    }).join('');
  }

  openCheckout(planId) {
    const plan = window.NOVA_DATA.plans.find(p => p.id === planId);
    if (!plan) return;

    this.selectedPlan = plan;
    this.updateCheckoutSummary();

    const overlay = document.getElementById('checkout-modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCheckout() {
    const overlay = document.getElementById('checkout-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  switchPaymentMethod(method) {
    const cardSection = document.getElementById('card-payment-fields');
    const altSection = document.getElementById('alt-payment-fields');
    const altMessage = document.getElementById('alt-payment-message');

    if (method === 'card') {
      if (cardSection) cardSection.style.display = 'block';
      if (altSection) altSection.style.display = 'none';
    } else {
      if (cardSection) cardSection.style.display = 'none';
      if (altSection) {
        altSection.style.display = 'block';
        if (altMessage) {
          altMessage.textContent = method === 'crypto' 
            ? 'Connect your Web3 Wallet (Metamask/Phantom) or send USDC to: 0x9fA2...3B91'
            : 'Clicking pay will launch Apple Pay / Google Pay authentication biometric sheet.';
        }
      }
    }
  }

  updateCheckoutSummary() {
    if (!this.selectedPlan) return;

    const basePrice = this.billingCycle === 'annual' ? this.selectedPlan.annualPrice * 12 : this.selectedPlan.monthlyPrice;
    const discount = basePrice * this.discountApplied;
    const finalPrice = Math.max(0, basePrice - discount).toFixed(2);

    const planNameEl = document.getElementById('checkout-plan-name');
    const cycleEl = document.getElementById('checkout-billing-cycle');
    const totalEl = document.getElementById('checkout-total-amount');

    if (planNameEl) planNameEl.textContent = this.selectedPlan.name;
    if (cycleEl) cycleEl.textContent = this.billingCycle === 'annual' ? 'Annual (12 Months)' : 'Monthly';
    if (totalEl) totalEl.textContent = `$${finalPrice}`;
  }

  processPayment() {
    const payBtn = document.getElementById('pay-submit-btn');
    if (!payBtn) return;

    payBtn.disabled = true;
    payBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Authorizing Secure Payment...
    `;

    setTimeout(() => {
      payBtn.disabled = false;
      payBtn.innerHTML = 'Complete Order';
      this.closeCheckout();

      // Store in localStorage
      const receipt = {
        id: 'INV-' + Math.floor(100000 + Math.random() * 900000),
        plan: this.selectedPlan.name,
        date: new Date().toLocaleDateString(),
        amount: document.getElementById('checkout-total-amount').textContent
      };
      localStorage.setItem('nova_active_subscription', JSON.stringify(receipt));

      window.NovaApp.showToast(`Success! You are now subscribed to ${this.selectedPlan.name}. Receipt #${receipt.id} generated.`, 'success');
    }, 1200);
  }
}

window.NovaPayment = NovaPayment;

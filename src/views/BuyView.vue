<template>
  <div class="checkout-page" v-if="IFdata">
    <div class="checkout-card">
      <!-- צד שמאל: טופס תשלום -->
      <form class="payment-form">
        <h1 class="title">תשלום להזמנה</h1>
        <p class="subtitle">מלא את פרטי התשלום כדי לסיים את ההזמנה</p>

        <!-- פרטים אישיים -->
        <div class="form-section">
          <h2 class="section-title">פרטים אישיים</h2>

          <div class="field-group">
            <label class="field-label">שם מלא</label>
            <input
              class="field-input"
              type="text"
              placeholder="כמו שמופיע בתעודת הזהות"
            />
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">תעודת זהות</label>
              <input class="field-input" type="text" placeholder="ת.ז" />
            </div>

            <div class="field-group">
              <label class="field-label">מספר טלפון</label>
              <input
                class="field-input"
                type="tel"
                placeholder="05x-xxx-xxxx"
              />
            </div>
          </div>
        </div>

        <!-- פרטי אשראי -->
        <div class="form-section">
          <h2 class="section-title">פרטי אשראי</h2>

          <div class="field-group">
            <label class="field-label">מספר כרטיס אשראי</label>
            <input
              class="field-input"
              type="text"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">תוקף (MM/YY)</label>
              <input class="field-input" type="text" placeholder="12/28" />
            </div>

            <div class="field-group">
              <label class="field-label">CVV</label>
              <input class="field-input" type="password" placeholder="***" />
            </div>
          </div>
        </div>

        <!-- תנאים וכפתור -->
        <div class="form-footer">
          <label class="checkbox-row">
            <input type="checkbox" />
            <span>אני מאשר/ת את תנאי השימוש ומדיניות הפרטיות</span>
          </label>

          <button type="button" class="pay-btn">לשלם עכשיו</button>

          <p class="secure-note">התשלום מאובטח ומוצפן</p>
        </div>
      </form>

      <!-- צד ימין: סיכום הזמנה (סטטי) -->
      <aside class="summary-box">
        <h2>סיכום הזמנה</h2>

        <div class="summary-list">
          <div class="summary-item" v-for="item in Products" :key="item.id">
            <div>
              <p class="item-title">{{ item.title }}</p>
              <p class="item-subtitle">{{ item.nameP }}</p>
            </div>
            <span class="item-price">₪{{ item.price * item.Cmut }}</span>
          </div>
        </div>

        <div class="summary-row">
          <span>סכום ביניים</span>
          <span>₪0</span>
        </div>

        <div class="summary-row">
          <span>משלוח</span>
          <span>₪0</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row total">
          <span>סכום סופי לתשלום</span>
          <span>₪{{ Total }}</span>
        </div>

        <div class="summary-badge">מספר הזמנה: <span>#1027</span></div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const Total = computed(() => store.state.sof);
const Products = computed(() => store.state.products);
const IFdata = computed(() => Boolean(Total.value && Products.value));
</script>

<style lang="scss" scoped>
.checkout-page {
  min-height: 100vh;
  padding: 20px;
  background: #0f0f10;
  color: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  direction: rtl;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.checkout-card {
  width: 100%;
  max-width: 960px;
  background: #151518;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
  padding: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.9fr);
  gap: 18px;
}

/* ===== טופס תשלום ===== */

.payment-form {
  .title {
    font-size: 22px;
    margin: 0 0 4px;
  }

  .subtitle {
    font-size: 13px;
    color: #b7b7b7;
    margin: 0 0 16px;
  }

  .form-section {
    background: #1a1a1e;
    border-radius: 14px;
    padding: 12px 12px 14px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    margin-bottom: 12px;

    .section-title {
      font-size: 15px;
      margin: 0 0 10px;
    }

    .field-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .field-group {
        flex: 1;
        min-width: 120px;
      }
    }

    .field-group {
      margin-bottom: 8px;

      .field-label {
        display: block;
        font-size: 12px;
        margin-bottom: 3px;
        color: #c9c9c9;
      }

      .field-input {
        width: 100%;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: #101014;
        color: #ffffff;
        font-size: 13px;
        outline: none;
        box-sizing: border-box; // ✅ התיקון לחריגה
        transition: border 0.15s ease, box-shadow 0.15s ease;

        &::placeholder {
          color: #6f6f76;
        }

        &:focus {
          border-color: rgba(255, 62, 85, 0.8);
          box-shadow: 0 0 0 1px rgba(255, 62, 85, 0.7);
        }
      }
    }
  }

  .form-footer {
    margin-top: 8px;

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #c5c5c5;
      margin-bottom: 10px;

      input[type="checkbox"] {
        width: 14px;
        height: 14px;
        accent-color: #ff1e3c;
      }
    }

    .pay-btn {
      width: 100%;
      border: none;
      border-radius: 999px;
      padding: 10px 0;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(135deg, #ff1e3c, #ff4b4b);
      color: #ffffff;
      box-shadow: 0 14px 32px rgba(255, 0, 0, 0.5);
      transition: transform 0.1s ease, filter 0.2s ease;

      &:hover {
        filter: brightness(1.06);
        transform: translateY(-1px);
      }
    }

    .secure-note {
      text-align: center;
      font-size: 11px;
      color: #8a8a99;
      margin-top: 6px;
    }
  }
}

/* ===== סיכום הזמנה ===== */

.summary-box {
  background: #19191d;
  border-radius: 16px;
  padding: 14px 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-size: 17px;
    margin: 0 0 6px;
  }

  .summary-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 4px;

    .summary-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.06);

      .item-title {
        font-size: 13px;
        margin: 0;
      }

      .item-subtitle {
        font-size: 11px;
        color: #b4b4b4;
        margin: 2px 0 0;
      }

      .item-price {
        font-size: 13px;
        font-weight: 600;
      }
    }

    .summary-item:last-child {
      border-bottom: none;
    }
  }

  .summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #e2e2e2;

    &.total {
      margin-top: 2px;
      font-weight: 700;

      span:last-child {
        color: #ff4b4b;
        font-size: 15px;
      }
    }
  }

  .summary-divider {
    margin: 6px 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }

  .summary-badge {
    margin-top: 6px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 999px;
    padding: 5px 8px;
    text-align: center;
    color: #c5c5c5;

    span {
      color: #ffffff;
      font-weight: 600;
    }
  }
}

/* ===== רספונסיב ===== */

@media (max-width: 840px) {
  .checkout-card {
    grid-template-columns: 1fr;
  }
}
</style>

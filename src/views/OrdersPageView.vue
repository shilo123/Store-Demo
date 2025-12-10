<template>
  <div class="container orders-page" v-if="data">
    <div class="orders-header">
      <div>
        <h1>ההזמנות שלי</h1>
        <p class="subtitle">כאן תראה את כל המוצרים שהזמנת ואת הסיכום שלהם</p>
      </div>

      <div class="orders-badge">
        <span class="orders-count">{{ CmputedMaxProd }} פריטים</span>
        <span class="orders-total">₪{{ ComputedSof }}</span>
      </div>
    </div>

    <div class="orders-layout">
      <!-- צד שמאל: רשימת מוצרים בהזמנה -->
      <div class="orders-list">
        <!-- כרטיס הזמנה 1 -->
        <div class="order-card" v-for="item in data" :key="item.id">
          <div class="order-main">
            <img :src="item.imgURL" class="order-img" />
            <div class="order-info">
              <h3 class="order-title">{{ item.title }}</h3>
              <p class="order-nameP">{{ item.nameP }}</p>
              <p class="order-meta">מזהה הזמנה #{{ item.id }}</p>
            </div>
          </div>

          <div class="order-side">
            <div class="order-qty">
              <span class="label">כמות</span>
              <span class="value">{{ item.Cmut }}</span>
            </div>
            <div class="order-price">
              <span class="label">מחיר ליחידה</span>
              <span class="value">₪{{ item.price }}</span>
            </div>
            <div class="order-line-total">
              <span class="label">סה״כ</span>
              <span class="value">₪{{ item.price * item.Cmut }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- צד ימין: סיכום הזמנה -->
      <aside class="order-summary">
        <h2>סיכום ההזמנה</h2>

        <div class="summary-row">
          <span>סה״כ פריטים</span>
          <span>{{ CmputedMaxProd }}</span>
        </div>

        <div class="summary-row">
          <span>סכום ביניים</span>
          <span>₪20</span>
        </div>

        <div class="summary-row">
          <span>משלוח</span>
          <span>₪0</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row summary-total">
          <span>סכום סופי לתשלום</span>
          <span>₪{{ ComputedSof }}</span>
        </div>

        <button class="summary-btn" @click="Tashlum">לתשלום</button>
      </aside>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable vue/multi-word-component-names */
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

defineOptions({
  name: "OrdersPageView",
});

const route = useRoute();
const router = useRouter();
const store = useStore();

const data = ref(null);

const CmputedMaxProd = computed(() =>
  data.value ? data.value.reduce((acc, num) => acc + num.Cmut, 0) : 0
);

const ComputedSof = computed(() =>
  data.value
    ? data.value.map((e) => e.price * e.Cmut).reduce((acc, num) => acc + num, 0)
    : 0
);

const Tashlum = () => {
  store.commit("SET_PRODUCTS", {
    prod: data.value,
    ComputedSof: ComputedSof.value,
  });
  router.push(`/Buy`);
};

onMounted(async () => {
  const arrIds = route.params.id.split(",");
  const { data: products } = await axios.post("/ProductBuy", arrIds);
  data.value = products;
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 16px;
  background: #0f0f10;
  color: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  direction: rtl;
}

.orders-page {
  .orders-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 12px;

    h1 {
      font-size: 24px;
      margin: 0;
    }

    .subtitle {
      margin: 4px 0 0;
      font-size: 13px;
      color: #b5b5b5;
    }

    .orders-badge {
      display: flex;
      align-items: center;
      gap: 8px;

      .orders-count {
        font-size: 13px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.06);
      }

      .orders-total {
        font-size: 14px;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(255, 30, 60, 0.2);
        border: 1px solid rgba(255, 30, 60, 0.6);
        color: #ff4b4b;
      }
    }
  }

  .orders-layout {
    display: grid;
    grid-template-columns: minmax(0, 2.2fr) minmax(260px, 0.9fr);
    gap: 18px;
  }

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .order-card {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 14px;
    background: #17171a;
    border: 1px solid rgba(255, 255, 255, 0.04);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  }

  .order-main {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .order-img {
    width: 58px;
    height: 58px;
    border-radius: 12px;
    object-fit: cover;
  }

  .order-info {
    .order-title {
      font-size: 15px;
      margin: 0 0 2px;
    }

    .order-nameP {
      font-size: 13px;
      margin: 0 0 4px;
      color: #c7c7c7;
    }

    .order-meta {
      font-size: 11px;
      margin: 0;
      color: #8a8a8a;
    }
  }

  .order-side {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;

    .label {
      display: block;
      color: #9a9a9a;
      margin-bottom: 2px;
    }

    .value {
      font-weight: 600;
    }

    .order-line-total .value {
      color: #ff4b4b;
      font-size: 13px;
    }
  }

  .order-summary {
    background: #17171a;
    border-radius: 16px;
    padding: 14px 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.5);

    h2 {
      font-size: 18px;
      margin: 0 0 12px;
    }

    .summary-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 6px;
      color: #e2e2e2;

      &.summary-total {
        font-weight: 700;
        font-size: 14px;

        span:last-child {
          color: #ff4b4b;
          font-size: 15px;
        }
      }
    }

    .summary-divider {
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.26),
        transparent
      );
      margin: 10px 0;
    }

    .summary-btn {
      width: 100%;
      margin-top: 10px;
      border: none;
      border-radius: 999px;
      padding: 9px 0;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(135deg, #ff1e3c, #ff4b4b);
      color: #ffffff;
      box-shadow: 0 12px 28px rgba(255, 0, 0, 0.45);
      transition: transform 0.1s ease, filter 0.2s ease;

      &:hover {
        filter: brightness(1.05);
        transform: translateY(-1px);
      }
    }
  }

  @media (max-width: 800px) {
    .orders-layout {
      grid-template-columns: 1fr;
    }

    .order-side {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>

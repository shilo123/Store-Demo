<template>
  <div class="home-page">
    <!-- פס עליון / לוגו + כפתור -->
    <header class="top-bar">
      <div class="logo">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">RedShop</span>
      </div>

      <div class="orders-wrapper">
        <button class="top-bar-btn" @click="Pagehazmanotsheli">
          ההזמנות שלי
        </button>

        <span class="orders-count" v-if="productBuy.length">{{
          productBuy.length
        }}</span>
        <span class="orders-sum" v-if="productBuy.length"
          >₪{{ TotalPrice }}</span
        >
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <h1>ברוך הבא לחנות האדומה 🔥</h1>
        <p>מבצעים חמים, עיצוב לוהט, ומוצרים שיעיפו לך את הראש.</p>

        <div class="hero-actions">
          <button class="primary-btn">לקנות עכשיו</button>
          <button class="secondary-btn">לראות מבצעים</button>
        </div>
      </div>

      <div class="hero-card">
        <p class="hero-card-title">מבצע היום</p>
        <p class="hero-card-desc">עד 30% הנחה על מוצרים נבחרים</p>
        <p class="hero-card-mini">* לזמן מוגבל</p>
      </div>
    </section>

    <!-- אזור מוצרים (כרגע פלייסהולדרים) -->
    <main class="products-section">
      <div class="section-header">
        <h2>מוצרים נבחרים</h2>
        <span class="section-subtitle"> המוצרים שלנו</span>
      </div>

      <div class="products-grid" v-if="data">
        <!-- כאן בעתיד תשב קומפוננטת ProductCard -->
        <cardOfProduct
          v-for="D in data"
          :key="D.id"
          :nameP="D.nameP"
          :id="D.id"
          :price="D.price"
          :url="D.imgURL"
          :title="D.title"
          @buy="buyProduct"
        ></cardOfProduct>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import cardOfProduct from "@/components/card-of-product.vue";

defineOptions({
  name: "HomePageView",
});

const router = useRouter();
const data = ref(null);
const productBuy = ref([]);

const TotalPrice = computed(() =>
  productBuy.value.reduce((acc, p) => acc + p.price, 0)
);

const buyProduct = async (id) => {
  const { data: product } = await axios.get(`/Findproducts/${id}`);
  productBuy.value.push(product);
};

const Pagehazmanotsheli = () => {
  if (productBuy.value.length) {
    const arrIdsShare = productBuy.value.map((el) => el.id).join(",");
    router.push(`/Orders/${arrIdsShare}`);
  }
};

onMounted(async () => {
  try {
    const { data: products } = await axios.get("/products");
    data.value = products;
  } catch (error) {
    console.log("לא הצליח יא אח", error);
  }
});
</script>

<style lang="scss" scoped>
.orders-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;

  .orders-count {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #ff1e3c;
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 999px;
    box-shadow: 0 0 0 2px #1b1b1d;
  }

  .orders-sum {
    margin-right: 8px;
    background: rgba(255, 30, 60, 0.15);
    color: #ff4b4b;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid rgba(255, 30, 60, 0.4);
  }
}

.home-page {
  min-height: 100vh;
  background: #0f0f10;
  color: #ffffff;
  padding: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  direction: rtl;
}

/* פס עליון */
.top-bar {
  position: sticky;
  top: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #1b1b1d, #260408);
  border-radius: 999px;
  padding: 10px 18px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 22px;
}

.logo-text {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.top-bar-btn {
  border: none;
  outline: none;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.3fr);
  gap: 20px;
  align-items: stretch;
  margin-bottom: 32px;
}

.hero-text {
  background: radial-gradient(
    circle at top left,
    #3b050a 0,
    #130306 40%,
    #08080a 100%
  );
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 0, 0, 0.3);
  box-shadow: 0 18px 40px rgba(255, 0, 0, 0.14);
}

.hero-text h1 {
  font-size: 28px;
  margin-bottom: 8px;
}

.hero-text p {
  color: #d3d3d3;
  font-size: 14px;
  margin-bottom: 18px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.primary-btn {
  border: none;
  outline: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;
  background: linear-gradient(135deg, #ff1e3c, #ff4b4b);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(255, 0, 0, 0.4);
  transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.2s ease;

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 16px 30px rgba(255, 0, 0, 0.5);
  }
}

.secondary-btn {
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
}

/* Hero side card */
.hero-card {
  background: linear-gradient(150deg, #2c0208, #610313);
  border-radius: 24px;
  padding: 20px;
  border: 1px solid rgba(255, 140, 140, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.hero-card-title {
  font-size: 16px;
  font-weight: 700;
}

.hero-card-desc {
  font-size: 14px;
  color: #ffd4d4;
}

.hero-card-mini {
  font-size: 12px;
  color: #ff9ea8;
}

/* Products section */
.products-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-header h2 {
  font-size: 20px;
}

.section-subtitle {
  font-size: 12px;
  color: #b5b5b5;
}

/* 🔥 גריד דינמי לפי רוחב מסך */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 14px;
}

/* ===== התאמות למסכים בינוניים (טאבלט) ===== */
@media (max-width: 900px) {
  .home-page {
    padding: 12px;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .hero-card {
    order: -1; // שהכרטיס יעבור למעלה בנייד/טאבלט
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

/* ===== התאמות חזקות לנייד ===== */
@media (max-width: 600px) {
  .home-page {
    padding: 10px;
  }

  .top-bar {
    padding: 8px 12px;
    margin-bottom: 14px;
    border-radius: 18px;

    .top-bar-btn {
      font-size: 12px;
      padding: 6px 12px;
    }

    .orders-wrapper {
      gap: 6px;

      .orders-count,
      .orders-sum {
        font-size: 11px;
        padding: 3px 8px;
      }
    }
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }
}

/* ===== מכשירים ממש קטנים ===== */
@media (max-width: 360px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
}
</style>

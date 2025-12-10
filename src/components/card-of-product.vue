<template>
  <div class="container">
    <div class="card">
      <img :src="url" class="product-img" />

      <div class="content">
        <h3 class="title">{{ title }}</h3>
        <p class="nameP">{{ nameP }}</p>
        <p class="price">{{ price }} ₪</p>

        <button class="buy-btn" @click="onBuy">לקנייה</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nameP: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
  price: {
    type: [String, Number],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["buy"]);

const onBuy = () => {
  emit("buy", props.id);
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 220px;
    background: linear-gradient(180deg, #1a1a1d, #0f0f12);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 0, 0, 0.25);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(255, 0, 0, 0.25);
    }

    .product-img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .content {
      padding: 12px;
      text-align: center;

      .title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 4px;
        color: #ffffff;
      }

      .nameP {
        font-size: 13px;
        color: #bdbdbd;
        margin-bottom: 8px;
      }

      .price {
        font-size: 15px;
        font-weight: 700;
        color: #ff4b4b;
        margin-bottom: 10px;
      }

      .buy-btn {
        width: 100%;
        padding: 8px 0;
        border: none;
        border-radius: 999px;
        background: linear-gradient(135deg, #ff1e3c, #ff4b4b);
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.1s ease, filter 0.2s ease;

        &:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
      }
    }
  }
}
</style>

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// דאטה פייק
const products = [
  {
    id: 1,
    title: "כובע ספורט",
    nameP: "Sport Cap",
    price: 49,
    imgURL: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "חולצת טי בסיסית",
    nameP: "Basic T-Shirt",
    price: 59,
    imgURL: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "נעלי ריצה קלות",
    nameP: "Light Running Shoes",
    price: 299,
    imgURL: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    title: "שעון ספורט חכם",
    nameP: "Smart Sport Watch",
    price: 399,
    imgURL: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    title: "אוזניות אלחוטיות",
    nameP: "Wireless Earbuds",
    price: 199,
    imgURL: "https://picsum.photos/300/200?random=5",
  },
  {
    id: 6,
    title: "תיק גב יום־יומי",
    nameP: "Everyday Backpack",
    price: 149,
    imgURL: "https://picsum.photos/300/200?random=6",
  },
  {
    id: 7,
    title: "משקפי שמש",
    nameP: "Sunglasses",
    price: 129,
    imgURL: "https://picsum.photos/300/200?random=7",
  },
  {
    id: 8,
    title: "מכנס ספורט",
    nameP: "Sport Pants",
    price: 99,
    imgURL: "https://picsum.photos/300/200?random=8",
  },
  {
    id: 9,
    title: "בקבוק שתייה",
    nameP: "Water Bottle",
    price: 39,
    imgURL: "https://picsum.photos/300/200?random=9",
  },
  {
    id: 10,
    title: "מעיל חורף",
    nameP: "Winter Jacket",
    price: 349,
    imgURL: "https://picsum.photos/300/200?random=10",
  },
  {
    id: 11,
    title: "חולצת דריי פיט",
    nameP: "Dry-Fit Shirt",
    price: 89,
    imgURL: "https://picsum.photos/300/200?random=11",
  },
  {
    id: 12,
    title: "גרבי ריצה",
    nameP: "Running Socks",
    price: 29,
    imgURL: "https://picsum.photos/300/200?random=12",
  },
  {
    id: 13,
    title: "כפפות אימון",
    nameP: "Training Gloves",
    price: 69,
    imgURL: "https://picsum.photos/300/200?random=13",
  },
  {
    id: 14,
    title: "כדור כדורסל",
    nameP: "Basketball",
    price: 119,
    imgURL: "https://picsum.photos/300/200?random=14",
  },
  {
    id: 15,
    title: "כדור כדורגל",
    nameP: "Football",
    price: 109,
    imgURL: "https://picsum.photos/300/200?random=15",
  },
  {
    id: 16,
    title: "כדור טניס סט",
    nameP: "Tennis Balls Set",
    price: 39,
    imgURL: "https://picsum.photos/300/200?random=16",
  },
  {
    id: 17,
    title: "רצועת כושר",
    nameP: "Fitness Band",
    price: 79,
    imgURL: "https://picsum.photos/300/200?random=17",
  },
  {
    id: 18,
    title: "מגבת מיקרופייבר",
    nameP: "Microfiber Towel",
    price: 35,
    imgURL: "https://picsum.photos/300/200?random=18",
  },
  {
    id: 19,
    title: "חגורת ריצה",
    nameP: "Running Belt",
    price: 69,
    imgURL: "https://picsum.photos/300/200?random=19",
  },
  {
    id: 20,
    title: "מחזיק בקבוק ליד",
    nameP: "Hand Bottle Holder",
    price: 45,
    imgURL: "https://picsum.photos/300/200?random=20",
  },
  {
    id: 21,
    title: "טייץ אימונים",
    nameP: "Training Tights",
    price: 129,
    imgURL: "https://picsum.photos/300/200?random=21",
  },
  {
    id: 22,
    title: "חולצת קפוצ'ון",
    nameP: "Hoodie",
    price: 179,
    imgURL: "https://picsum.photos/300/200?random=22",
  },
  {
    id: 23,
    title: "מכנס טרנינג",
    nameP: "Sweatpants",
    price: 139,
    imgURL: "https://picsum.photos/300/200?random=23",
  },
  {
    id: 24,
    title: "גופיית ספורט",
    nameP: "Sport Tank Top",
    price: 69,
    imgURL: "https://picsum.photos/300/200?random=24",
  },
  {
    id: 25,
    title: "נעלי אימון",
    nameP: "Training Shoes",
    price: 259,
    imgURL: "https://picsum.photos/300/200?random=25",
  },
  {
    id: 26,
    title: "תיק ספורט קטן",
    nameP: "Small Gym Bag",
    price: 99,
    imgURL: "https://picsum.photos/300/200?random=26",
  },
  {
    id: 27,
    title: "תיק ספורט גדול",
    nameP: "Large Gym Bag",
    price: 149,
    imgURL: "https://picsum.photos/300/200?random=27",
  },
  {
    id: 28,
    title: "כובע מצחייה",
    nameP: "Visor Cap",
    price: 55,
    imgURL: "https://picsum.photos/300/200?random=28",
  },
  {
    id: 29,
    title: "סרט ראש ספורט",
    nameP: "Sport Headband",
    price: 29,
    imgURL: "https://picsum.photos/300/200?random=29",
  },
  {
    id: 30,
    title: "פליז חורף",
    nameP: "Winter Fleece",
    price: 189,
    imgURL: "https://picsum.photos/300/200?random=30",
  },
  {
    id: 31,
    title: "משקולת יד 2KG",
    nameP: "2KG Dumbbell",
    price: 59,
    imgURL: "https://picsum.photos/300/200?random=31",
  },
  {
    id: 32,
    title: "משקולת יד 5KG",
    nameP: "5KG Dumbbell",
    price: 89,
    imgURL: "https://picsum.photos/300/200?random=32",
  },
  {
    id: 33,
    title: "מזרן יוגה",
    nameP: "Yoga Mat",
    price: 119,
    imgURL: "https://picsum.photos/300/200?random=33",
  },
  {
    id: 34,
    title: "גליל עיסוי",
    nameP: "Foam Roller",
    price: 99,
    imgURL: "https://picsum.photos/300/200?random=34",
  },
  {
    id: 35,
    title: "חבל קפיצה",
    nameP: "Jump Rope",
    price: 39,
    imgURL: "https://picsum.photos/300/200?random=35",
  },
  {
    id: 36,
    title: "שעון סטופר",
    nameP: "Stopwatch",
    price: 79,
    imgURL: "https://picsum.photos/300/200?random=36",
  },
  {
    id: 37,
    title: "תיק צד קטן",
    nameP: "Small Side Bag",
    price: 89,
    imgURL: "https://picsum.photos/300/200?random=37",
  },
  {
    id: 38,
    title: "מעמד לטלפון ליד",
    nameP: "Running Armband",
    price: 69,
    imgURL: "https://picsum.photos/300/200?random=38",
  },
  {
    id: 39,
    title: "שרוולי לחץ לרגל",
    nameP: "Compression Leg Sleeves",
    price: 99,
    imgURL: "https://picsum.photos/300/200?random=39",
  },
  {
    id: 40,
    title: "שרוולי לחץ ליד",
    nameP: "Compression Arm Sleeves",
    price: 89,
    imgURL: "https://picsum.photos/300/200?random=40",
  },
  {
    id: 41,
    title: "אוזניות ספורט עמידות זיעה",
    nameP: "Sweatproof Sport Earbuds",
    price: 229,
    imgURL: "https://picsum.photos/300/200?random=41",
  },
  {
    id: 42,
    title: "פאוץ' מותניים",
    nameP: "Waist Pouch",
    price: 59,
    imgURL: "https://picsum.photos/300/200?random=42",
  },
  {
    id: 43,
    title: "ווסט ריצה קל",
    nameP: "Light Running Vest",
    price: 139,
    imgURL: "https://picsum.photos/300/200?random=43",
  },
  {
    id: 44,
    title: "ווסט משקולות",
    nameP: "Weighted Vest",
    price: 249,
    imgURL: "https://picsum.photos/300/200?random=44",
  },
  {
    id: 45,
    title: "כובע חורף",
    nameP: "Winter Beanie",
    price: 69,
    imgURL: "https://picsum.photos/300/200?random=45",
  },
  {
    id: 46,
    title: "צעיף תרמי",
    nameP: "Thermal Scarf",
    price: 79,
    imgURL: "https://picsum.photos/300/200?random=46",
  },
  {
    id: 47,
    title: "כפפות חורף",
    nameP: "Winter Gloves",
    price: 89,
    imgURL: "https://picsum.photos/300/200?random=47",
  },
  {
    id: 48,
    title: "נעליים יומיומיות",
    nameP: "Casual Shoes",
    price: 219,
    imgURL: "https://picsum.photos/300/200?random=48",
  },
  {
    id: 49,
    title: "נעלי הליכה",
    nameP: "Walking Shoes",
    price: 239,
    imgURL: "https://picsum.photos/300/200?random=49",
  },
  {
    id: 50,
    title: "סנדלי ספורט",
    nameP: "Sport Sandals",
    price: 129,
    imgURL: "https://picsum.photos/300/200?random=50",
  },
];

// ✅ שליפת כל המוצרים
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/", (req, res) => {
  res.json(products);
});
app.get("/Findproducts/:id", (req, res) => {
  const REAULT = products.find((item) => {
    return item.id === +req.params.id;
  });

  res.json(REAULT);
});

// ✅ שליפת מוצר לפי ID

// ✅ קבלת הזמנה (תשלום)
app.post("/orders", (req, res) => {
  console.log("הזמנה התקבלה:");
  console.log(req.body);

  res.json({ message: "התשלום בוצע בהצלחה" });
});
app.post("/ProductBuy", (req, res) => {
  let Arrval = req.body.map((e) => (e = +e));
  const counter = Arrval.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  let myProduct = products.filter((e) => Arrval.includes(e.id));
  console.log(counter);
  myProduct.forEach((element) => {
    element.Cmut = counter[element.id];
  });
  console.log(myProduct);

  // console.log({ Arrval, counter });

  res.json(myProduct);
});
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

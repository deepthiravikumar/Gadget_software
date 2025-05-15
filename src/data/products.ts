import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: "iPhone 15 Pro",
    price: 134900,
    stock: 15,
    description: "6.1-inch Super Retina XDR display, A17 Pro chip, 48MP camera",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
    category: "Smartphones",
    discount: 10
  },
  {
    id: '2',
    name: "Samsung Galaxy S23",
    price: 84999,
    stock: 20,
    description: "6.1-inch Dynamic AMOLED, Snapdragon 8 Gen 2, 50MP camera",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_C1pV-9QDqqeGzgjkMI9ga0YMTA9WZBLAcfGG4QLTGzGcVMhYgX4uTZiV7HDq58OzGrsI84i3v9qfQW2H77my9Y73JE5KE0nH3Okl6NOhuOto7csHuiRDo1c",
    category: "Smartphones"
  },
  {
    id: '3',
    name: "Google Pixel 7",
    price: 59999,
    stock: 18,
    description: "6.3-inch OLED, Google Tensor G2, 50MP main camera",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2p9jo5GIUgO-3TQjKipixu2Dys2UvQkno3A&s",
    category: "Smartphones",
    discount: 5
  },
  {
    id: '4',
    name: "MacBook Pro 14\"",
    price: 194900,
    stock: 10,
    description: "M2 Pro chip, 16GB RAM, 512GB SSD, Liquid Retina XDR display",
    image: "https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg",
    category: "Laptops"
  },
  {
    id: '5',
    name: "Dell XPS 15",
    price: 159990,
    stock: 12,
    description: "15.6\" 4K UHD+, Intel Core i7, 16GB RAM, 512GB SSD",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaTKLN4dLtsmi8ZmHbX1KAxNfJEISlM-Y9A&s",
    category: "Laptops",
    discount: 12
  },
  {
    id: '6',
    name: "HP Spectre x360",
    price: 139999,
    stock: 15,
    description: "13.5\" 3K2K OLED, Intel Core i7, 16GB RAM, 1TB SSD",
    image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07962448.png",
    category: "Laptops"
  },
  {
    id: '7',
    name: "Sony WH-1000XM5",
    price: 28990,
    stock: 25,
    description: "Industry-leading noise cancellation, 30-hour battery life",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtm-hhV5HNht3GGhQkc0dAIG8l7pz31qOaVw&s",
    category: "Headphones",
    discount: 15
  },
  {
    id: '8',
    name: "AirPods Pro (2nd Gen)",
    price: 24900,
    stock: 30,
    description: "Active Noise Cancellation, Adaptive Transparency, Spatial Audio",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqnUlFjVDCyQvERh7RLFo2SKDqK7hx8bv4Pg&s",
    category: "Headphones"
  },
  {
    id: '9',
    name: "Bose QuietComfort 45",
    price: 28900,
    stock: 20,
    description: "World-class noise cancellation, 24-hour battery life",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhORDJwDT_s2pzuU71shjqyU89t2Efrss0w&s",
    category: "Headphones",
    discount: 10
  },
  {
    id: '10',
    name: "Apple Watch Series 8",
    price: 45900,
    stock: 15,
    description: "45mm GPS, Always-On Retina display, ECG app",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJWtYS40yK6hYKSKfrIz-fbEkZW4F0Uzc9w&s",
    category: "Smart Watches"
  },
  // 👆 Existing 10 (updated) 👇 Adding 30 more below

  {
    id: '11',
    name: "Samsung Galaxy Watch 5",
    price: 27999,
    stock: 18,
    description: "40mm Bluetooth, BioActive Sensor, Sleep Coaching",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9KyJMbDUDSuCbfYypIEPdUpcgQ23NFVSQLw&s",
    category: "Smart Watches"
  },
  {
    id: '12',
    name: "Fitbit Sense 2",
    price: 29990,
    stock: 20,
    description: "Advanced health metrics, Stress management, GPS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrRQ0jVCsGTOqc4fB-xspx8X0yJpPH-RDRLA&s",
    category: "Smart Watches"
  },
  {
    id: '13',
    name: "Anker PowerCore 20K",
    price: 2499,
    stock: 40,
    description: "20000mAh portable charger, USB-C PD, 3 ports",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSGjibe1z_5F4n9sV3lxha1u2ENoIP4gJMmQ&s",
    category: "Accessories"
  },
  {
    id: '14',
    name: "Logitech MX Master 3S",
    price: 9999,
    stock: 25,
    description: "Wireless mouse, 8K DPI, MagSpeed scrolling",
    image: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1",
    category: "Accessories"
  },
  {
    id: '15',
    name: "Samsung T7 SSD 1TB",
    price: 8999,
    stock: 30,
    description: "Portable SSD, USB 3.2 Gen 2, 1050MB/s read speed",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK4LEq7ACsxmoG0jV-URrcsPMyj96keX9jw&s",
    category: "Accessories",
    discount: 8
  },
  {
    id: '16',
    name: "OnePlus 12",
    price: 69999,
    stock: 20,
    description: "Snapdragon 8 Gen 3, AMOLED display, 5000mAh battery",
    image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12r-1.jpg",
    category: "Smartphones",
    discount: 7
  },
  {
    id: '17',
    name: "Asus ROG Phone 7",
    price: 74999,
    stock: 10,
    description: "Gaming-centric phone, AMOLED 165Hz display, 6000mAh battery",
    image: "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-7-1.jpg",
    category: "Smartphones"
  },
  {
    id: '18',
    name: "Lenovo Legion 5 Pro",
    price: 124999,
    stock: 12,
    description: "16\" WQXGA, RTX 4070, AMD Ryzen 9",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoFLFj0NJ2MMW9qzms9EubK0ngDsZoD08CwA&s",
    category: "Laptops",
    discount: 10
  },
  {
    id: '19',
    name: "Acer Predator Helios Neo 16",
    price: 119999,
    stock: 8,
    description: "Intel i7 13th Gen, RTX 4060, 16GB RAM, 1TB SSD",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANDnZ_QlSKdDXWlg-Caa3xj6nI1_DHud_Qg&s",
    category: "Laptops"
  },
  {
    id: '20',
    name: "Canon EOS R10",
    price: 89990,
    stock: 10,
    description: "24.2MP Mirrorless Camera, 4K Video, Dual Pixel Autofocus",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkF0kYRUvbb72OVlUCzHlboBPCLIyz3KRLsA&s",
    category: "Cameras",
    discount: 5
  },
  {
    id: '21',
    name: "Sony Alpha ZV-E10",
    price: 74990,
    stock: 7,
    description: "Mirrorless vlogging camera, 24.2MP APS-C sensor",
    image: "https://d1ncau8tqf99kp.cloudfront.net/PDP/DI/Interchangeable-Lens-Cameras/ILCE/ZV-E10M2/mobile/1.jpg",
    category: "Cameras"
  },
  {
    id: '22',
    name: "DJI Osmo Mobile 6",
    price: 15990,
    stock: 25,
    description: "3-axis smartphone gimbal with ActiveTrack 5.0",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH9fWpdBegMlWz9Nut33cDNZLbwEaCZKFCMA&s",
    category: "Accessories",
    discount: 10
  },
  {
    id: '23',
    name: "Apple iPad Air (5th Gen)",
    price: 59900,
    stock: 20,
    description: "10.9-inch Liquid Retina, M1 chip, 64GB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrlww6wKpRwFi9_wbK1cEqRIIIS_zuvZIliA&s",
    category: "Tablets"
  },
  {
    id: '24',
    name: "Samsung Galaxy Tab S9",
    price: 85999,
    stock: 15,
    description: "11-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ItYTdwuIlh5Jgx62bkfmOtJZ6TOw8pCgzQ&s",
    category: "Tablets",
    discount: 7
  },
  {
    id: '25',
    name: "Realme Pad X",
    price: 19999,
    stock: 30,
    description: "Snapdragon 695, 11-inch 2K display, 8340mAh battery",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbFZ-5TcDPs8v6G4VdAsBgD6lEAnbbyAIMsw&s",
    category: "Tablets"
  },
  {
    id: '26',
    name: "Mi Smart Band 7",
    price: 3499,
    stock: 60,
    description: "1.62\" AMOLED, SpO2, 120 fitness modes, 5ATM waterproof",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMVxSqamKfFuet5vq6jVYSJh3KKQyec0UxcA&s",
    category: "Smart Watches",
    discount: 12
  },
  {
    id: '27',
    name: "boAt Airdopes 141",
    price: 1499,
    stock: 100,
    description: "42H playback, ENx tech, low latency gaming mode",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfqODnAhTFigU2XBe0AXt8XU5dQECtmJESlg&s",
    category: "Headphones"
  },
  {
    id: '28',
    name: "Noise ColorFit Pulse 2",
    price: 1799,
    stock: 75,
    description: "1.8” display, 100 sports modes, heart rate & SpO2 monitor",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_j2iUCvQMMDrYFLJWZw_ye2rTg5ouHeaL8g&s",
    category: "Smart Watches"
  },
  {
    id: '29',
    name: "JBL Flip 6",
    price: 9999,
    stock: 20,
    description: "Portable Bluetooth speaker, 12h battery, IP67 waterproof",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvaiUsJMhNuKUTzwzNt94L-de8ZK8-XJlfw&s",
    category: "Accessories",
    discount: 10
  },
  {
    id: '30',
    name: "Google Nest Hub (2nd Gen)",
    price: 7499,
    stock: 10,
    description: "7-inch display, Google Assistant, Sleep Sensing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1OOlTJbg7BRn3U0FHHulZZrLO7z-GPODdA&s",
    category: "Smart Home"
  },
  {
    id: '31',
    name: "Echo Dot (5th Gen)",
    price: 5499,
    stock: 35,
    description: "Smart speaker with Alexa, improved bass & LED clock",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvuyxuEMWfETRKSvUzA-mqpiNOTSSgdFB4Dw&s",
    category: "Smart Home"
  },
  {
    id: '32',
    name: "TP-Link Deco X20",
    price: 14999,
    stock: 15,
    description: "Wi-Fi 6 Mesh Router, covers up to 4000 sq. ft.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxG-BowM6ykZDh58OzK8W_EDmoJQK3HSgDQ&s",
    category: "Accessories"
  },
  {
    id: '33',
    name: "WD Blue SN570 1TB NVMe SSD",
    price: 5199,
    stock: 45,
    description: "1TB PCIe Gen3 NVMe SSD, up to 3500MB/s read speed",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKiJArAXEx8WtVfp1K4LLziX-nRDze5ZOC8g&s",
    category: "Accessories",
    discount: 5
  },
  {
    id: '34',
    name: "LG UltraGear 27” Gaming Monitor",
    price: 22999,
    stock: 10,
    description: "27-inch QHD, 165Hz, 1ms, G-Sync compatible",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4W_TkTF7uijG5LYCBscdcs2XpXWwQlBQGg&s",
    category: "Accessories"
  },
  {
    id: '35',
    name: "ASUS TUF Gaming F15",
    price: 74999,
    stock: 8,
    description: "Intel i5, RTX 3050, 144Hz, 512GB SSD, 16GB RAM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRed0LnrS6S6ZVi8hqyk538I6Cj5LfKaR24Rg&s",
    category: "Laptops",
    discount: 6
  },
  {
    id: '36',
    name: "Nothing Phone (2)",
    price: 49999,
    stock: 12,
    description: "Glyph interface, Snapdragon 8+ Gen 1, 50MP dual camera",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDd3BBx3qwvIjrI2ZnmQ9ejfIIZs9TwkjyFQ&s",
    category: "Smartphones"
  },
  {
    id: '37',
    name: "Redmi Note 13 Pro+ 5G",
    price: 31999,
    stock: 25,
    description: "Curved AMOLED, Dimensity 7200, 200MP camera",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTNOQz4Ne8PQsBXKM1nYaIA_TrU5KX_xJSA&s",
    category: "Smartphones",
    discount: 9
  },
  {
    id: '38',
    name: "Fire-Boltt Phoenix Ultra",
    price: 1999,
    stock: 60,
    description: "Smartwatch with Bluetooth calling, rotating crown, 120 sports modes",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn1FwH1-49Y1-pHW8_1o5bA-rpusyhAuwMgQ&s",
    category: "Smart Watches"
  },
  {
    id: '39',
    name: "Skullcandy Dime 2",
    price: 2499,
    stock: 40,
    description: "True wireless earbuds, IPX4, 12 hours of battery",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKj4R4Cn_WnCQ4Xobas_nDL6iagCgrbwMkA&s",
    category: "Headphones"
  },
  {
    id: '40',
    name: "Samsung Galaxy Buds2 Pro",
    price: 17999,
    stock: 18,
    description: "Hi-Fi 24-bit audio, ANC, 360 Audio, IPX7",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_4M1NXb732v4NACGV-A55zuO5s0QA5-Gcw&s",
    category: "Headphones",
    discount: 10
  }
];


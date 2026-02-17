import type { Product, MediaAsset, Order, Profile } from "./types";

export const mockProfiles: Profile[] = [
  {
    id: "buyer-001",
    role: "buyer",
    company_name: "Nordic Craft Store",
    country: "SE",
    preferred_language: "en",
    created_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "admin-001",
    role: "admin",
    company_name: "CraftNarrative Inc.",
    country: "JP",
    preferred_language: "ja",
    created_at: "2025-01-01T00:00:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    slug: "kyo-yunomi-teacup",
    name: { en: "Kyo-Yunomi Tea Cup", ja: "京湯呑み" },
    description: {
      en: "A handcrafted tea cup from Kyoto, made using traditional Kyo-yaki techniques passed down through five generations. Each piece features a unique glaze pattern inspired by the changing seasons.",
      ja: "京都で五代にわたり受け継がれてきた京焼の技法で作られた手作りの湯呑み。四季をモチーフにした唯一無二の釉薬の模様が特徴です。",
    },
    story_text: {
      en: "Master potter Tanaka-san begins each day at 5 AM, preparing the clay that has been sourced from the hills of Higashiyama for over 200 years. 'The clay speaks to me,' he says. 'I simply listen and follow.' Each tea cup takes three weeks to complete — from wedging the clay, to throwing on the wheel, to the meticulous application of glaze made from ash of local pine trees. The final firing in his wood-burning kiln, or 'noborigama,' reaches temperatures of 1,300°C, transforming earth into art.",
      ja: "陶芸家の田中さんは毎朝5時から、200年以上東山の丘から採取されてきた粘土の準備を始めます。「粘土が語りかけてくるのです」と田中さんは言います。「私はただ耳を傾け、従うだけです。」一つの湯呑みが完成するまでに3週間。粘土の練り、ろくろでの成形、地元の松の灰から作った釉薬の丁寧な施釉。最後に登り窯で1,300度の炎に包まれ、土は芸術へと変わります。",
    },
    process_details: {
      en: "1. Clay Preparation — Aged clay from Higashiyama is wedged by hand for 30 minutes to remove air bubbles.\n2. Wheel Throwing — Each cup is thrown on a traditional kick wheel (蹴ろくろ).\n3. Drying — Slowly dried for one week in a temperature-controlled room.\n4. Bisque Firing — First firing at 800°C to harden the form.\n5. Glazing — Pine ash glaze applied with a horsehair brush.\n6. Final Firing — 1,300°C in a wood-burning noborigama kiln for 60 hours.",
      ja: "1. 粘土の準備 — 東山の熟成粘土を30分間手で練り、気泡を取り除きます。\n2. ろくろ成形 — 伝統的な蹴ろくろで一つずつ成形します。\n3. 乾燥 — 温度管理された部屋で1週間かけてゆっくり乾燥。\n4. 素焼き — 800度で最初の焼成を行い、形を固めます。\n5. 施釉 — 馬毛の筆で松灰釉を施します。\n6. 本焼き — 登り窯で1,300度、60時間かけて焼き上げます。",
    },
    price_wholesale: 4500,
    price_retail_ref: 12000,
    moq: 6,
    origin_region: { en: "Kyoto, Japan", ja: "京都" },
    is_published: true,
    created_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "prod-002",
    slug: "wajima-nuri-bowl",
    name: { en: "Wajima-Nuri Lacquer Bowl", ja: "輪島塗 汁椀" },
    description: {
      en: "A traditional Wajima lacquerware bowl, strengthened with 'jinoko' earth powder and coated with over 20 layers of natural urushi lacquer. Built to last a lifetime and beyond.",
      ja: "「地の粉」で補強し、天然漆を20層以上塗り重ねた伝統的な輪島塗の汁椀。一生もの、そしてその先まで使える逸品です。",
    },
    story_text: {
      en: "In the remote Noto Peninsula, the art of Wajima-nuri has been perfected over 600 years. Artisan Suzuki-san represents the 8th generation of her family's lacquerware workshop. 'Wajima lacquerware is not just coating wood with lacquer,' she explains. 'It is building layers of strength and beauty, one brushstroke at a time.' The process requires over 120 individual steps and takes six months to complete a single bowl.",
      ja: "能登半島の奥地で、輪島塗の技は600年以上にわたり磨かれてきました。職人の鈴木さんは、家族の漆器工房の8代目です。「輪島塗は木に漆を塗るだけではありません」と鈴木さんは語ります。「一筆一筆、強さと美しさの層を築いていくのです。」その工程は120以上の手順を要し、一つの椀の完成まで6ヶ月かかります。",
    },
    process_details: {
      en: "1. Wood Selection — Aged Japanese zelkova (keyaki) wood, dried for 3 years.\n2. Rough Shaping — Carved on a lathe while still slightly moist.\n3. Jinoko Reinforcement — Wajima's unique diatomaceous earth powder mixed with raw lacquer to strengthen the wood.\n4. Cloth Application — Hemp cloth applied to stress points with lacquer.\n5. Undercoating — Multiple layers of raw lacquer, each dried in a humid 'muro' chamber.\n6. Finish Coating — 3+ layers of refined lacquer, polished between each coat.\n7. Decoration — Optional maki-e (gold powder) or chinkin (incised gold) decoration.",
      ja: "1. 木地選び — 3年間乾燥させた欅（けやき）の木を使用。\n2. 荒挽き — まだ少し湿り気のある状態でろくろで削り出します。\n3. 地の粉補強 — 輪島特有の珪藻土の粉を生漆と混ぜ、木地を補強。\n4. 布着せ — 麻布を漆で負荷のかかる部分に貼り付けます。\n5. 下塗り — 生漆を何層も塗り、湿度の高い「室（むろ）」で乾燥。\n6. 上塗り — 精製漆を3層以上塗り、各層ごとに研ぎ上げます。\n7. 加飾 — 蒔絵（金粉）や沈金（彫金）による装飾を施します。",
    },
    price_wholesale: 8500,
    price_retail_ref: 22000,
    moq: 4,
    origin_region: { en: "Wajima, Ishikawa, Japan", ja: "石川県輪島市" },
    is_published: true,
    created_at: "2025-02-05T00:00:00Z",
  },
  {
    id: "prod-003",
    slug: "oshima-tsumugi-textile",
    name: { en: "Oshima Tsumugi Silk Textile", ja: "大島紬 反物" },
    description: {
      en: "A bolt of Oshima Tsumugi silk, renowned for its mud-dyed deep brown tones and intricate kasuri (ikat) patterns. One of Japan's most labor-intensive textiles, taking up to one year to produce.",
      ja: "泥染めの深い茶色と精緻な絣模様で知られる大島紬の反物。日本で最も手間のかかる織物の一つで、一反の完成まで最大1年を要します。",
    },
    story_text: {
      en: "On the subtropical island of Amami Oshima, a textile tradition unlike any other in the world thrives. The distinctive deep brown color of Oshima Tsumugi comes from a process found nowhere else: the silk threads are first dyed with juice from the native 'teichigi' tree, then submerged in iron-rich mud fields. This process is repeated dozens of times over months. Weaver Yamamoto-san has spent 40 years mastering the kasuri technique, where each thread must be tied and dyed individually to create patterns of extraordinary precision.",
      ja: "亜熱帯の奄美大島で、世界に類を見ない織物の伝統が息づいています。大島紬の特徴的な深い茶色は、他にはない工程から生まれます。絹糸をまず島固有の「テーチ木」の煮汁で染め、次に鉄分を含む泥田に浸します。この工程を数ヶ月かけて何十回も繰り返します。織り手の山本さんは40年間、絣の技法を磨いてきました。一本一本の糸を個別に括り、染めることで、驚くべき精緻な模様を生み出します。",
    },
    process_details: {
      en: "1. Design — Kasuri pattern mapped on graph paper, each dot representing one thread crossing.\n2. Thread Preparation — Pure silk threads carefully wound and measured.\n3. Kasuri Tying — Individual threads tied with resist material at precise points.\n4. Teichigi Dyeing — Threads soaked in teichigi bark extract (20+ times over 2 weeks).\n5. Mud Dyeing — Threads pressed into iron-rich mud fields (4-5 repetitions).\n6. Weaving — Hand-woven on a traditional loom, aligning each kasuri mark perfectly.",
      ja: "1. 図案作成 — 絣の模様を方眼紙に写し取り、一点が糸一本の交差を表します。\n2. 糸の準備 — 純絹糸を丁寧に巻き取り、計測します。\n3. 絣括り — 一本一本の糸を正確な位置で防染材料で括ります。\n4. テーチ木染め — テーチ木の樹皮抽出液に2週間かけて20回以上浸します。\n5. 泥染め — 鉄分豊富な泥田で糸を揉み込みます（4〜5回繰り返し）。\n6. 織り — 伝統的な織機で手織りし、絣の柄を一つずつ正確に合わせます。",
    },
    price_wholesale: 120000,
    price_retail_ref: 350000,
    moq: 1,
    origin_region: {
      en: "Amami Oshima, Kagoshima, Japan",
      ja: "鹿児島県奄美大島",
    },
    is_published: true,
    created_at: "2025-02-10T00:00:00Z",
  },
];

export const mockMediaAssets: MediaAsset[] = [
  // Tea Cup media
  {
    id: "media-001",
    product_id: "prod-001",
    type: "video_hero",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-002",
    product_id: "prod-001",
    type: "podcast_audio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-003",
    product_id: "prod-001",
    type: "photo_gallery",
    url: "https://images.unsplash.com/photo-1530968033775-2c92e143b074?w=800",
    thumbnail_url:
      "https://images.unsplash.com/photo-1530968033775-2c92e143b074?w=400",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-004",
    product_id: "prod-001",
    type: "video_process",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  // Lacquer Bowl media
  {
    id: "media-005",
    product_id: "prod-002",
    type: "video_hero",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-006",
    product_id: "prod-002",
    type: "podcast_audio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-007",
    product_id: "prod-002",
    type: "photo_gallery",
    url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
    thumbnail_url:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
    is_public_asset: true,
    creator_credit_id: null,
  },
  // Textile media
  {
    id: "media-008",
    product_id: "prod-003",
    type: "video_hero",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-009",
    product_id: "prod-003",
    type: "podcast_audio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumbnail_url: "",
    is_public_asset: true,
    creator_credit_id: null,
  },
  {
    id: "media-010",
    product_id: "prod-003",
    type: "photo_gallery",
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    thumbnail_url:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    is_public_asset: true,
    creator_credit_id: null,
  },
];

export const mockOrders: Order[] = [
  {
    id: "order-001",
    buyer_id: "buyer-001",
    items: [
      {
        product_id: "prod-001",
        product_slug: "kyo-yunomi-teacup",
        product_name: { en: "Kyo-Yunomi Tea Cup", ja: "京湯呑み" },
        quantity: 12,
        unit_price: 4500,
      },
      {
        product_id: "prod-002",
        product_slug: "wajima-nuri-bowl",
        product_name: {
          en: "Wajima-Nuri Lacquer Bowl",
          ja: "輪島塗 汁椀",
        },
        quantity: 4,
        unit_price: 8500,
      },
    ],
    total_amount: 88000,
    status: "shipping",
    tracking_number: "JP123456789",
    carrier: "Japan Post EMS",
    shipping_address: {
      line1: "Kungsgatan 12",
      city: "Stockholm",
      postal_code: "111 35",
      country: "Sweden",
    },
    created_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "order-002",
    buyer_id: "buyer-001",
    items: [
      {
        product_id: "prod-003",
        product_slug: "oshima-tsumugi-textile",
        product_name: {
          en: "Oshima Tsumugi Silk Textile",
          ja: "大島紬 反物",
        },
        quantity: 1,
        unit_price: 120000,
      },
    ],
    total_amount: 120000,
    status: "paid",
    tracking_number: null,
    carrier: null,
    shipping_address: {
      line1: "Kungsgatan 12",
      city: "Stockholm",
      postal_code: "111 35",
      country: "Sweden",
    },
    created_at: "2025-02-14T00:00:00Z",
  },
];

// Helper functions to query mock data
export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getMediaForProduct(productId: string): MediaAsset[] {
  return mockMediaAssets.filter((m) => m.product_id === productId);
}

export function getOrderById(orderId: string): Order | undefined {
  return mockOrders.find((o) => o.id === orderId);
}

export function getOrdersForBuyer(buyerId: string): Order[] {
  return mockOrders.filter((o) => o.buyer_id === buyerId);
}

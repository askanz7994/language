export interface WordTiming {
  word: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
}

export interface EnglishTopicData {
  title: string;
  english: string;
  audioFile?: string; // Path to audio file
  wordTimings?: WordTiming[]; // Word timing data for highlighting
  vocabulary: Array<{
    word: string;
    meaning: string;
  }>;
}

export const englishTopicData: Record<string, EnglishTopicData> = {
  "kerala-landscapes": {
    title: "The Allure of Kerala's Landscapes",
    english: "Kerala, often dubbed \"God's Own Country,\" is a breathtakingly beautiful state in India. Its landscapes are a vibrant tapestry of emerald green paddy fields, swaying coconut groves, and tranquil backwaters that stretch for miles. Nestled along the Arabian Sea coast, this tropical paradise captivates visitors with its moderate climate and abundant rainfall, especially during the monsoon season when the greenery flourishes. Beyond its scenic charm, Kerala is also a renowned hub for Ayurveda and yoga, making it a perfect destination for health and wellness tourism. Its natural splendor and rich cultural heritage truly set it apart.",
    audioFile: "/audio/kerala-landscapes.mp3",
    wordTimings: [
      { word: "Kerala,", startTime: 0.0, endTime: 0.5 },
      { word: "often", startTime: 0.6, endTime: 0.9 },
      { word: "dubbed", startTime: 1.0, endTime: 1.4 },
      { word: "\"God's", startTime: 1.5, endTime: 1.9 },
      { word: "Own", startTime: 2.0, endTime: 2.3 },
      { word: "Country,\"", startTime: 2.4, endTime: 2.9 },
      { word: "is", startTime: 3.0, endTime: 3.2 },
      { word: "a", startTime: 3.3, endTime: 3.4 },
      { word: "breathtakingly", startTime: 3.5, endTime: 4.2 },
      { word: "beautiful", startTime: 4.3, endTime: 4.8 },
      { word: "state", startTime: 4.9, endTime: 5.2 },
      { word: "in", startTime: 5.3, endTime: 5.4 },
      { word: "India.", startTime: 5.5, endTime: 6.0 }
      // Note: In production, you would have complete timing data for all words
    ],
    vocabulary: [
      { word: "dubbed", meaning: "called or named" },
      { word: "breathtakingly", meaning: "extremely impressive" },
      { word: "tapestry", meaning: "complex picture or pattern" },
      { word: "emerald", meaning: "bright green color" },
      { word: "tranquil", meaning: "peaceful and calm" },
      { word: "captivates", meaning: "attracts and holds attention" },
      { word: "flourishes", meaning: "grows healthily" },
      { word: "renowned", meaning: "famous and respected" },
      { word: "splendor", meaning: "magnificent beauty" },
      { word: "heritage", meaning: "cultural traditions" }
    ]
  },
  "malayalam-literature": {
    title: "A Glimpse into Malayalam Literature",
    english: "Malayalam literature boasts a profound and extensive history. Visionary poets like Ulloor, Asan, and Vallathol, often considered the literary trinity, significantly enriched the language. Over time, diverse literary forms such as novels, short stories, poetry, and plays flourished here. Celebrated authors like M.T. Vasudevan Nair, Thakazhi Sivasankara Pillai, and O.V. Vijayan garnered international acclaim for their works. Malayalam cinema and its vibrant arts scene also hold immense cultural importance. Each generation proudly carries this literary tradition forward, ensuring the language's continued growth and evolution. Malayalis deeply cherish their language and its literary legacy.",
    vocabulary: [
      { word: "boasts", meaning: "proudly possesses" },
      { word: "profound", meaning: "deep and meaningful" },
      { word: "visionary", meaning: "having innovative ideas" },
      { word: "trinity", meaning: "group of three" },
      { word: "enriched", meaning: "improved or enhanced" },
      { word: "flourished", meaning: "developed successfully" },
      { word: "garnered", meaning: "gathered or earned" },
      { word: "acclaim", meaning: "praise and approval" },
      { word: "immense", meaning: "extremely large" },
      { word: "legacy", meaning: "inheritance from the past" }
    ]
  },
  "kerala-festivals": {
    title: "Celebrating Kerala's Diverse Festivals",
    english: "Kerala's festivals are a dazzling display of color, tradition, and community spirit. Key celebrations include Onam, Vishu, and Thrissur Pooram. Onam, a vibrant harvest festival, symbolizes prosperity and abundance, marked by grand feasts and elaborate floral carpets. Vishu, the New Year, brings hopes for a bright future. Thrissur Pooram stands out as a magnificent spectacle, featuring beautifully caparisoned elephants, vibrant parasol exchanges, and captivating percussion ensembles. These festivals deeply reflect Kerala's unique culture and timeless traditions. Celebrated by people of all faiths, they beautifully symbolize social harmony and peaceful coexistence, bringing everyone together in joyous revelry.",
    vocabulary: [
      { word: "dazzling", meaning: "extremely bright and impressive" },
      { word: "symbolizes", meaning: "represents" },
      { word: "abundance", meaning: "large quantity" },
      { word: "elaborate", meaning: "detailed and complex" },
      { word: "spectacle", meaning: "impressive display" },
      { word: "caparisoned", meaning: "decorated with ornamental covering" },
      { word: "parasol", meaning: "decorative umbrella" },
      { word: "percussion", meaning: "musical instruments played by striking" },
      { word: "coexistence", meaning: "living together peacefully" },
      { word: "revelry", meaning: "joyful celebration" }
    ]
  },
  "healthcare-ayurveda": {
    title: "Kerala's Renowned Healthcare and Ayurveda",
    english: "Kerala's healthcare sector, particularly its Ayurvedic treatments, enjoys global renown. The state offers a wide array of natural medicines and holistic treatment methods designed to rejuvenate both body and mind. Kerala is especially recognized for its Panchakarma therapies and serene Ayurvedic resorts that attract a growing number of health-conscious individuals. Many people journey to Kerala seeking solutions for various health issues or simply for a relaxing mental retreat. Therapeutic massages and specialized therapies are major draws for tourists. This strong emphasis on natural healing significantly contributes to Kerala's thriving health tourism industry, offering a unique wellness experience.",
    vocabulary: [
      { word: "renowned", meaning: "famous and respected" },
      { word: "array", meaning: "wide range" },
      { word: "holistic", meaning: "treating the whole person" },
      { word: "rejuvenate", meaning: "restore to youthful vigor" },
      { word: "serene", meaning: "calm and peaceful" },
      { word: "therapeutic", meaning: "having healing properties" },
      { word: "retreat", meaning: "quiet place for relaxation" },
      { word: "emphasis", meaning: "special importance" },
      { word: "thriving", meaning: "growing successfully" },
      { word: "wellness", meaning: "state of good health" }
    ]
  },
  "kerala-cuisine": {
    title: "The Rich Flavors of Kerala Cuisine",
    english: "Kerala's cuisine is remarkably delicious and incredibly diverse. The generous use of coconut milk and a medley of aromatic spices gives its dishes a distinct and unforgettable flavor. Staples like Puttu, Appam, Dosa, Idiyappam, and a variety of curries are immensely popular. The traditional Sadhya, a grand vegetarian feast served on a banana leaf with numerous courses, is particularly famous. Beyond vegetarian delights, a wide range of non-vegetarian options, especially fresh seafood, are readily available. Each region within Kerala boasts its own unique cooking styles and signature dishes, truly making it a paradise for food lovers.",
    vocabulary: [
      { word: "remarkably", meaning: "exceptionally" },
      { word: "diverse", meaning: "varied and different" },
      { word: "medley", meaning: "mixture or combination" },
      { word: "aromatic", meaning: "having a pleasant smell" },
      { word: "distinct", meaning: "clearly different" },
      { word: "staples", meaning: "main or basic foods" },
      { word: "immensely", meaning: "extremely" },
      { word: "delights", meaning: "things that give pleasure" },
      { word: "signature", meaning: "characteristic or distinctive" },
      { word: "paradise", meaning: "perfect place" }
    ]
  },
  "education-kerala": {
    title: "High Standards of Education in Kerala",
    english: "Kerala boasts one of the highest educational standards in India, consistently leading the nation in literacy rates. The government prioritizes ensuring that every child receives a quality education, investing significantly in schools, colleges, and universities that offer excellent academic opportunities. Education has been a powerful catalyst for social transformation in the state, notably contributing to women's empowerment. This strong educational foundation has played a pivotal role in Kerala's overall social and economic progress. The state continues to offer outstanding opportunities for higher education, fostering intellectual growth and skill development across its population.",
    vocabulary: [
      { word: "boasts", meaning: "proudly possesses" },
      { word: "consistently", meaning: "in the same way over time" },
      { word: "prioritizes", meaning: "treats as most important" },
      { word: "catalyst", meaning: "something that causes change" },
      { word: "transformation", meaning: "complete change" },
      { word: "empowerment", meaning: "giving power or authority" },
      { word: "pivotal", meaning: "of crucial importance" },
      { word: "fostering", meaning: "encouraging development" },
      { word: "intellectual", meaning: "relating to thinking and understanding" },
      { word: "population", meaning: "all the people living in an area" }
    ]
  },
  "kerala-climate": {
    title: "Understanding Kerala's Climate Diversity",
    english: "Kerala's climate is notably diverse, offering varied experiences across its regions. The coastal areas typically feature a hot and humid climate, while the hilly regions enjoy cooler temperatures. The monsoon season, from June to September, brings abundant rainfall, transforming the landscape into a lush green haven. Although summer, from March to May, can be quite warm, the monsoon provides a welcome relief. This varied climate is exceptionally well-suited for both agriculture and nurturing the natural environment. Crops like rubber, tea, coffee, and various spices thrive here, with each season enhancing the inherent beauty of Kerala.",
    vocabulary: [
      { word: "notably", meaning: "particularly or especially" },
      { word: "diverse", meaning: "showing variety" },
      { word: "typically", meaning: "usually or normally" },
      { word: "abundant", meaning: "existing in large quantities" },
      { word: "transforming", meaning: "changing completely" },
      { word: "lush", meaning: "growing luxuriously" },
      { word: "haven", meaning: "safe or peaceful place" },
      { word: "exceptionally", meaning: "unusually or remarkably" },
      { word: "nurturing", meaning: "caring for and supporting growth" },
      { word: "inherent", meaning: "existing as a natural part" }
    ]
  },
  "kerala-backwaters": {
    title: "The Enchanting Kerala Backwaters",
    english: "The backwaters of Kerala are globally renowned for their serene beauty and unique charm. The iconic houseboats of Alappuzha (Alleppey), in particular, draw tourists from all corners of the world. Drifting peacefully through the calm backwaters offers an exquisitely beautiful and tranquil experience. These interconnected waterways are also famous for their rich fish wealth, playing an integral role in the local way of life and livelihoods. Backwater tourism significantly contributes to Kerala's economy. Many visitors come here not only to admire the natural beauty but also to immerse themselves in the authentic rural life that thrives along these waterways.",
    vocabulary: [
      { word: "enchanting", meaning: "delightfully charming" },
      { word: "renowned", meaning: "famous and respected" },
      { word: "serene", meaning: "calm and peaceful" },
      { word: "iconic", meaning: "widely recognized symbol" },
      { word: "exquisitely", meaning: "extremely beautifully" },
      { word: "interconnected", meaning: "connected with each other" },
      { word: "integral", meaning: "essential or fundamental" },
      { word: "livelihoods", meaning: "means of securing necessities of life" },
      { word: "immerse", meaning: "involve deeply" },
      { word: "authentic", meaning: "genuine and real" }
    ]
  },
  "kerala-art-forms": {
    title: "Kerala's Vibrant Traditional Art Forms",
    english: "Kerala is blessed with a rich tapestry of vibrant and diverse art forms. Kathakali, Mohiniyattam, Theyyam, and Koodiyattam stand as some of its most prominent classical and traditional performances. Each of these art forms is a profound reflection of ancient stories, historical narratives, and mythological tales. These highly stylized art forms boast centuries of history, meticulously passed down through generations. Dedicated artists diligently work to preserve these traditions and ensure their legacy continues for new audiences. These cultural expressions hold immense significance for Kerala's identity, proudly showcasing the state's unique heritage to the world.",
    vocabulary: [
      { word: "blessed", meaning: "fortunate to have" },
      { word: "tapestry", meaning: "complex picture or pattern" },
      { word: "vibrant", meaning: "full of energy and life" },
      { word: "prominent", meaning: "important and well-known" },
      { word: "profound", meaning: "deep and meaningful" },
      { word: "narratives", meaning: "stories or accounts" },
      { word: "mythological", meaning: "relating to myths" },
      { word: "stylized", meaning: "depicted in an artistic style" },
      { word: "meticulously", meaning: "with great attention to detail" },
      { word: "significance", meaning: "importance or meaning" }
    ]
  },
  "peace-harmony": {
    title: "Kerala's Reputation for Peace and Harmony",
    english: "Kerala is widely recognized as a safe and peaceful state. Its people live with remarkable tolerance and mutual respect, fostering a strong sense of community. Various religious and communal groups coexist harmoniously, engaging in friendly interactions and cooperation. The state places a high priority on women's safety, implementing measures that contribute to a secure environment for all. Social harmony and a pervasive sense of peace are defining characteristics of Kerala. This tranquil atmosphere makes it an even more appealing destination for tourists. The strong rule of law and effective maintenance of order ensure security for its residents.",
    vocabulary: [
      { word: "recognized", meaning: "acknowledged or accepted" },
      { word: "remarkable", meaning: "extraordinary or striking" },
      { word: "tolerance", meaning: "acceptance of differences" },
      { word: "mutual", meaning: "shared by two or more parties" },
      { word: "fostering", meaning: "encouraging development" },
      { word: "harmoniously", meaning: "in a way that is peaceful" },
      { word: "implementing", meaning: "putting into effect" },
      { word: "pervasive", meaning: "spreading throughout" },
      { word: "tranquil", meaning: "free from disturbance" },
      { word: "maintenance", meaning: "keeping in good condition" }
    ]
  }
};

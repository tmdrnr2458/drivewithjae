export interface Vehicle {
  id: string;
  title: string;
  type: "new" | "used";
  price: number;
  year: number;
  make: string;
  model: string;
  trim?: string;
  bodyStyle: string;
  fuel: "gas" | "hybrid" | "ev";
  mileage: number;
  photoUrls: string[];
  descriptionEn: string;
  descriptionKo: string;
  lifestyleTags: {
    drivingEnv: string[];
    commute: string[];
    feel: string[];
    familySize: string[];
    features: string[];
    fuel: string[];
    budget: string;
  };
  status: "available" | "pending" | "sold";
  createdAt: string;
  updatedAt: string;
}

// Sample inventory data — replace with Google Sheets fetch in production
export const sampleInventory: Vehicle[] = [
  {
    id: "new-001",
    title: "2026 Kia EV6 Wind",
    type: "new",
    price: 42600,
    year: 2026,
    make: "Kia",
    model: "EV6",
    trim: "Wind",
    bodyStyle: "SUV",
    fuel: "ev",
    mileage: 0,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "The EV6 is Kia's flagship electric SUV. 310 miles of range, ultra-fast charging, and a spacious interior. Perfect for tech-forward families who want to go electric without compromising on space.",
    descriptionKo: "EV6는 기아의 플래그십 전기 SUV입니다. 310마일 주행거리, 초고속 충전, 넓은 실내 공간. 공간을 포기하지 않고 전기차를 원하는 테크 지향 가족에게 완벽합니다.",
    lifestyleTags: {
      drivingEnv: ["suburban", "highway"],
      commute: ["medium", "long"],
      feel: ["luxury", "sporty"],
      familySize: ["solo_couple", "small_family"],
      features: ["apple_carplay", "android_auto", "heated_seats", "cooled_seats", "heated_steering", "awd", "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise", "parking_sensors", "remote_start", "keyless_entry", "wireless_charging", "premium_audio", "digital_dash", "power_liftgate"],
      fuel: ["ev"],
      budget: "over_40k",
    },
    status: "available",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-20",
  },
  {
    id: "new-002",
    title: "2026 Kia Sportage LX",
    type: "new",
    price: 31290,
    year: 2026,
    make: "Kia",
    model: "Sportage",
    trim: "LX",
    bodyStyle: "SUV",
    fuel: "gas",
    mileage: 0,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "The Sportage is the perfect family SUV. Roomy, reliable, and packed with safety features. Great for suburban families who need space without breaking the bank.",
    descriptionKo: "스포티지는 완벽한 가족 SUV입니다. 넓고, 믿음직하고, 안전 기능이 가득합니다. 비용을 절약하면서 공간이 필요한 교외 가족에게 좋습니다.",
    lifestyleTags: {
      drivingEnv: ["suburban", "city"],
      commute: ["short", "medium"],
      feel: ["practical"],
      familySize: ["small_family", "solo_couple"],
      features: ["apple_carplay", "android_auto", "backup_camera", "blind_spot", "lane_assist", "keyless_entry"],
      fuel: ["gas"],
      budget: "30k_40k",
    },
    status: "available",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-20",
  },
  {
    id: "new-003",
    title: "2026 Kia Telluride SX",
    type: "new",
    price: 49990,
    year: 2026,
    make: "Kia",
    model: "Telluride",
    trim: "SX",
    bodyStyle: "SUV",
    fuel: "gas",
    mileage: 0,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "The Telluride is Kia's premium 3-row SUV. Seats 8, AWD, premium interior. The ultimate family road trip machine. If you need space for the whole crew plus gear, this is it.",
    descriptionKo: "텔루라이드는 기아의 프리미엄 3열 SUV입니다. 8인승, AWD, 프리미엄 인테리어. 궁극의 가족 로드트립 머신. 온 가족과 짐까지 실을 공간이 필요하다면 이 차입니다.",
    lifestyleTags: {
      drivingEnv: ["suburban", "rural"],
      commute: ["medium", "long"],
      feel: ["luxury", "practical"],
      familySize: ["large_family"],
      features: ["apple_carplay", "android_auto", "heated_seats", "cooled_seats", "heated_steering", "sunroof", "leather", "awd", "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise", "parking_sensors", "remote_start", "keyless_entry", "wireless_charging", "premium_audio", "third_row", "tow_package", "roof_rack", "heads_up", "digital_dash", "power_liftgate", "ventilated_seats"],
      fuel: ["gas"],
      budget: "over_40k",
    },
    status: "available",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-20",
  },
  {
    id: "new-004",
    title: "2026 Kia Forte LXS",
    type: "new",
    price: 22190,
    year: 2026,
    make: "Kia",
    model: "Forte",
    trim: "LXS",
    bodyStyle: "Sedan",
    fuel: "gas",
    mileage: 0,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "The Forte is the smart choice for budget-conscious buyers who still want style and tech. Great fuel economy, Apple CarPlay, and a smooth city ride.",
    descriptionKo: "포르테는 스타일과 기술을 원하면서도 예산을 중시하는 구매자를 위한 현명한 선택입니다. 뛰어난 연비, Apple CarPlay, 부드러운 시내 주행.",
    lifestyleTags: {
      drivingEnv: ["city", "suburban"],
      commute: ["short", "medium"],
      feel: ["practical"],
      familySize: ["solo_couple"],
      features: ["apple_carplay", "android_auto", "backup_camera", "keyless_entry", "lane_assist", "blind_spot"],
      fuel: ["gas"],
      budget: "20k_30k",
    },
    status: "available",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-20",
  },
  {
    id: "new-005",
    title: "2026 Kia K5 GT-Line",
    type: "new",
    price: 30890,
    year: 2026,
    make: "Kia",
    model: "K5",
    trim: "GT-Line",
    bodyStyle: "Sedan",
    fuel: "gas",
    mileage: 0,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "The K5 GT-Line is for drivers who want sedan practicality with a sporty edge. Aggressive styling, responsive handling, and a premium feel without the luxury price tag.",
    descriptionKo: "K5 GT-Line은 세단의 실용성에 스포티한 감성을 원하는 드라이버를 위한 차입니다. 공격적인 스타일링, 반응 좋은 핸들링, 럭셔리 가격 없는 프리미엄 느낌.",
    lifestyleTags: {
      drivingEnv: ["city", "highway"],
      commute: ["medium", "long"],
      feel: ["sporty"],
      familySize: ["solo_couple", "small_family"],
      features: ["apple_carplay", "android_auto", "heated_seats", "sunroof", "leather", "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise", "keyless_entry", "remote_start", "wireless_charging", "premium_audio", "digital_dash"],
      fuel: ["gas"],
      budget: "30k_40k",
    },
    status: "available",
    createdAt: "2026-03-08",
    updatedAt: "2026-03-20",
  },
  {
    id: "used-001",
    title: "2023 Kia Sorento SX",
    type: "used",
    price: 32500,
    year: 2023,
    make: "Kia",
    model: "Sorento",
    trim: "SX",
    bodyStyle: "SUV",
    fuel: "gas",
    mileage: 28000,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "Low-mileage Sorento SX with 3rd row seating. One owner, clean history. Perfect mid-size SUV for families who want more space than a Sportage but don't need the full Telluride.",
    descriptionKo: "저주행 소렌토 SX, 3열 시트. 1인 소유, 깨끗한 이력. 스포티지보다 넓지만 텔루라이드까진 필요 없는 가족을 위한 완벽한 중형 SUV.",
    lifestyleTags: {
      drivingEnv: ["suburban"],
      commute: ["medium"],
      feel: ["practical", "luxury"],
      familySize: ["small_family", "large_family"],
      features: ["apple_carplay", "android_auto", "heated_seats", "cooled_seats", "heated_steering", "leather", "awd", "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise", "parking_sensors", "remote_start", "keyless_entry", "wireless_charging", "premium_audio", "third_row", "power_liftgate", "ventilated_seats"],
      fuel: ["gas"],
      budget: "30k_40k",
    },
    status: "available",
    createdAt: "2026-03-15",
    updatedAt: "2026-03-20",
  },
  {
    id: "used-002",
    title: "2022 Kia Telluride EX",
    type: "used",
    price: 36900,
    year: 2022,
    make: "Kia",
    model: "Telluride",
    trim: "EX",
    bodyStyle: "SUV",
    fuel: "gas",
    mileage: 35000,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "Certified pre-owned Telluride with full service history. Save thousands off MSRP and still get the best family SUV on the road.",
    descriptionKo: "풀 서비스 이력이 있는 인증 중고 텔루라이드. MSRP에서 수천 달러를 절약하면서 도로 위 최고의 가족 SUV를 만나보세요.",
    lifestyleTags: {
      drivingEnv: ["suburban", "rural"],
      commute: ["medium", "long"],
      feel: ["luxury", "practical"],
      familySize: ["large_family"],
      features: ["apple_carplay", "android_auto", "heated_seats", "heated_steering", "sunroof", "leather", "awd", "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise", "parking_sensors", "remote_start", "keyless_entry", "wireless_charging", "third_row", "tow_package", "roof_rack", "power_liftgate", "ventilated_seats"],
      fuel: ["gas"],
      budget: "30k_40k",
    },
    status: "available",
    createdAt: "2026-03-12",
    updatedAt: "2026-03-20",
  },
  {
    id: "used-003",
    title: "2024 Kia Sportage Hybrid EX",
    type: "used",
    price: 33200,
    year: 2024,
    make: "Kia",
    model: "Sportage Hybrid",
    trim: "EX",
    bodyStyle: "SUV",
    fuel: "hybrid",
    mileage: 12000,
    photoUrls: ["/images/placeholder-car.jpg"],
    descriptionEn: "Nearly new Sportage Hybrid — incredible fuel economy (38 MPG combined) with SUV versatility. Low miles, one owner. Best of both worlds.",
    descriptionKo: "거의 새 차인 스포티지 하이브리드 — 놀라운 연비(복합 38 MPG)와 SUV 활용성. 저주행, 1인 소유. 두 마리 토끼를 다 잡으세요.",
    lifestyleTags: {
      drivingEnv: ["suburban", "city"],
      commute: ["medium", "long"],
      feel: ["practical"],
      familySize: ["small_family", "solo_couple"],
      features: ["apple_carplay", "android_auto", "heated_seats", "heated_steering", "awd", "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise", "parking_sensors", "keyless_entry", "remote_start", "wireless_charging", "power_liftgate"],
      fuel: ["hybrid"],
      budget: "30k_40k",
    },
    status: "available",
    createdAt: "2026-03-18",
    updatedAt: "2026-03-20",
  },
];

export function getInventory(): Vehicle[] {
  return sampleInventory.filter((v) => v.status === "available");
}

export function getVehicleById(id: string): Vehicle | undefined {
  return sampleInventory.find((v) => v.id === id);
}

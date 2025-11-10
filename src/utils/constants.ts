// LocalStorage keys
export const STORAGE_KEY = "invitation_props";

// QR Code Images
export const QR_IMAGES = {
  groomBank: "/images/qrs/groom_bank.jpg",
  brideBank: "/images/qrs/bride_bank.jpg",
  restaurantMap: "/images/qrs/restaurant_map.png",
};

export const THE_GROOM_FAMILY_INFO = {
  contact_name: "Tiến Phan",
  full_name: "Phan Quang Tiến",
  name: "Quang Tiến",
  phone: "0935253027",
  email: "phanqtien@gmail.com",
  pronouns: "Nhà Trai / Ông Bà",
  father: "Phan Quang Đào",
  mother: "Nguyễn Thị Sinh",
  address: "Điện Bàn Tây - TP Đà Nẵng",
};

export const THE_BRIDE_FAMILY_INFO = {
  full_name: "Nguyễn Thị Lệ Huyền",
  name: "Lệ Huyền",
  phone: "0364346242",
  email: "ntlehuyen5@gmail.com",
  pronouns: "Nhà Gái / Bà Quả Phụ",
  mother: "Nguyễn Thị Y",
  address: "Hương Thuỷ - TP Huế",
};

export const MAIN_CEREMONY_INFO = {
  type: "ceremony",
  dateOfWeek: "Chủ nhật",
  at: "30/11/2025 09:30 +07:00",
  lunaDate: "ngày 11 tháng 10 năm Ất Tỵ",
  time: "09:30",
  location: "Tư gia",
};

export const MAIN_WEDDING_PARTY_INFO = {
  type: "party",
  dateOfWeek: "Chủ nhật",
  at: "30/11/2025 11:00 +07:00",
  atStr: "Ngày 30 tháng 11 năm 2025",
  atStrEng: "November 30, 2025",
  lunaDate: "ngày 11 tháng 10 năm Ất Tỵ",
  time: "11:00",
  openAt: "11:00",
  partyAt: "11:30",
  restaurant: "Nhà hàng tiệc cưới Gia Huy",
  location: "Đường Dương Sơn 4, phường Hoà Xuân",
  city: "Thành phố Đà Nẵng",
  google_map_url: "https://maps.app.goo.gl/FVBK3FssCvj1pptW6",
};

interface ParentInfo {
  father?: string;
  mother: string;
  address: string;
  pronouns: string;
}
export interface MainCeremonyCardProps {
  groomName: string;
  brideName: string;
  ceremonyTitle: string;
  firstParentInfo: ParentInfo;
  secondParentInfo: ParentInfo;
  location: string;
  ceremonyDate: string;
  ceremonyTime: string;
  ceremonyDateLunar: string;
  coupleGreeting?: string;
  className?: string;
}

export interface WeddingPartyCardProps {
  className?: string;
  invitationText: string;
  guestName: string;
  invitationSecondText: string;
  restaurantName: string;
  restaurantAddress: string;
  city: string;
  mapUrl: string;
  time: string;
  lunaDate: string;
  thanksText: string;
  openAt: string;
  partyAt: string;
  coupleGreeting?: string;
}

const CeremonyInfo = {
  groomPronouns: THE_GROOM_FAMILY_INFO.pronouns,
  bridePronouns: THE_BRIDE_FAMILY_INFO.pronouns,
  groomName: THE_GROOM_FAMILY_INFO.full_name,
  brideName: THE_BRIDE_FAMILY_INFO.full_name,
  ceremonyTitle: "LỄ THÀNH HÔN",
  location: MAIN_CEREMONY_INFO.location,
  firstParentInfo: {
    pronouns: THE_GROOM_FAMILY_INFO.pronouns,
    father: THE_GROOM_FAMILY_INFO.father,
    mother: THE_GROOM_FAMILY_INFO.mother,
    address: THE_GROOM_FAMILY_INFO.address,
  },
  secondParentInfo: {
    pronouns: THE_BRIDE_FAMILY_INFO.pronouns,
    mother: THE_BRIDE_FAMILY_INFO.mother,
    address: THE_BRIDE_FAMILY_INFO.address,
  },
  ceremonyDate: `NGÀY ${MAIN_CEREMONY_INFO.at.split("/")[0]} THÁNG ${
    MAIN_CEREMONY_INFO.at.split("/")[1]
  } NĂM ${MAIN_CEREMONY_INFO.at.split("/")[2].split(" ")[0]}`,
  ceremonyTime: `${
    MAIN_CEREMONY_INFO.time
  } - ${MAIN_CEREMONY_INFO.dateOfWeek.toUpperCase()}`,
  ceremonyDateLunar: MAIN_CEREMONY_INFO.lunaDate,
};

const BrideCeremonyInfo = {
  ...CeremonyInfo,
  firstParentInfo: CeremonyInfo.secondParentInfo,
  secondParentInfo: CeremonyInfo.firstParentInfo,
  ceremonyTitle: "Lễ Vu Quy",
  location: "Tư gia Nữ",
  ceremonyTime: `07:30 - CHỦ NHẬT`,
};
const WeddingPartyInfo = {
  invitationText: "Thân mời",
  guestName: "Bạn Mến Yêu",
  invitationSecondText:
    "Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại",
  restaurantName: MAIN_WEDDING_PARTY_INFO.restaurant,
  restaurantAddress: MAIN_WEDDING_PARTY_INFO.location,
  city: MAIN_WEDDING_PARTY_INFO.city,
  mapUrl: MAIN_WEDDING_PARTY_INFO.google_map_url,
  time: MAIN_WEDDING_PARTY_INFO.atStr,
  lunaDate: MAIN_WEDDING_PARTY_INFO.lunaDate,
  thanksText:
    "Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.",
  openAt: MAIN_WEDDING_PARTY_INFO.openAt,
  partyAt: MAIN_WEDDING_PARTY_INFO.partyAt,
};

const BrideWeddingPartyInfo = {
  ...WeddingPartyInfo,
  restaurantName: "Tư gia",
  restaurantAddress: "151 Tân Trào, Hương Thủy",
  city: "Thành phố Huế",
  mapUrl: "https://maps.app.goo.gl/FdRPZiesGVBpuANAA",
  lunaDate: "ngày 08 tháng 10 năm Ất Tỵ",
};

const mainParty = {
  name: "Nhà nam",
  ceremonyInfo: CeremonyInfo,
  weddingPartyInfo: WeddingPartyInfo,
};
const bridePartySectionOne = {
  name: "Nhà nữ xuất 1",
  ceremonyInfo: BrideCeremonyInfo,
  weddingPartyInfo: {
    ...BrideWeddingPartyInfo,
    time: "Ngày 27 tháng 11 năm 2025",
    openAt: "08H00",
    partyAt: "08H30",
  },
};
const bridePartySectionTwo = {
  name: "Nhà nữ xuất 2",
  ceremonyInfo: BrideCeremonyInfo,
  weddingPartyInfo: {
    ...BrideWeddingPartyInfo,
    openAt: "11H00",
    partyAt: "11H30",
  },
};
export const PACKAGES: Record<
  string,
  {
    name: string;
    ceremonyInfo: MainCeremonyCardProps;
    weddingPartyInfo: WeddingPartyCardProps;
  }
> = {
  mainParty: mainParty,
  bridePartySectionOne: bridePartySectionOne,
  bridePartySectionTwo: bridePartySectionTwo,
  "1": mainParty,
  "2": bridePartySectionOne,
  "3": bridePartySectionTwo,
};

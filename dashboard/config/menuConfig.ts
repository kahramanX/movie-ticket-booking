export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  openInTab?: boolean;
  tabTitle?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const menuConfig: MenuSection[] = [
  {
    title: "",
    items: [{ label: "Homepage", href: "/panel" }],
  },
  {
    title: "Movies",
    items: [
      {
        label: "Movie List",
        href: "/panel/movie-list",
        openInTab: true,
        tabTitle: "Film Listesi",
      },
      {
        label: "Movie Category List",
        href: "/panel/movie-category-list",
        openInTab: true,
        tabTitle: "Film Kategorileri",
      },
    ],
  },
  {
    title: "Theaters",
    items: [
      {
        label: "Theater List",
        href: "/panel/theater-list",
        openInTab: true,
        tabTitle: "Sinema Listesi",
      },
      {
        label: "Theater Management",
        href: "/panel/theater-management",
        openInTab: true,
        tabTitle: "Sinema Yönetimi",
      },
      {
        label: "Seat Layout",
        href: "/panel/seat-layout",
        openInTab: true,
        tabTitle: "Koltuk Düzeni",
      },
    ],
  },
  {
    title: "Reservations",
    items: [
      {
        label: "Reservation List",
        href: "/panel/reservation-list",
        openInTab: true,
        tabTitle: "Rezervasyon Listesi",
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        label: "Admin List",
        href: "/panel/admin-list",
        openInTab: true,
        tabTitle: "Admin Listesi",
      },
      {
        label: "User List",
        href: "/panel/user-list",
        openInTab: true,
        tabTitle: "Kullanıcı Listesi",
      },
      {
        label: "VIP Customers",
        href: "/panel/customers/vip",
        openInTab: true,
        tabTitle: "VIP Müşteriler",
      },
      {
        label: "Membership Management",
        href: "/panel/membership",
        openInTab: true,
        tabTitle: "Üyelik Yönetimi",
      },
    ],
  },
  {
    title: "Blogs",
    items: [
      {
        label: "Blog List",
        href: "/panel/blog-list",
        openInTab: true,
        tabTitle: "Blog Listesi",
      },
      {
        label: "Blog Category List",
        href: "/panel/blog-category-list",
        openInTab: true,
        tabTitle: "Blog Kategorileri",
      },
      {
        label: "Blog Tag List",
        href: "/panel/blog-tag-list",
        openInTab: true,
        tabTitle: "Blog Etiketleri",
      },
    ],
  },
];

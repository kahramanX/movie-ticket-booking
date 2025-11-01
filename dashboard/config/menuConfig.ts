export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
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
      { label: "Movie List", href: "/panel/movie-list" },
      { label: "Movie Category List", href: "/panel/movie-category-list" },
    ],
  },
  {
    title: "Theaters",
    items: [
      { label: "Theater List", href: "/panel/theater-list" },
      { label: "Theater Management", href: "/panel/theater-management" },
      { label: "Seat Layout", href: "/panel/seat-layout" },
    ],
  },
  {
    title: "Reservations",
    items: [{ label: "Reservation List", href: "/panel/reservation-list" }],
  },
  {
    title: "Users",
    items: [
      { label: "Admin List", href: "/panel/admin-list" },
      { label: "User List", href: "/panel/user-list" },
      { label: "VIP Customers", href: "/panel/customers/vip" },
      { label: "Membership Management", href: "/panel/membership" },
    ],
  },
  {
    title: "Blogs",
    items: [
      { label: "Blog List", href: "/panel/blog-list" },
      { label: "Blog Category List", href: "/panel/blog-category-list" },
      { label: "Blog Tag List", href: "/panel/blog-tag-list" },
    ],
  },
];

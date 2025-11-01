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
      { label: "Movie List", href: "/panel/movies" },
      { label: "Add Movie", href: "/panel/movies/add" },
      { label: "Categories", href: "/panel/categories" },
      { label: "Types", href: "/panel/types" },
    ],
  },
  {
    title: "Theaters",
    items: [
      { label: "Theater List", href: "/panel/theaters" },
      { label: "Add New Theater", href: "/panel/theaters/add" },
      { label: "Theater Management", href: "/panel/theater-management" },
      { label: "Seat Layout", href: "/panel/seat-layout" },
    ],
  },
  {
    title: "Reservations",
    items: [
      { label: "Reservation List", href: "/panel/reservations" },
      { label: "New Reservation", href: "/panel/reservations/add" },
      { label: "Cancelled", href: "/panel/reservations/cancelled" },
      { label: "Completed", href: "/panel/reservations/completed" },
    ],
  },
  {
    title: "Users",
    items: [
      { label: "Admin List", href: "/panel/admins" },
      { label: "User List", href: "/panel/users" },
      { label: "New Customer", href: "/panel/customers/add" },
      { label: "VIP Customers", href: "/panel/customers/vip" },
      { label: "Membership Management", href: "/panel/membership" },
    ],
  },
];

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
      {
        label: "Add Blog",
        href: "/panel/add-blog",
        openInTab: true,
        tabTitle: "Blog Ekle",
      },
    ],
  },
];

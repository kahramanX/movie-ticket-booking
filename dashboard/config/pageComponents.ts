import { ComponentType } from "react";

// Page component imports
import { Dashboard } from "@/containers/tabPages/dashboard";
import { Profile } from "@/containers/tabPages/profile";
import { MovieList } from "@/containers/tabPages/movieList";
import { MovieCategoryList } from "@/containers/tabPages/movieCategoryList";
import { AdminList } from "@/containers/tabPages/adminList";
import { UserList } from "@/containers/tabPages/userList";
import { BlogList } from "@/containers/tabPages/blogList";
import { BlogCategoryList } from "@/containers/tabPages/blogCategoryList";
import { BlogTagList } from "@/containers/tabPages/blogTagList";
import { AddBlog } from "@/containers/tabPages/addBlog";

// Page component interface
export interface PageConfig {
  title: string;
  component: ComponentType;
  description?: string;
  showHomeIcon?: boolean; // Home icon gösterilecek mi?
}

// URL slug to component mapping
export const pageComponents: Record<string, PageConfig> = {
  // Dashboard
  "": {
    title: "",
    component: Dashboard,
    showHomeIcon: true,
  },

  // Profile
  profile: {
    title: "Profil",
    component: Profile,
  },

  // Movies
  "movie-list": {
    title: "Film Listesi",
    component: MovieList,
  },
  "movie-category-list": {
    title: "Film Kategorileri",
    component: MovieCategoryList,
  },

  // Users
  "admin-list": {
    title: "Yönetici Listesi",
    component: AdminList,
  },
  "user-list": {
    title: "Kullanıcı Listesi",
    component: UserList,
  },

  // Blogs
  "blog-list": {
    title: "Blog Listesi",
    component: BlogList,
  },
  "blog-category-list": {
    title: "Blog Kategorileri",
    component: BlogCategoryList,
  },
  "blog-tag-list": {
    title: "Blog Etiketleri",
    component: BlogTagList,
  },
  "add-blog": {
    title: "Blog Ekle",
    component: AddBlog,
  },
};

// Helper function to get page config by slug
export const getPageConfig = (slug: string): PageConfig | undefined => {
  return pageComponents[slug];
};

// Helper function to check if slug exists
export const isValidSlug = (slug: string): boolean => {
  return slug in pageComponents;
};

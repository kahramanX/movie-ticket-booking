import { ComponentType } from "react";

// Page component imports
import { BlogListPage } from "@/containers/pages/blogList";
import { BlogCategoriesPage } from "@/containers/pages/blogCategories";

// Page component interface
export interface PageConfig {
  title: string;
  component: ComponentType;
  description?: string;
}

// URL slug to component mapping
export const pageComponents: Record<string, PageConfig> = {
  // Movies
  'movie-list': {
    title: 'Film Listesi',
    component: BlogListPage, // Geçici olarak BlogListPage kullanıyoruz
    description: 'Tüm filmleri görüntüle ve yönet'
  },
  'movie-category-list': {
    title: 'Film Kategorileri',
    component: BlogCategoriesPage, // Geçici olarak BlogCategoriesPage kullanıyoruz
    description: 'Film kategorilerini yönet'
  },
  
  // Theaters
  'theater-list': {
    title: 'Sinema Listesi',
    component: BlogListPage, // Placeholder
    description: 'Sinema salonlarını yönet'
  },
  'theater-management': {
    title: 'Salon Yönetimi',
    component: BlogCategoriesPage, // Placeholder
    description: 'Salon ayarlarını düzenle'
  },
  
  // Reservations
  'reservation-list': {
    title: 'Rezervasyon Listesi',
    component: BlogListPage, // Placeholder
    description: 'Tüm rezervasyonları görüntüle'
  },
  'new-reservation': {
    title: 'Yeni Rezervasyon',
    component: BlogCategoriesPage, // Placeholder
    description: 'Yeni rezervasyon oluştur'
  },
  
  // Users
  'admin-list': {
    title: 'Yönetici Listesi',
    component: BlogListPage, // Placeholder
    description: 'Sistem yöneticilerini yönet'
  },
  'user-list': {
    title: 'Kullanıcı Listesi',
    component: BlogCategoriesPage, // Placeholder
    description: 'Tüm kullanıcıları görüntüle'
  }
};

// Helper function to get page config by slug
export const getPageConfig = (slug: string): PageConfig | undefined => {
  return pageComponents[slug];
};

// Helper function to check if slug exists
export const isValidSlug = (slug: string): boolean => {
  return slug in pageComponents;
};

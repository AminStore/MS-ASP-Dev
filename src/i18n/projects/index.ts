/**
 * Centralized Projects Index
 * Combines all project categories (MVC, API, Microservices, Full-Stack)
 * Split by language (EN/AR) and organized by category
 */

import { mvcProjectsEN, mvcProjectsAR } from "./mvc";
import { apiProjectsEN, apiProjectsAR } from "./api";
import { microservicesProjectsEN, microservicesProjectsAR } from "./microservices";
import { fullstackProjectsEN, fullstackProjectsAR } from "./fullstack";

/**
 * All projects combined for English
 */
export const allProjectsEN = [
  ...mvcProjectsEN,
  ...apiProjectsEN,
  ...microservicesProjectsEN,
  ...fullstackProjectsEN,
];

/**
 * All projects combined for Arabic
 */
export const allProjectsAR = [
  ...mvcProjectsAR,
  ...apiProjectsAR,
  ...microservicesProjectsAR,
  ...fullstackProjectsAR,
];

/**
 * Projects organized by category for filtering
 */
export const projectsByCategory = {
  en: {
    MVC: mvcProjectsEN,
    "REST API": apiProjectsEN,
    Microservices: microservicesProjectsEN,
    "Full Stack": fullstackProjectsEN,
  },
  ar: {
    MVC: mvcProjectsAR,
    "REST API": apiProjectsAR,
    Microservices: microservicesProjectsAR,
    "Full Stack": fullstackProjectsAR,
  },
};

/**
 * Get all unique categories
 */
export const categories = {
  en: Object.keys(projectsByCategory.en),
  ar: Object.keys(projectsByCategory.ar),
};

/**
 * Get a single project by slug (works across all categories)
 */
export function getProjectBySlug(slug: string, lang: "en" | "ar") {
  const projects = lang === "en" ? allProjectsEN : allProjectsAR;
  return projects.find((p) => p.slug === slug);
}

/**
 * Get all projects in a specific category
 */
export function getProjectsByCategory(category: string, lang: "en" | "ar") {
  const catProjects = projectsByCategory[lang][category as keyof typeof projectsByCategory.en];
  return catProjects || [];
}

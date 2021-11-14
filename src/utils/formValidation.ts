export const PATTERNS = {
  DEFAULT: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  LOGIN: /^[a-z0-9_-]{3,15}$/,
  PHONE: /^\+?(\d{1})\(?(\d{3})\)?[-|\s]?(\d{3})[-|\s]?(\d{2})[-|\s]?(\d{2})$/,
  PASSWORD: /^[a-zA-Z0-9_-]{3,15}$/
};
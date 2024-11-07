export const GENERIC = {
  currency: 'Rs.',
}

export const DISCOUNT = {
  APPLIES_TO: {
    ALL: 10,
    SPECIFIC: 20,
  },
  DISCOUNT_PRODUCT: {
    INCLUDE: 10,
    EXCLUDE: 20,
  },
  DISCOUNT_TYPE: {
    PERCENTAGE: 10,
    FIXED: 20,
  },
}

export const PROMO = {
  APPLIES_TO: {
    ALL: 10,
    SPECIFIC: 20,
  },
  PROMO_PRODUCT: {
    INCLUDE: 10,
    EXCLUDE: 20,
  },
  PROMO_TYPE: {
    PERCENTAGE: 10,
    FIXED: 20,
  },
}

export const ROLES = {
  ADMIN: 1,
  USER: 2,
  RESTAURANT_ADMIN: 3,
  ESTABLISHMENT_LEVEL: 3.1,
}
export const PAGINATION = {
  perPage: 10,
}
export const GALLERY_PAGINATION = {
  firstPage: 1,
  perPage: 20,
}

export const BACKEND_CONSTANTS = {
  THEME_TYPES: {
    MOBILE: 10,
    WEB: 20,
    POS: 30,
  },
  ATTACHMENT_INSTANCE_TYPE: {
    GALLERY: 70,
  },
  CUSTOM_MENU: {
    TIMETABLE_STATUS: {
      ACTIVE: 10,
      INACTIVE: 20,
    },
    TYPE: {
      CHECKED_SUB_CATEGORIES: 10,
      CHECKED_PRODUCTS: 20,
      UNCHECKED_SUB_CATEGORIES: 30,
      UNCHECKED_PRODUCTS: 40,
      UNCHECKED_CATEGORIES: 50,
      CHECKED_CATEGORIES: 60,
      ALL_CHECKED_PRODUCTS: 70,
    },
  },
  MODULES: {
    MENU_MANAGEMENT: 10,
    ORDER_MANAGEMENT: 20,
    PAYMENT: 21,
    TABLE: 23,
    PROMO: 22,
    DISCOUNT: 24,
    REPORTS: 30,
    USER_MANAGEMENT: 40,
    SETTINGS: 50,
    MODIFIERS: 60,
    ROLE_MANAGEMENT: 70,
    ESTABLISHMENT_MANAGEMENT: 80,
    PRINTER: 90,
    RESTAURANT_MANAGEMENT: 100, // Ye Restaurant Manage Kr Raha ha
    ADMIN_MANAGEMENT: 110, // Ye Restaurant Admin Manage Kr Raha ha
    CUSTOMER_MANAGEMENT: 120,
    // VERSION_MANAGEMENT: 111,
  },
  COMPARED: {
    FROM: {
      TODAY: 10,
      THIS_WEEK: 20,
      THIS_MONTH: 30,
      THIS_YEAR: 40,
    },
    TO: {
      YESTERDAY: 10,
      LAST_WEEK: 20,
      LAST_MONTH: 30,
      LAST_YEAR: 40,
      SAME_DAY_LAST_WEEK: 50,
      SAME_DAY_LAST_MONTH: 60,
      SAME_DAY_LAST_YEAR: 70,
    },
  },
  ORDERS: {
    TYPES: {
      DINE: 10,
      TAKEAWAY: 20,
      DELIVERY: 30,
      ONLINE: 40,
      EMPLOYEE: 50,
      USER: 60,
      ESTABLISHMENT: 70,
    },
    STATUS: {
      ORDERED: 10,
      HOLD: 20,
      KITCHEN: 30,
      DISPATCH: 40,
      DELIVERED: 50,
      CANCELLED: 60,
      COMPLETED: 70,
    },
    PAYMENT_TYPE: {
      COD: 10,
      CASH: 20,
      CARD: 30,
    },
    PAYMENT_STATUS: {
      PENDING: 10,
      COMPLETED: 20,
      CANCELLED: 30,
      REFUND: 40,
    },
    ORDER_PLATFORMS: {
      IOS: 'ios',
      ANDROID: 'android',
      WEB: 'web',
      POS: 'pos',
    },
    ORDER_DISCOUNT_TYPE: {
      DISCOUNT: 10,
      PROMO: 20,
    },
    ONLINE_ORDER_TYPE: {
      DELIVERY: 10,
      PICKUP: 20,
    },
  },
  TRANSACTION: {
    PAYMENT_TYPE: {
      CASH: 10,
      CARD: 20,
      KEENU: 30,
      EASY_PAISA: 40,
    },
  },
  DEAL_COMBO: {
    TYPES: {
      DEAL: 10,
      COMBO: 20,
    },
    STATUS: {
      ACTIVE: 10,
      INACTIVE: 20,
    },
  },
  POS_DEVICE: {
    STATUS: {
      ACTIVE: 10,
      INACTIVE: 20,
    },
  },
  S3CREDENTIAL: {
    fileSize: '40048576', //1mb
  },
  NOTIFICATION_TYPE: {
    MENU_MANAGEMENT: 10,
    DEAL_COMBO: 11,
    ORDER_MANAGEMENT: 20,
    PAYMENT: 21,
    PROMO: 22,
    TABLE: 23,
    DISCOUNT: 24,
    DINE_IN_ORDER: 25,
    TAKEAWAY_ORDER: 26,
    ONLINE_ORDER: 27,
    DELIVERY_ORDER: 28,
    REPORTS: 30,
    USER_MANAGEMENT: 40,
    SETTINGS: 50,
    MODIFIERS: 60,
    ROLE_MANAGEMENT: 70,
    RESTAURANT_MANAGEMENT: 80,
    PRINTER: 90,
  },
  PRINTER: {
    TYPE: {
      CASHIER: 10,
      KOT: 20,
      STATION: 30,
      BACKUP: 40,
    },
  },
  RESTAURANT_STEPPER: {
    STATUS: {
      ESTABLISHMENT: 0,
      SETTING: 1,
      WEB_THEME: 2,
      MOBILE_THEME: 3,
      FINISH: 4,
    },
  },
  DELIVERY_SERVICES: {
    BYKEA: 10,
    GO_PANDA: 20,
  },
  PAYMENT_SERVICES: {
    STRIPE: 10,
    BYKEA: 20,
  },
  REPORTS: {
    SALES_SUMMARY: {
      FILTER: {
        COMPARE: {
          CATEGORY: 10,
          PRODUCT: 20,
          MODIFIER: 30,
          ORDER_TYPE: 40,
        },
      },
    },
  },
  PAGES:{
    PRIVACY_POLICY:'privacy-policy',
    TERMS_AND_CONDITIONS:'terms-and-conditions'
  },
  DEFAULT_NAVIGATION_AFTER_LOGIN: '/dashboard',
  DEFAULT_SUPER_ADMIN_NAVIGATION: '/restaurants',
  VERIFY_USER_NAVIGATION: '/verification',

}

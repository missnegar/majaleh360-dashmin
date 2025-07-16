export interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  postTitle: string;
  time: string;
}

export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface DetailedComment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  postTitle: string;
  postUrl: string;
  createdAt: string;
  status: CommentStatus;
}


export interface AnalyticsData {
  name: string;
  visits: number;
}

export interface CountryData {
  name: string;
  value: number;
  fill: string;
}

export interface DeviceData {
  name: string;
  value: number;
  fill: string;
}

export interface ReferralData {
  source: string;
  visits: number;
  change: number;
  icon: 'google' | 'direct' | 'link';
}

export interface TopPageData {
  path: string;
  views: number;
}

export type SeoStatus = 'عالی' | 'خوب' | 'نیاز به بهبود' | 'ضعیف';

export interface Post {
  id: number;
  title: string;
  keywords: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  seoStatus: SeoStatus;
  author: string;
  authorAvatar: string;
  views: number;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string; // MIME type
  size: number; // in bytes
  altText: string;
  description: string;
  createdAt: Date;
  width?: number;
  height?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  description: string;
  postCount: number;
}

export interface SeoAnalyticsDataPoint {
  date: string;
  clicks: number;
  impressions: number;
}

export interface SeoSettings {
  titleSeparator: string;
  homepageMetaTitle: string;
  homepageMetaDescription: string;
  knowledgeGraphType: 'Person' | 'Organization';
  knowledgeGraphName: string;
  knowledgeGraphLogo: string;
  analyticsTrackingCode: string;
  headerCode: string;
  bodyCode: string;
  footerCode: string;
}

export interface Ad {
  id: number;
  advertiser: string;
  advertiserAvatar: string;
  bannerUrl: string;
  agent: string;
  placement: 'سایدبار' | 'بالای صفحه' | 'بین مطالب';
  registeredAt: string;
  expiresAt: string;
  clicks: number;
  paidAmount: number;
  totalAmount: number;
  status: 'فعال' | 'منقضی شده' | 'در انتظار پرداخت';
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  faviconUrl: string;
  address: string;
  phone: string;
  supportPhone: string;
}

export interface LinkSettings {
  permalinkStructure: 'name' | 'random';
  urlPrefix: string;
  urlSuffix: string;
  adminLoginUrl: string;
  adminEmail: string;
}

export interface SmsSettings {
  provider: 'kavenegar' | 'sms_ir' | 'other';
  apiKey: string;
  senderNumber: string;
}

export interface SecuritySettings {
  comingSoonMode: boolean;
  twoFactorAuth: boolean;
}

export interface PaymentGatewaySettings {
  provider: 'zarinpal' | 'mellat' | 'saman' | 'other';
  merchantId: string;
}

export interface AppSettings {
  site: SiteSettings;
  links: LinkSettings;
  sms: SmsSettings;
  security: SecuritySettings;
  payment: PaymentGatewaySettings;
}

export type UserRole = 'admin' | 'writer' | 'support' | 'user';
export type UserStatus = 'active' | 'banned' | 'suspended';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  mobile: string;
  registrationDate: string;
  commentCount: number;
  role: UserRole;
  status: UserStatus;
}

export type InvoicePaymentStatus = 'paid' | 'pending' | 'failed';
export type InvoiceStatus = 'approved' | 'rejected' | 'pending_approval';
export type InvoiceOrderType = 'banner' | 'text' | 'reportage' | 'popup';

export interface Invoice {
  id: number;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  orderType: InvoiceOrderType;
  paymentStatus: InvoicePaymentStatus;
  registrationDate: string;
  expiryDate: string;
  amount: number;
  paymentMethod: string;
  bannerUrls: string[];
  agentName: string;
  status: InvoiceStatus;
}

export interface IncomeData {
  name: string;
  income: number;
}

export type CopywritingTaskStatus = 'in_progress' | 'review' | 'completed' | 'halted';

export interface CopywritingTask {
  id: number;
  copywriterName: string;
  copywriterAvatar: string;
  topic: string;
  requiredChars: number;
  progress: number; // percentage 0-100
  createdAt: string;
  deadline: string;
  status: CopywritingTaskStatus;
}
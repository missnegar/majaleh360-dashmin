import React from 'react';
import { AnalyticsData, Comment, CountryData, DeviceData, Post, ReferralData, TopPageData, MediaFile, Category, SeoAnalyticsDataPoint, Ad, DetailedComment, AppSettings, User, Invoice, IncomeData, CopywritingTask } from '../types.ts';

export const dailyAnalytics: AnalyticsData[] = [
  { name: 'بامداد', visits: 120 },
  { name: 'صبح', visits: 450 },
  { name: 'ظهر', visits: 800 },
  { name: 'عصر', visits: 650 },
  { name: 'شب', visits: 300 },
];

export const weeklyAnalytics: AnalyticsData[] = [
  { name: 'شنبه', visits: 2400 },
  { name: '۱شنبه', visits: 1398 },
  { name: '۲شنبه', visits: 9800 },
  { name: '۳شنبه', visits: 3908 },
  { name: '۴شنبه', visits: 4800 },
  { name: '۵شنبه', visits: 3800 },
  { name: 'جمعه', visits: 4300 },
];

export const monthlyAnalytics: AnalyticsData[] = [
  { name: 'هفته اول', visits: 15000 },
  { name: 'هفته دوم', visits: 21000 },
  { name: 'هفته سوم', visits: 18500 },
  { name: 'هفته چهارم', visits: 25000 },
];

export const quarterlyAnalytics: AnalyticsData[] = [
  { name: 'ماه اول', visits: 65000 },
  { name: 'ماه دوم', visits: 59000 },
  { name: 'ماه سوم', visits: 82000 },
];

export const mockComments: Comment[] = [
  {
    id: 1,
    author: 'مریم رضایی',
    avatar: 'https://picsum.photos/id/1027/40/40',
    text: 'مقاله بسیار عالی و آموزنده‌ای بود، ممنون از شما.',
    postTitle: '۱۰ نکته برای افزایش بهره‌وری',
    time: '۲ دقیقه پیش',
  },
  {
    id: 2,
    author: 'علی محمدی',
    avatar: 'https://picsum.photos/id/1005/40/40',
    text: 'با بخش‌هایی از این تحلیل موافق نیستم. به نظرم نیاز به بررسی بیشتر دارد.',
    postTitle: 'تحلیل بازار ارز دیجیتال',
    time: '۱۵ دقیقه پیش',
  },
  {
    id: 3,
    author: 'سارا احمدی',
    avatar: 'https://picsum.photos/id/1011/40/40',
    text: 'این دستور پخت فوق‌العاده بود! حتما امتحان کنید.',
    postTitle: 'طرز تهیه کیک شکلاتی',
    time: '۱ ساعت پیش',
  },
  {
    id: 4,
    author: 'رضا قاسمی',
    avatar: 'https://picsum.photos/id/1012/40/40',
    text: 'لطفا منابع این مطلب را هم ذکر کنید.',
    postTitle: 'تاریخچه هوش مصنوعی',
    time: '۳ ساعت پیش',
  },
  {
    id: 5,
    author: 'نازنین کریمی',
    avatar: 'https://picsum.photos/id/1025/40/40',
    text: 'چطور می‌توانم در این دوره ثبت نام کنم؟',
    postTitle: 'دوره جدید آموزش React',
    time: '۵ ساعت پیش',
  },
];

export const mockDetailedComments: DetailedComment[] = [
  { id: 1, author: 'مریم رضایی', avatar: 'https://picsum.photos/id/1027/40/40', text: 'مقاله بسیار عالی و آموزنده‌ای بود، ممنون از شما. به خصوص بخشی که در مورد تکنیک پومودورو صحبت کردید برای من جدید و کاربردی بود. حتما از این به بعد در کارهایم استفاده خواهم کرد.', postTitle: '۱۰ نکته برای افزایش بهره‌وری', postUrl: '/blog/productivity-tips', createdAt: '۱۴۰۳/۰۴/۱۰', status: 'approved' },
  { id: 2, author: 'علی محمدی', avatar: 'https://picsum.photos/id/1005/40/40', text: 'با بخش‌هایی از این تحلیل موافق نیستم. به نظرم نیاز به بررسی بیشتر دارد.', postTitle: 'تحلیل بازار ارز دیجیتال', postUrl: '/blog/crypto-analysis', createdAt: '۱۴۰۳/۰۴/۱۰', status: 'approved' },
  { id: 3, author: 'کاربر ناشناس', avatar: 'https://picsum.photos/id/301/40/40', text: 'این سایت عالیه!!!', postTitle: 'صفحه اصلی', postUrl: '/', createdAt: '۱۴۰۳/۰۴/۰۹', status: 'pending' },
  { id: 4, author: 'سارا احمدی', avatar: 'https://picsum.photos/id/1011/40/40', text: 'این دستور پخت فوق‌العاده بود! فقط یک سوال داشتم، میشه به جای شکر قهوه‌ای از شکر سفید استفاده کرد؟', postTitle: 'طرز تهیه کیک شکلاتی', postUrl: '/blog/chocolate-cake', createdAt: '۱۴۰۳/۰۴/۰۹', status: 'pending' },
  { id: 5, author: 'رضا قاسمی', avatar: 'https://picsum.photos/id/1012/40/40', text: 'مطلب جالبی بود ولی خیلی کوتاه بود. کاش بیشتر توضیح می‌دادید.', postTitle: 'تاریخچه هوش مصنوعی', postUrl: '/blog/ai-history', createdAt: '۱۴۰۳/۰۴/۰۸', status: 'approved' },
  { id: 6, author: 'تبلیغات۱۰۰٪ تضمینی', avatar: 'https://picsum.photos/id/302/40/40', text: 'برای خرید بازدید فیک به سایت ما سر بزنید: fake-view.com', postTitle: 'راهنمای کامل React 19', postUrl: '/blog/react-19-guide', createdAt: '۱۴۰۳/۰۴/۰۸', status: 'rejected' },
  { id: 7, author: 'نازنین کریمی', avatar: 'https://picsum.photos/id/1025/40/40', text: 'چطور می‌توانم در این دوره ثبت نام کنم؟ لینک ثبت نام کار نمی‌کند.', postTitle: 'دوره جدید آموزش React', postUrl: '/courses/react-new', createdAt: '۱۴۰۳/۰۴/۰۷', status: 'pending' },
  { id: 8, author: 'امیر حسینی', avatar: 'https://picsum.photos/id/1013/40/40', text: 'ممنون، استفاده کردم.', postTitle: 'چرا Tailwind CSS بهترین انتخاب است؟', postUrl: '/blog/why-tailwind', createdAt: '۱۴۰۳/۰۴/۰۷', status: 'approved' },
  { id: 9, author: 'بیتا محمودی', avatar: 'https://picsum.photos/id/1028/40/40', text: 'این فیلم اصلا هم خوب نبود. نقد شما منصفانه نیست.', postTitle: 'نقد فیلم آخرین بازمانده', postUrl: '/reviews/last-survivor', createdAt: '۱۴۰۳/۰۴/۰۶', status: 'rejected' },
  { id: 10, author: 'کیان مهرابی', avatar: 'https://picsum.photos/id/1014/40/40', text: 'آیا برای این دوره پیش‌نیازی هم لازمه؟ من فقط با HTML و CSS آشنا هستم.', postTitle: 'دوره جدید آموزش React', postUrl: '/courses/react-new', createdAt: '۱۴۰۳/۰۴/۰۵', status: 'pending' },
];


export const overallStats = {
  totalVisits: '1.2M',
  uniqueVisitors: '890K',
  pageViews: '3.4M',
  bounceRate: '45.7%',
};

export const countryData: CountryData[] = [
  { name: 'ایران', value: 45, fill: '#748873' },
  { name: 'آلمان', value: 15, fill: '#A3B5A2' },
  { name: 'آمریکا', value: 12, fill: '#D1C6B8' },
  { name: 'هلند', value: 8, fill: '#8A9A89' },
  { name: 'سایر', value: 20, fill: '#B8C6B7' },
];

export const deviceData: DeviceData[] = [
  { name: 'دسکتاپ', value: 58, fill: '#D1A980' },
  { name: 'موبایل', value: 35, fill: '#E6CBAA' },
  { name: 'تبلت', value: 7, fill: '#F2E2D0' },
];

export const referralData: ReferralData[] = [
    { source: 'گوگل', visits: 45103, change: 5.4, icon: 'google' },
    { source: 'ورودی مستقیم', visits: 22894, change: -2.1, icon: 'direct' },
    { source: 'virgool.io', visits: 10450, change: 3.2, icon: 'link' },
    { source: 'twitter.com', visits: 8760, change: -1.5, icon: 'link' },
];

export const topPagesData: TopPageData[] = [
  { path: '/blog/what-is-react-19', views: 25430 },
  { path: '/', views: 18970 },
  { path: '/pricing', views: 12100 },
  { path: '/contact-us', views: 8540 },
  { path: '/blog/tailwind-vs-bootstrap', views: 5620 },
];

export const mockPosts: Post[] = [
  { id: 101, title: 'راهنمای کامل React 19', keywords: ['React', 'JavaScript', 'Frontend'], slug: 'react-19-guide', createdAt: '۱۴۰۳/۰۳/۱۲', updatedAt: '۱۴۰۳/۰۴/۰۱', seoStatus: 'عالی', author: 'علی محمدی', authorAvatar: 'https://picsum.photos/id/1005/40/40', views: 12500 },
  { id: 102, title: 'چرا Tailwind CSS بهترین انتخاب است؟', keywords: ['CSS', 'Tailwind', 'طراحی وب'], slug: 'why-tailwind-css', createdAt: '۱۴۰۳/۰۳/۱۰', updatedAt: '۱۴۰۳/۰۳/۲۸', seoStatus: 'عالی', author: 'سارا احمدی', authorAvatar: 'https://picsum.photos/id/1011/40/40', views: 9800 },
  { id: 103, title: 'آشنایی با هوش مصنوعی Gemini', keywords: ['AI', 'Google', 'Gemini'], slug: 'intro-to-gemini', createdAt: '۱۴۰۳/۰۳/۰۵', updatedAt: '۱۴۰۳/۰۳/۱۵', seoStatus: 'خوب', author: 'مریم رضایی', authorAvatar: 'https://picsum.photos/id/1027/40/40', views: 7600 },
  { id: 104, title: 'دستور پخت کیک شکلاتی', keywords: ['آشپزی', 'کیک', 'دسر'], slug: 'chocolate-cake-recipe', createdAt: '۱۴۰۳/۰۲/۲۸', updatedAt: '۱۴۰۳/۰۲/۲۸', seoStatus: 'نیاز به بهبود', author: 'رضا قاسمی', authorAvatar: 'https://picsum.photos/id/1012/40/40', views: 21000 },
  { id: 105, title: 'نقد و بررسی آخرین مدل لپتاپ', keywords: ['تکنولوژی', 'لپتاپ'], slug: 'laptop-review-2024', createdAt: '۱۴۰۳/۰۲/۲۰', updatedAt: '۱۴۰۳/۰۳/۰۱', seoStatus: 'خوب', author: 'علی محمدی', authorAvatar: 'https://picsum.photos/id/1005/40/40', views: 6400 },
  { id: 106, title: '۱۰ فیلم برتر سال', keywords: ['سینما', 'فیلم'], slug: 'top-10-movies', createdAt: '۱۴۰۳/۰۲/۱۵', updatedAt: '۱۴۰۳/۰۲/۱۶', seoStatus: 'ضعیف', author: 'نازنین کریمی', authorAvatar: 'https://picsum.photos/id/1025/40/40', views: 18300 },
  { id: 107, title: 'آموزش مقدماتی پایتون', keywords: ['برنامه‌نویسی', 'پایتون'], slug: 'python-for-beginners', createdAt: '۱۴۰۳/۰۲/۱۰', updatedAt: '۱۴۰۳/۰۳/۰۵', seoStatus: 'عالی', author: 'سارا احمدی', authorAvatar: 'https://picsum.photos/id/1011/40/40', views: 11200 },
  { id: 108, title: 'چگونه یک استارتاپ موفق بسازیم؟', keywords: ['کسب و کار', 'استارتاپ'], slug: 'building-successful-startup', createdAt: '۱۴۰۳/۰۲/۰۱', updatedAt: '۱۴۰۳/۰۲/۲۵', seoStatus: 'خوب', author: 'علی محمدی', authorAvatar: 'https://picsum.photos/id/1005/40/40', views: 5250 },
  { id: 109, title: 'تاریخچه مختصری از اینترنت', keywords: ['تاریخ', 'تکنولوژی', 'اینترنت'], slug: 'history-of-internet', createdAt: '۱۴۰۳/۰۱/۲۵', updatedAt: '۱۴۰۳/۰۱/۲۵', seoStatus: 'نیاز به بهبود', author: 'رضا قاسمی', authorAvatar: 'https://picsum.photos/id/1012/40/40', views: 4100 },
  { id: 110, title: 'بهترین مقاصد سفر در تابستان', keywords: ['سفر', 'گردشگری'], slug: 'summer-travel-destinations', createdAt: '۱۴۰۳/۰۱/۲۰', updatedAt: '۱۴۰۳/۰۲/۱۰', seoStatus: 'عالی', author: 'مریم رضایی', authorAvatar: 'https://picsum.photos/id/1027/40/40', views: 15400 },
  { id: 111, title: 'راهنمای سرمایه‌گذاری در بورس', keywords: ['اقتصاد', 'بورس'], slug: 'stock-market-guide', createdAt: '۱۴۰۳/۰۱/۱۵', updatedAt: '۱۴۰۳/۰۲/۳۰', seoStatus: 'خوب', author: 'علی محمدی', authorAvatar: 'https://picsum.photos/id/1005/40/40', views: 8900 },
  { id: 112, title: 'عکاسی با موبایل برای مبتدیان', keywords: ['عکاسی', 'موبایل'], slug: 'mobile-photography-basics', createdAt: '۱۴۰۳/۰۱/۱۰', updatedAt: '۱۴۰۳/۰۱/۱۰', seoStatus: 'خوب', author: 'نازنین کریمی', authorAvatar: 'https://picsum.photos/id/1025/40/40', views: 6700 },
  { id: 113, title: 'بررسی جامع TypeScript', keywords: ['TypeScript', 'JavaScript', 'برنامه‌نویسی'], slug: 'typescript-deep-dive', createdAt: '۱۴۰۲/۱۲/۲۸', updatedAt: '۱۴۰۳/۰۳/۲۰', seoStatus: 'عالی', author: 'سارا احمدی', authorAvatar: 'https://picsum.photos/id/1011/40/40', views: 14800 },
  { id: 114, title: '۵ کتاب که باید خواند', keywords: ['کتاب', 'معرفی'], slug: '5-books-to-read', createdAt: '۱۴۰۲/۱۲/۲۰', updatedAt: '۱۴۰۲/۱۲/۲۱', seoStatus: 'نیاز به بهبود', author: 'رضا قاسمی', authorAvatar: 'https://picsum.photos/id/1012/40/40', views: 9150 },
  { id: 115, title: 'مدیریت زمان و افزایش بهره‌وری', keywords: ['موفقیت', 'مدیریت زمان'], slug: 'time-management', createdAt: '۱۴۰۲/۱۲/۱۵', updatedAt: '۱۴۰۳/۰۱/۰۵', seoStatus: 'خوب', author: 'مریم رضایی', authorAvatar: 'https://picsum.photos/id/1027/40/40', views: 6300 },
  { id: 116, title: 'ورزش در خانه بدون تجهیزات', keywords: ['ورزش', 'سلامتی'], slug: 'home-workout', createdAt: '۱۴۰۲/۱۲/۱۰', updatedAt: '۱۴۰۲/۱۲/۱۰', seoStatus: 'ضعیف', author: 'علی محمدی', authorAvatar: 'https://picsum.photos/id/1005/40/40', views: 19500 },
  { id: 117, title: 'مقدمه‌ای بر NFT و دنیای آن', keywords: ['NFT', 'کریپتو', 'Blockchain'], slug: 'what-is-nft', createdAt: '۱۴۰۲/۱۲/۰۵', updatedAt: '۱۴۰۲/۱۲/۰۶', seoStatus: 'خوب', author: 'سارا احمدی', authorAvatar: 'https://picsum.photos/id/1011/40/40', views: 8800 },
  { id: 118, title: 'چگونه خواب بهتری داشته باشیم؟', keywords: ['سلامتی', 'خواب'], slug: 'how-to-sleep-better', createdAt: '۱۴۰۲/۱۲/۰۱', updatedAt: '۱۴۰۲/۱۲/۰۱', seoStatus: 'عالی', author: 'نازنین کریمی', authorAvatar: 'https://picsum.photos/id/1025/40/40', views: 5400 },
  { id: 119, title: 'آموزش گیت و گیت‌هاب', keywords: ['گیت', 'برنامه‌نویسی', 'Git'], slug: 'git-github-tutorial', createdAt: '۱۴۰۲/۱۱/۲۵', updatedAt: '۱۴۰۳/۰۱/۱۵', seoStatus: 'عالی', author: 'رضا قاسمی', authorAvatar: 'https://picsum.photos/id/1012/40/40', views: 13200 },
  { id: 120, title: 'تفاوت UI و UX چیست؟', keywords: ['طراحی', 'UI', 'UX'], slug: 'ui-vs-ux', createdAt: '۱۴۰۲/۱۱/۲۰', updatedAt: '۱۴۰۳/۰۱/۰۲', seoStatus: 'خوب', author: 'مریم رضایی', authorAvatar: 'https://picsum.photos/id/1027/40/40', views: 9900 },
  { id: 121, title: 'آینده بازاریابی دیجیتال', keywords: ['بازاریابی', 'دیجیتال مارکتینگ'], slug: 'future-of-digital-marketing', createdAt: '۱۴۰۲/۱۱/۱۵', updatedAt: '۱۴۰۲/۱۱/۱۵', seoStatus: 'نیاز به بهبود', author: 'علی محمدی', authorAvatar: 'https://picsum.photos/id/1005/40/40', views: 4800 },
  { id: 122, title: 'معرفی زبان برنامه‌نویسی Go', keywords: ['Go', 'Golang', 'برنامه‌نویسی'], slug: 'intro-to-golang', createdAt: '1402/۱۱/۱۰', updatedAt: '۱۴۰۲/۱۲/۲۵', seoStatus: 'خوب', author: 'سارا احمدی', authorAvatar: 'https://picsum.photos/id/1011/40/40', views: 7100 },
  { id: 123, title: 'چطور یک پادکست بسازیم؟', keywords: ['پادکست', 'تولید محتوا'], slug: 'how-to-start-podcast', createdAt: '۱۴۰۲/۱۱/۰۵', updatedAt: '۱۴۰۲/۱۱/۰۶', seoStatus: 'ضعیف', author: 'نازنین کریمی', authorAvatar: 'https://picsum.photos/id/1025/40/40', views: 3850 },
  { id: 124, title: 'امنیت در وب اپلیکیشن‌ها', keywords: ['امنیت', 'وب', 'هک'], slug: 'web-app-security', createdAt: '۱۴۰۲/۱۱/۰۱', updatedAt: '۱۴۰۳/۰۲/۰۱', seoStatus: 'عالی', author: 'رضا قاسمی', authorAvatar: 'https://picsum.photos/id/1012/40/40', views: 10500 },
  { id: 125, title: 'گیاهخواری برای مبتدیان', keywords: ['سبک زندگی', 'گیاهخواری', 'سلامتی'], slug: 'vegan-for-beginners', createdAt: '۱۴۰۲/۱۰/۲۵', updatedAt: '۱۴۰۲/۱۰/۲۵', seoStatus: 'نیاز به بهبود', author: 'مریم رضایی', authorAvatar: 'https://picsum.photos/id/1027/40/40', views: 8200 },
];


export const mockMediaFiles: MediaFile[] = [
  {
    id: '1',
    name: 'منظره-کوهستان.webp',
    url: 'https://picsum.photos/id/10/400/300',
    type: 'image/webp',
    size: 1024 * 150, // 150 KB
    altText: 'منظره‌ای زیبا از کوهستان در هنگام طلوع آفتاب',
    description: 'این عکس در سفر به کوه‌های آلپ گرفته شده است.',
    createdAt: new Date('2023-07-10T10:00:00Z'),
    width: 400,
    height: 300,
  },
  {
    id: '2',
    name: 'ساحل-دریا.webp',
    url: 'https://picsum.photos/id/12/400/300',
    type: 'image/webp',
    size: 1024 * 220, // 220 KB
    altText: 'نمایی از ساحل شنی با موج‌های آرام',
    description: '',
    createdAt: new Date('2023-07-09T15:30:00Z'),
    width: 400,
    height: 300,
  },
  {
    id: '3',
    name: 'جنگل-پاییزی.webp',
    url: 'https://picsum.photos/id/22/400/300',
    type: 'image/webp',
    size: 1024 * 310, // 310 KB
    altText: 'درختان با برگ‌های رنگارنگ در فصل پاییز',
    description: 'جنگل‌های شمال در فصل پاییز بسیار دیدنی هستند.',
    createdAt: new Date('2023-07-08T09:12:00Z'),
    width: 400,
    height: 300,
  },
  {
    id: '4',
    name: 'لوگو-شرکت.svg',
    url: 'https://picsum.photos/id/30/400/300', // Placeholder, should be an SVG
    type: 'image/svg+xml',
    size: 1024 * 15, // 15 KB
    altText: 'لوگوی رسمی شرکت',
    description: 'فایل وکتور لوگو برای استفاده در وبسایت.',
    createdAt: new Date('2023-07-05T18:00:00Z'),
  },
];

export const mockCategories: Category[] = [
    { id: 1, name: 'تکنولوژی', slug: 'technology', parentId: null, description: 'آخرین اخبار و مقالات در زمینه تکنولوژی و گجت‌های روز دنیا.', postCount: 42 },
    { id: 2, name: 'برنامه‌نویسی', slug: 'programming', parentId: 1, description: 'آموزش‌ها و مقالات تخصصی برنامه‌نویسی وب و موبایل.', postCount: 18 },
    { id: 3, name: 'جاوااسکریپت', slug: 'javascript', parentId: 2, description: 'همه چیز درباره اکوسیستم جاوااسکریپت، از جمله React، Node.js و ...', postCount: 9 },
    { id: 8, name: 'پایتون', slug: 'python', parentId: 2, description: 'مقالات مرتبط با زبان پایتون و کاربردهای آن در هوش مصنوعی و وب.', postCount: 5 },
    { id: 4, name: 'سبک زندگی', slug: 'lifestyle', parentId: null, description: 'نکاتی برای بهبود کیفیت زندگی، از سلامتی تا روابط اجتماعی.', postCount: 25 },
    { id: 5, name: 'ورزش', slug: 'sports', parentId: 4, description: 'اخبار ورزشی، تحلیل مسابقات و برنامه‌های تمرینی.', postCount: 11 },
    { id: 6, name: 'آشپزی', slug: 'cooking', parentId: 4, description: 'دستورهای پخت متنوع برای انواع غذاها و دسرها.', postCount: 7 },
    { id: 7, name: 'هنر و فرهنگ', slug: 'art-and-culture', parentId: null, description: 'نقد فیلم، معرفی کتاب و بررسی رویدادهای فرهنگی و هنری.', postCount: 15 },
    { id: 9, name: 'سینما', slug: 'cinema', parentId: 7, description: 'نقد و بررسی جدیدترین فیلم‌های سینمای ایران و جهان.', postCount: 8 },
];

export const seoAnalyticsData: SeoAnalyticsDataPoint[] = [
  { date: 'هفته ۱', clicks: 400, impressions: 2400 },
  { date: 'هفته ۲', clicks: 300, impressions: 1398 },
  { date: 'هفته ۳', clicks: 200, impressions: 9800 },
  { date: 'هفته ۴', clicks: 278, impressions: 3908 },
  { date: 'هفته ۵', clicks: 189, impressions: 4800 },
  { date: 'هفته ۶', clicks: 239, impressions: 3800 },
  { date: 'هفته ۷', clicks: 349, impressions: 4300 },
];

export const mockAds: Ad[] = [
  { id: 1, advertiser: 'کافه بازار', advertiserAvatar: 'https://picsum.photos/id/40/40/40', bannerUrl: 'https://picsum.photos/id/101/200/100', agent: 'علی محمدی', placement: 'سایدبار', registeredAt: '۱۴۰۳/۰۳/۰۱', expiresAt: '۱۴۰۳/۰۴/۰۱', clicks: 1250, paidAmount: 5000000, totalAmount: 5000000, status: 'فعال' },
  { id: 2, advertiser: 'دیجی‌کالا', advertiserAvatar: 'https://picsum.photos/id/41/40/40', bannerUrl: 'https://picsum.photos/id/102/200/100', agent: 'سارا احمدی', placement: 'بالای صفحه', registeredAt: '۱۴۰۳/۰۲/۱۵', expiresAt: '۱۴۰۳/۰۳/۱۵', clicks: 3400, paidAmount: 8000000, totalAmount: 8000000, status: 'منقضی شده' },
  { id: 3, advertiser: 'اسنپ', advertiserAvatar: 'https://picsum.photos/id/42/40/40', bannerUrl: 'https://picsum.photos/id/103/200/100', agent: 'علی محمدی', placement: 'بین مطالب', registeredAt: '۱۴۰۳/۰۳/۱۰', expiresAt: '۱۴۰۳/۰۶/۱۰', clicks: 450, paidAmount: 4000000, totalAmount: 10000000, status: 'فعال' },
  { id: 4, advertiser: 'تپسی', advertiserAvatar: 'https://picsum.photos/id/43/40/40', bannerUrl: 'https://picsum.photos/id/104/200/100', agent: 'رضا قاسمی', placement: 'سایدبار', registeredAt: '۱۴۰۳/۰۳/۲۰', expiresAt: '۱۴۰۳/۰۴/۲۰', clicks: 0, paidAmount: 0, totalAmount: 4500000, status: 'در انتظار پرداخت' },
  { id: 5, advertiser: 'جابینجا', advertiserAvatar: 'https://picsum.photos/id/44/40/40', bannerUrl: 'https://picsum.photos/id/105/200/100', agent: 'سارا احمدی', placement: 'بین مطالب', registeredAt: '۱۴۰۲/۱۲/۰۱', expiresAt: '۱۴۰۳/۰۶/۰۱', clicks: 8900, paidAmount: 12000000, totalAmount: 12000000, status: 'فعال' },
];

export const mockSettings: AppSettings = {
  site: {
    siteName: 'نام سایت شما',
    siteDescription: 'یک توضیح کوتاه و جذاب در مورد وبسایت شما که در موتورهای جستجو نمایش داده می‌شود.',
    faviconUrl: '/favicon.ico',
    address: 'ایران، تهران، میدان آزادی، خیابان آزادی، پلاک ۱',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    supportPhone: '۰۹۱۲-۰۰۰-۰۰۰۰',
  },
  links: {
    permalinkStructure: 'name',
    urlPrefix: '/blog/',
    urlSuffix: '.html',
    adminLoginUrl: '/wp-admin',
    adminEmail: 'admin@example.com',
  },
  sms: {
    provider: 'kavenegar',
    apiKey: '123456789ABCDEF123456789ABCDEF',
    senderNumber: '10001',
  },
  security: {
    comingSoonMode: false,
    twoFactorAuth: true,
  },
  payment: {
    provider: 'zarinpal',
    merchantId: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  },
};

export const mockUsers: User[] = [
    { id: 1, firstName: 'علی', lastName: 'محمدی', avatar: 'https://picsum.photos/id/1005/40/40', email: 'ali.mohammadi@example.com', mobile: '09121111111', registrationDate: '۱۴۰۲/۱۰/۱۵', commentCount: 15, role: 'admin', status: 'active' },
    { id: 2, firstName: 'سارا', lastName: 'احمدی', avatar: 'https://picsum.photos/id/1011/40/40', email: 'sara.ahmadi@example.com', mobile: '09122222222', registrationDate: '۱۴۰۲/۱۱/۰۱', commentCount: 8, role: 'writer', status: 'active' },
    { id: 3, firstName: 'مریم', lastName: 'رضایی', avatar: 'https://picsum.photos/id/1027/40/40', email: 'maryam.rezaei@example.com', mobile: '09123333333', registrationDate: '۱۴۰۳/۰۱/۲۰', commentCount: 22, role: 'user', status: 'active' },
    { id: 4, firstName: 'رضا', lastName: 'قاسمی', avatar: 'https://picsum.photos/id/1012/40/40', email: 'reza.ghasemi@example.com', mobile: '09124444444', registrationDate: '۱۴۰۲/۰۵/۳۰', commentCount: 2, role: 'user', status: 'banned' },
    { id: 5, firstName: 'نازنین', lastName: 'کریمی', avatar: 'https://picsum.photos/id/1025/40/40', email: 'nazanin.karimi@example.com', mobile: '09125555555', registrationDate: '۱۴۰۳/۰۲/۰۵', commentCount: 0, role: 'support', status: 'active' },
    { id: 6, firstName: 'امیر', lastName: 'حسینی', avatar: 'https://picsum.photos/id/1013/40/40', email: 'amir.hosseini@example.com', mobile: '09126666666', registrationDate: '۱۴۰۱/۱۲/۱۲', commentCount: 31, role: 'writer', status: 'active' },
    { id: 7, firstName: 'بیتا', lastName: 'محمودی', avatar: 'https://picsum.photos/id/1028/40/40', email: 'bita.mahmoudi@example.com', mobile: '09127777777', registrationDate: '۱۴۰۳/۰۳/۱۸', commentCount: 5, role: 'user', status: 'suspended' },
    { id: 8, firstName: 'کیان', lastName: 'مهرابی', avatar: 'https://picsum.photos/id/1014/40/40', email: 'kian.mehrabi@example.com', mobile: '09128888888', registrationDate: '۱۴۰۳/۰۴/۰۱', commentCount: 1, role: 'user', status: 'active' },
    { id: 9, firstName: 'مدیر', lastName: 'سیستم', avatar: 'https://picsum.photos/id/1/40/40', email: 'admin@site.com', mobile: '09100000000', registrationDate: '۱۴۰۱/۰۱/۰۱', commentCount: 120, role: 'admin', status: 'active' },
    { id: 10, firstName: 'کاربر', lastName: 'تست', avatar: 'https://picsum.photos/id/200/40/40', email: 'test.user@example.com', mobile: '09129999999', registrationDate: '۱۴۰۲/۰۹/۰۹', commentCount: 0, role: 'user', status: 'banned' },
];

export const mockInvoices: Invoice[] = [
    { id: 1, orderNumber: 'ORD-2407-001', customerName: 'شرکت نوین پردازان', email: 'info@novin.com', phone: '09121234567', orderType: 'banner', paymentStatus: 'paid', registrationDate: '۱۴۰۳/۰۴/۰۱', expiryDate: '۱۴۰۳/۰۵/۰۱', amount: 7500000, paymentMethod: 'درگاه آنلاین', bannerUrls: ['https://picsum.photos/id/201/468/60', 'https://picsum.photos/id/202/468/60'], agentName: 'احمد کریمی', status: 'approved' },
    { id: 2, orderNumber: 'ORD-2407-002', customerName: 'فروشگاه بزرگ شهر', email: 'support@shahr.co', phone: '09159876543', orderType: 'reportage', paymentStatus: 'paid', registrationDate: '۱۴۰۳/۰۴/۰۵', expiryDate: '۱۴۰۳/۰۵/۰۵', amount: 12000000, paymentMethod: 'کارت به کارت', bannerUrls: [], agentName: 'سارا محمودی', status: 'approved' },
    { id: 3, orderNumber: 'ORD-2407-003', customerName: 'آژانس دیجیتال مارکتینگ', email: 'ads@digital.agency', phone: '09351112233', orderType: 'popup', paymentStatus: 'pending', registrationDate: '۱۴۰۳/۰۴/۱۰', expiryDate: '۱۴۰۳/۰۵/۱۰', amount: 5000000, paymentMethod: 'نامشخص', bannerUrls: [], agentName: 'رضا قاسمی', status: 'pending_approval' },
    { id: 4, orderNumber: 'ORD-2407-004', customerName: 'استارتاپ فین‌تک', email: 'contact@fintech.dev', phone: '09194445566', orderType: 'text', paymentStatus: 'paid', registrationDate: '۱۴۰۳/۰۴/۱۲', expiryDate: '۱۴۰۳/۰۵/۱۲', amount: 3000000, paymentMethod: 'درگاه آنلاین', bannerUrls: [], agentName: 'مریم حسینی', status: 'approved' },
    { id: 5, orderNumber: 'ORD-2407-005', customerName: 'آموزشگاه آنلاین زبان', email: 'learn@language.io', phone: '09117778899', orderType: 'banner', paymentStatus: 'failed', registrationDate: '۱۴۰۳/۰۴/۱۵', expiryDate: '۱۴۰۳/۰۵/۱۵', amount: 6000000, paymentMethod: 'درگاه آنلاین', bannerUrls: ['https://picsum.photos/id/203/728/90'], agentName: 'علی جعفری', status: 'rejected' },
];

export const mockIncomeData: Record<string, IncomeData[]> = {
    monthly: [
        { name: 'هفته ۱', income: 12500000 },
        { name: 'هفته ۲', income: 8000000 },
        { name: 'هفته ۳', income: 15200000 },
        { name: 'هفته ۴', income: 11000000 },
    ],
    threeMonths: [
        { name: 'اردیبهشت', income: 45000000 },
        { name: 'خرداد', income: 62000000 },
        { name: 'تیر', income: 51500000 },
    ],
    sixMonths: [
        { name: 'بهمن', income: 38000000 },
        { name: 'اسفند', income: 55000000 },
        { name: 'فروردین', income: 48000000 },
        { name: 'اردیبهشت', income: 45000000 },
        { name: 'خرداد', income: 62000000 },
        { name: 'تیر', income: 51500000 },
    ],
    yearly: [
        { name: 'تابستان', income: 150000000 },
        { name: 'پاییز', income: 180000000 },
        { name: 'زمستان', income: 210000000 },
        { name: 'بهار', income: 155000000 },
    ]
};

export const mockCopywritingTasks: CopywritingTask[] = [
  { id: 1, copywriterName: 'سارا احمدی', copywriterAvatar: 'https://picsum.photos/id/1011/40/40', topic: 'بررسی جامع TypeScript', requiredChars: 5000, progress: 100, createdAt: '۱۴۰۳/۰۴/۰۱', deadline: '۱۴۰۳/۰۴/۱۰', status: 'completed' },
  { id: 2, copywriterName: 'علی محمدی', copywriterAvatar: 'https://picsum.photos/id/1005/40/40', topic: 'آینده بازاریابی دیجیتال', requiredChars: 3500, progress: 85, createdAt: '۱۴۰۳/۰۴/۰۵', deadline: '۱۴۰۳/۰۴/۱۵', status: 'in_progress' },
  { id: 3, copywriterName: 'مریم رضایی', copywriterAvatar: 'https://picsum.photos/id/1027/40/40', topic: 'گیاهخواری برای مبتدیان', requiredChars: 4000, progress: 100, createdAt: '۱۴۰۳/۰۴/۰۲', deadline: '۱۴۰۳/۰۴/۱۲', status: 'review' },
  { id: 4, copywriterName: 'رضا قاسمی', copywriterAvatar: 'https://picsum.photos/id/1012/40/40', topic: 'امنیت در وب اپلیکیشن‌ها', requiredChars: 6000, progress: 40, createdAt: '۱۴۰۳/۰۴/۰۸', deadline: '۱۴۰۳/۰۴/۲۵', status: 'in_progress' },
  { id: 5, copywriterName: 'امیر حسینی', copywriterAvatar: 'https://picsum.photos/id/1013/40/40', topic: 'چگونه یک استارتاپ موفق بسازیم؟', requiredChars: 4500, progress: 10, createdAt: '۱۴۰۳/۰۴/۱۴', deadline: '۱۴۰۳/۰۴/۳۰', status: 'halted' },
  { id: 6, copywriterName: 'سارا احمدی', copywriterAvatar: 'https://picsum.photos/id/1011/40/40', topic: 'معرفی زبان برنامه‌نویسی Go', requiredChars: 3000, progress: 100, createdAt: '۱۴۰۳/۰۳/۲۰', deadline: '۱۴۰۳/۰۴/۰۵', status: 'completed' },
];
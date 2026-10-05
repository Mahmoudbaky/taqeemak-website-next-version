/** Standard API envelope returned by every Taqeemak backend endpoint. */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Auth Types
export interface RegisterRequest {
  nameAr: string;
  nameEn: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  record: string;
  companyName?: string;
}

export interface Customer {
  Cu_ID: string;
  Cu_Date: string | null;
  Cu_NameAr: string;
  Cu_NameEn: string;
  Cu_EMail: string;
  Cu_Mobile: string;
  Cu_Address: string;
  Cu_Record: string;
  Cu_Logo: string | null;
  Cu_ProfilePhoto: string | null;
  Cu_MobileConfirm: boolean;
  Cu_EMailConfirm: boolean;
  Cu_IsHold: boolean;
  Cu_IsActive: boolean;
}

/** Backend returns customer + accessToken; refreshToken is set in HTTP-only cookie */
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    customer: Customer;
    accessToken: string;
  };
  timestamp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/** Backend returns customer + accessToken; refreshToken is set in HTTP-only cookie */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    customer: Customer;
    accessToken: string;
  };
  timestamp: string;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: Customer;
  timestamp: string;
}

/** Optional; backend reads refreshToken from HTTP-only cookie, so body can be empty */
export interface LogoutRequest {
  refreshToken?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data: null;
  timestamp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Backend returns only accessToken; new refreshToken is set in HTTP-only cookie */
export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
  timestamp: string;
}

export interface EmailOrMobileVerificationCodeRequest {
  email?: string;
  mobile?: string;
  customerId: string;
}

export interface EmailOrMobileVerificationCodeResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface VerifyEmailOrMobileVerificationCodeRequest {
  email?: string;
  mobile?: string;
  otp: string;
}

export interface VerifyEmailOrMobileVerificationCodeResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface UpdateProfileRequest {
  mobile: string;
  email: string;
  record?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: Customer;
  timestamp: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data: null;
  timestamp: string;
}

// Product Types
export interface Currency {
  Cr_ID: number;
  Cr_NameAr: string;
  Cr_NameEn: string;
  Cr_IsActive: boolean;
}

export enum ProductType {
  DEVICE = 'device',
  CERTIFICATE = 'certificate',
}

export interface ProductItem {
  Pr_ID: string;
  Pr_NameAr: string;
  Pr_NameEn: string;
  Pr_DescriptionAr: string;
  Pr_DescriptionEn: string;
  Pr_Price: string;
  Pr_CurrencyID: number;
  Pr_Photos: string[];
  Pr_Is_Hold: boolean;
  Pr_IsActive: boolean;
  Pr_Type: ProductType;
  Pr_CreateAt: string;
  Pr_UpdateAt: string;
  Pr_UpdateBy: string;
  Pr_CreateBy: string;
  Currencies: Currency;
}

export interface ProductsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetProductsResponse {
  success: boolean;
  message: string;
  data: {
    items: ProductItem[];
    meta: ProductsMeta;
  };
  timestamp: string;
}

// Order Types
export interface CreateOrderRequest {
  customerId: string;
  productId: string;
  price: number;
  currencyId: number;
  qty: number;
  person: string;
  recDate: string;
  isProcess: boolean;
  isActive: boolean;
}

export interface Order {
  Or_ID: string;
  Or_Date: string;
  Or_CustomerID: string;
  Or_ProductId: string;
  Or_Price: string;
  Or_CurrencyID: number;
  Or_Qty: number;
  Or_Total: string;
  Or_Person: string;
  Or_RecDate: string;
  Or_IsProcess: boolean;
  Or_IsActive: boolean;
  Customers: Customer;
  Products: ProductItem;
  Currencies: Currency;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: Order;
  timestamp: string;
}

// Customer Order (from GET /api/v1/orders/customer/{customerId})
export interface CustomerOrder {
  Or_ID: string;
  Or_No: string;
  Or_Date: string;
  Or_CustomerID: string;
  Or_ProductId: string;
  Or_Price: string;
  Or_CurrencyID: number;
  Or_Qty: number;
  Or_Total: string;
  Or_Person: string;
  Or_RecDate: string;
  Or_Status: "PENDING" | "PROCESSING" | "SHIPPED" | "COMPLETED" | "DELIVERED" | "CANCELED" | "CANCELLED";
  /** Present for device orders */
  Shipment?: OrderShipment | null;
}

/** Tracking info included with customer orders (device orders only) */
export interface OrderShipment {
  Sh_Status: string;
  Sh_Courier: string | null;
  Sh_TrackingNo: string | null;
  Sh_TrackingUrl: string | null;
  Sh_City: string;
  Sh_ShippedAt: string | null;
  Sh_DeliveredAt: string | null;
}

export interface GetCustomerOrdersResponse {
  success: boolean;
  message: string;
  data: CustomerOrder[];
  timestamp: string;
}

// Customer Payment (from GET /api/v1/payments/customer/{customerId})
export interface CustomerPayment {
  Pa_ID: string;
  Pa_No: string;
  Pa_Date: string;
  Pa_CustomerID: string;
  Pa_OrderID: string;
  Pa_Amount: string;
  Pa_CurrencyID: number;
  Pa_MethodID: number;
  Pa_Photo: string | null;
  Pa_CreateAt: string;
  Pa_CreateBy: string;
  Pa_IsActive: boolean;
  Orders: {
    Products: {
      Pr_Photos: string[];
    };
  };
  Customers: {
    Cu_NameEn: string;
    Cu_NameAr: string;
  };
}

export interface GetCustomerPaymentsResponse {
  success: boolean;
  message: string;
  data: CustomerPayment[];
  timestamp: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  timestamp?: string;
}

export enum TicketCategory {
  BILLING = 1,
  SUPPORT = 2,
  GENERAL = 3,
}

// Ticket Types
export interface CreateTicketRequest {
  customerId: string;
  crName: string;
  subject: string;
  problem: string;
  category: string;
  priority: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  attach?: string;
  isActive?: boolean;
}

export interface Ticket {
  Ti_ID: string;
  Ti_No: string;
  Ti_Category: string;
  Ti_Priority: string;
  Ti_CustomerID: string;
  Ti_CrName: string;
  Ti_Subject: string;
  Ti_Problem: string;
  Ti_Attach: string | null;
  Ti_Response: string | null;
  Ti_ActionAt: string | null;
  Ti_ActionBy: string | null;
  Ti_Status: number;
  Ti_IsActive: boolean;
  Ti_CreateAt: string;
  Ti_UpdateAt: string | null;
  Ti_UpdateBy: string | null;
  Customers: Customer;
}

export interface CreateTicketResponse {
  success: boolean;
  message: string;
  data: Ticket;
  timestamp: string;
}

// Customer Ticket (from GET /api/v1/tickets/customer/{customerId})
export interface CustomerTicket {
  Ti_ID: string;
  Ti_No: string;
  Ti_Category: "BILLING" | "SUPPORT" | "GENERAL";
  Ti_Priority: "LOW" | "HIGH" | "CRITICAL";
  Ti_CustomerID: string;
  Ti_CrName: string;
  Ti_Subject: string;
  Ti_Problem: string;
  Ti_Attach: string | null;
  Ti_Response: string | null;
  Ti_ActionAt: string | null;
  Ti_ActionBy: string | null;
  Ti_Status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  Ti_IsActive: boolean;
  Ti_CreateAt: string;
  Ti_UpdateAt: string | null;
  Ti_UpdateBy: string | null;
}

export interface GetCustomerTicketsResponse {
  success: boolean;
  message: string;
  data: CustomerTicket[];
  timestamp: string;
}

// Message Types (Contact form - public)
export interface CreateMessageRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Message {
  Me_ID: string;
  Me_Date: string;
  Me_Name: string;
  Me_EMail: string;
  Me_Phone: string;
  Me_Message: string;
  Me_IsRead: boolean;
  Me_Response: string | null;
  Me_ActionAt: string | null;
  Me_ActionBy: string | null;
}

export interface CreateMessageResponse {
  success: boolean;
  message: string;
  data: Message;
  timestamp: string;
}

// Online payment (Moyasar)
export interface OnlineCheckoutRequest {
  productId: string;
  qty: number;
  person: string;
  recDate: string;
  /** Required for device products */
  shipping?: ShippingAddress;
}

// Shipping (OTO)
export interface ShippingAddress {
  receiverMobile: string;
  city: string;
  district: string;
  street: string;
  buildingNo?: string;
  postalCode?: string;
  /** Saudi National Address short code, e.g. RGUC8214 */
  shortAddress?: string;
}

export interface ShippingConfigResponse {
  success: boolean;
  message: string;
  data: { fee: number; currency: string };
  timestamp: string;
}

export interface NationalAddressResponse {
  success: boolean;
  message: string;
  data: {
    city?: string;
    district?: string;
    street?: string;
    buildingNo?: string;
    postalCode?: string;
    shortAddress?: string;
    formatted?: string;
  };
  timestamp: string;
}

export interface OnlineCheckoutResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
    gatewayRef: string;
    /** Hosted invoice page (redirect flow) */
    paymentUrl: string;
    /** Embedded form for the same invoice; absent on older backends */
    paymentForm?: MoyasarPaymentForm;
  };
  timestamp: string;
}

export interface MoyasarPaymentForm {
  invoiceId: string;
  /** Smallest currency unit (halalas) */
  amount: number;
  currency: string;
  description: string;
  /** Null when the backend has no publishable key configured — use paymentUrl instead */
  publishableKey: string | null;
}

export type OnlinePaymentStatus = 'PENDING' | 'PAID' | 'CANCELED' | 'FAILED';

export interface OnlinePaymentStatusResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
    status: OnlinePaymentStatus;
    productType: string;
    message?: string;
  };
  timestamp: string;
}

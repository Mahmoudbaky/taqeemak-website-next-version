// The package's "exports" map hides its bundled d.ts (which also references an undeclared namespace),
// so we declare the subset of the API we use. Options: https://docs.moyasar.com/guides/references/form-configuration
declare module "moyasar-payment-form" {
  export interface MoyasarInitConfig {
    element: string | HTMLElement;
    /** Smallest currency unit (halalas) */
    amount: number;
    currency: string;
    description: string;
    publishable_api_key: string;
    callback_url: string;
    invoice_id?: string;
    language?: "ar" | "en";
    methods?: ("creditcard" | "applepay" | "stcpay" | "samsungpay")[];
    supported_networks?: ("mada" | "visa" | "mastercard" | "amex" | "unionpay")[];
    fixed_width?: boolean;
    /** Required when methods include "applepay" */
    apple_pay?: {
      country: string;
      /** English characters only */
      label: string;
      validate_merchant_url?: string;
      supported_countries?: string[];
    };
    /** Required when methods include "samsungpay" */
    samsung_pay?: {
      /** Samsung Pay merchant service ID */
      service_id: string;
      order_number: string;
      country: string;
      label: string;
      /** Defaults to PRODUCTION */
      environment?: "PRODUCTION" | "STAGE";
    };
    metadata?: Record<string, string>;
    on_completed?: (payment: { id: string; status: string }) => Promise<void>;
  }

  export default class Moyasar {
    static init(config: MoyasarInitConfig): void;
    static setAmount(amount: number): void;
  }
}

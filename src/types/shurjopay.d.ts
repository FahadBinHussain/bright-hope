declare module 'shurjopay' {
  interface ShurjopayInstance {
    config(
      endpoint: string,
      username: string,
      password: string,
      prefix: string,
      returnUrl: string
    ): void;
    
    makePayment(
      paymentData: {
        amount: number;
        order_id: string;
        currency?: string;
        customer_name: string;
        customer_address: string;
        customer_phone: string;
        customer_city: string;
        customer_post_code: string;
        client_ip: string;
        value1?: string;
        value2?: string;
        value3?: string;
        value4?: string;
      },
      successCallback: (data: any) => void,
      errorCallback: (error: any) => void
    ): void;
    
    verifyPayment(
      orderId: string,
      successCallback: (data: any) => void,
      errorCallback: (error: any) => void
    ): void;
  }
  
  export default function createShurjopayInstance(): ShurjopayInstance;
} 
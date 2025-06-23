export default interface PaymentResponse {
    payment_id: number;
    member_id: number;
    amount: number;
    is_delete:boolean;
    transaction_id: string;
    created_on: Date | null; 
    updated_on: Date |null;
    status:string; 
};
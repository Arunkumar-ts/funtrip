export default interface PaymentResponse {
    payment_id: number;
    member_id: number;
    amount: number;
    transaction_id: string;
    created_on: string;
    updated_on: string;
    status: string;
}

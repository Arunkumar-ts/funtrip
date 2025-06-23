export default interface MemberResponse {
    member_id: number;
    member_name: string;
    email: string;
    phone_no: string | null;
    is_delete: boolean;
    created_on: Date | null; 
    updated_on: Date | null; 
};
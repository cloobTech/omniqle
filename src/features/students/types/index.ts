export interface IStudentDetails {
  id: number;
  person_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  grade_id: number;
  grade_name: string;
  school_identifier: string;
  verification_status: string;
  photo: string | null;
  created_at: string; // ISO date string
  membership_details: {
    id: number;
    status: string; // e.g., "pending"
    additional_roles: string[]; // Array of additional roles
  };
  person_details: {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    date_of_birth: string; // ISO date string
    gender: string; // e.g., "male" or "female"
    title: string | null;
    marital_status: string | null;
    religion: string | null;
    nationality: string | null;
    nin: string | null; // National Identification Number
    aws_rekognition_face_id: string | null;
    picture_url: string | null;
    primary_email: string | null;
    primary_phone: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state_province: string | null;
    postal_code: string | null;
    country: string | null;
    lga_county: string | null; // Local Government Area or County
    verification_status: string; // e.g., "verified", "unverified"
  };
}

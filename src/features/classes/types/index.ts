export interface IClassroomDetails {
  id: number;
  level: number;
  name: string;
  school_id: number;
  class_teacher: string | null;
  class_prefect: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  pagination: {
    total_count: number;
    total_pages: number;
    current_page: number;
    limit_value: number;
  };
  statistics: {
    total_students: number;
    gender_distribution: {
      male: {
        count: number;
        percentage: number;
      };
      female: {
        count: number;
        percentage: number;
      };
    };
    average_student_age: number | null;
    age_range: {
      min: number | null;
      max: number | null;
    };
  };
  students: []; // Assuming you already have a `Student` interface
}

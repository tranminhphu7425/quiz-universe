export interface JobPosition {
  id: string;
  title: string;
  type: "full-time" | "part-time" | "remote" | "contract";
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface BenefitItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  position: string;
  introduction: string;
  cvLink: string;
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  experience: string;
  matchScore: number;
  stage: string;
  avatar?: string;
  skills?: string[];
  email?: string;
  phone?: string;
  lastActivity?: string;
}

interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  openPositions: number;
  hiringManager: string;
  totalApplicants: number;
  status: 'open' | 'closed' | 'hold';
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface User {
  name: string;
  role: string;
  email: string;
  image?: string;
}

export type {
  Candidate,
  JobData,
  Notification,
  User
}
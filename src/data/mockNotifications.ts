import { Notification } from "@/types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New candidate applied",
    description: "John Doe applied for Frontend Developer role",
    time: "2 min ago",
  },
  {
    id: "2",
    title: "Interview scheduled",
    description: "Interview scheduled with Sarah for tomorrow",
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Offer sent",
    description: "Offer sent to Alex for Backend Engineer role",
    time: "3 hours ago",
  },
];

export default mockNotifications;
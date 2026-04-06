import { Briefcase, MapPin, Users } from 'lucide-react';
import mockJobs from "@/data/mockJobs"

export function JobOverview() {
  const jobData = mockJobs[0];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-1">{jobData.title}</h3>
        <p className="text-muted-foreground">{jobData.department}</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-1">{jobData.location}</h3>
        <p className="text-muted-foreground">{jobData.openPositions} Open Positions</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-1">{jobData.totalApplicants}</h3>
        <p className="text-muted-foreground">Total Applicants</p>
      </div>
    </div>
  );
}

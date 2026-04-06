import { Briefcase, MapPin, Users } from 'lucide-react';
import mockJobs from "@/data/mockJobs"

export function JobOverview() {
  const jobData = mockJobs[0];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow flex gap-4 flex-row">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="">
          <h3 className="text-2xl font-semibold sm:mb-0 md:mb-1">{jobData.title}</h3>
          <p className="text-muted-foreground">{jobData.department}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow flex gap-4 flex-row">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="">
          <h3 className="text-2xl font-semibold mb-1">{jobData.location}</h3>
          <p className="text-muted-foreground">{jobData.openPositions} Open Positions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow flex gap-4 flex-row">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="">
          <h3 className="text-2xl font-semibold mb-1">{jobData.totalApplicants}</h3>
          <p className="text-muted-foreground">Total Applicants</p>
        </div>
      </div>
    </div>
  );
}

type MapType = Record<string, string>;

export default function getPageTitle(path: string): string {
  const map: MapType = {
    "/": "Candidates Pipelines",
    "/jobs": "Jobs",
    "/jobs/add": "Add Job",
    "/candidates": "Candidates",
    "/candidates/add": "Add Candidate",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  return map[path] || "Dashboard";
}
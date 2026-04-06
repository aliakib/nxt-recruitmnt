  const getBreadcrumbs = (activeView: string) => {
    if (activeView === '') return ['Dashboard', 'Jobs', 'Candidate Pipeline'];
    if (activeView === 'jobs') return ['Dashboard', 'Jobs'];
    if (activeView === 'jobs/add') return ['Dashboard', 'Jobs', "Add Job"];
    if (activeView === 'candidates') return ['Dashboard', 'Candidates'];
    if (activeView === 'candidates/add') return ['Dashboard', 'Candidates', "Add Candidate"];
    if (activeView === 'reports') return ['Dashboard', 'Reports'];
    if (activeView === 'settings') return ['Dashboard', 'Settings'];
    return ['Dashboard'];
  };

  export default getBreadcrumbs;
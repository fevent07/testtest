// const sendResponse = (res, totalJobs, currentPage, goals) => {
//     res.status(200).json({
//       totalJobs: totalJobs,
//       currentPage: currentPage,
//       goals: goals
//     });
//   };
  
//   module.exports = {
//     sendResponse
//   };


  const sendResponse = (res, totalJobs, currentPage, jobs) => {
    const jobsCount = jobs.length;
    res.status(200).json({
      totalJobs,
      currentPage,
      jobsCount,
      jobs
    });
  };
  
  module.exports = {
    sendResponse
  };
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


  const sendResponse = (res, totalJobs, currentPage, goals) => {
    const goalsCount = goals.length;
    res.status(200).json({
      totalJobs,
      currentPage,
      goalsCount,
      goals
    });
  };
  
  module.exports = {
    sendResponse
  };
export const getJobsByCategory = async (category) => {
  const res = await fetch(
    `https://job-hunter-server-two.vercel.app/jobs?category=${category}`
  );
  return res.json();
};

export const getAllCategories = async () => {
  const res = await fetch(
    "https://job-hunter-server-two.vercel.app/categories"
  );
  return res.json();
};

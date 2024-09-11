export const getJobsByCategory = async (category)=>{
    const res = await fetch(`http://localhost:5000/jobs?category=${category}`);
    return res.json();
}
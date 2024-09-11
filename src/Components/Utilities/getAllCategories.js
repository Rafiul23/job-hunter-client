export const getAllCategories = async () =>{
    const res = await fetch('http://localhost:5000/categories');
    return res.json();
} 
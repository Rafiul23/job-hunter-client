export const getAllCategories = async () =>{
    const res = await fetch('../../../public/categories.json');
    return res.json();
} 
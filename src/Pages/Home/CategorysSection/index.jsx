import React, { useEffect, useState } from 'react'
import fetchData from '../../../Utils/fetchData';
import CategoryCard from './CategoryCard';

export default function categorySection() {
    const [categories,setCategories]=useState();
    useEffect(()=>{
        (async()=>{
            const result=await fetchData("categories?limit=10&page=1");
            setCategories(result.data);
        })();
    },[]);
    const items=categories.map((item)=>(
        <CategoryCard
        id={item._id}
        image={item.image}
        title={item.title}
        keu={item._id}
         />
    ));
  return (
    <div>
      <h2>category</h2>
      <div>{items}</div>
    </div>
  )
}

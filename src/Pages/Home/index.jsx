import React from 'react'
import Loading from '../../Components/Loading'
import DiscountProduct from './DiscountProduct'
import MainSlider from './MainSlider'
import CategoryCard from './CategorysSection/CategoryCard'

export default function Home() {
  return (
    <div>
     <>
  <MainSlider />
  <CategoryCard />
  <DiscountProduct />
</>
    </div>
  )
}

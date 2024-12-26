import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header'
import OurMenu from '../../components/OurMenu/OurMenu'
import './Home.css'

import React, { useState } from 'react'

function Home({searchQuery}) {

    const [category, setCategory] = useState('All');

  return (
    <div>
        <Header />
        <OurMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    </div>
  )
}

export default Home

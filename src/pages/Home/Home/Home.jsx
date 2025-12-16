import React from 'react'
import Banner from '../Banner/Banner'
import Brand from '../Brands/Brand'
import Review from '../Review/Review'
import Feature from '../Feature/Feature'
import How from '../How/How'
import Latest from '../Latest/Latest'

const reviewPromise = fetch('/reviews.json').then(res => res.json())

function Home() {
  return (
    <div>
      <Banner/>
      <Feature/>
      <How/>
      <Latest/>
      <Review reviewPromise={reviewPromise}/>
      <Brand/>
    </div>
  )
}

export default Home

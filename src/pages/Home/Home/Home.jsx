import React from 'react'
import Banner from '../Banner/Banner'
import Service from '../Service/Service'
import Brand from '../Brands/Brand'
import Review from '../Review/Review'
import Feature from '../Feature/Feature'
import How from '../How/How'

const reviewPromise = fetch('/reviews.json').then(res => res.json())
const servicePromise = fetch('/services.json').then(res => res.json())

function Home() {
  return (
    <div>
      <Banner/>
      <Feature/>
      <How/>
      <Brand/>
      <Review reviewPromise={reviewPromise}/>
    </div>
  )
}

export default Home

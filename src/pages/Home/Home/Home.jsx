import React from 'react'
import Banner from '../Banner/Banner'
import Service from '../Service/Service'
import Brand from '../Brands/Brand'
import Review from '../Review/Review'

const reviewPromise = fetch('/reviews.json').then(res => res.json())
const servicePromise = fetch('/services.json').then(res => res.json())

function Home() {
  return (
    <div>
      <h2>Home text</h2>
      <Banner/>
      <Service servicePromise={servicePromise} />
      <Brand/>
      <Review reviewPromise={reviewPromise}/>
    </div>
  )
}

export default Home

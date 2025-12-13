import React from 'react'
import { Link } from 'react-router'

function PaymentCancell() {
  return (
    <div>
      <h2> Payment is cancelled </h2>
      <Link to="/dashboard/my-parcels"> Try Again </Link>
    </div>
  )
}

export default PaymentCancell

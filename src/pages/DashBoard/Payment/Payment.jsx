import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiousS from '../../../hooks/useAxiousS';


function Payment() {
    // const name = 'data';
    const navigate = useNavigate();
    const { parcelId } = useParams();
    const axiosS = useAxiousS();
    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosS.get(`parcels/${parcelId}`)
            return res.data
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        };

        const res = await axiosS.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url
    }



    if (isLoading) {
        return <div>
            <span className='loading loading-infinity loading-xl'> </span>
        </div>
    }


    return (
        <div>
            {
                parcel.parcelName

            } <br />
            {

                parcel.cost
            }
            <br />

            <button className=' btn btn-outline' onClick={handlePayment}> pay </button>
        </div>
    )
}

export default Payment

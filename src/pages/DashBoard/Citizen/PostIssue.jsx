
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosS from '../../../hooks/useAxiousS';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router';
import { Bars } from 'react-loader-spinner';


function PostIssue() {
  const navigate = useNavigate();
  const axiousS = useAxiosS();
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();

  const serviceCenter = useLoaderData();
  const { data: userStatus = {}, isLoading: statusLoading, refetch } = useQuery({
    queryKey: ['userStatus', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiousS.get(`/users/status/${user.email}`);
      return res.data; // { issueCount: 0, subscript: false }
    }
  });

  console.log(userStatus);

  const { issueCount = 0, subscription } = userStatus;
  const MAX_FREE_ISSUES = 3;
  const isFreeLimitReached = !subscription && issueCount >= MAX_FREE_ISSUES;

  console.log(subscription);

  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const regionsDuplicate = serviceCenter.map(c => c.region);
  const regionsOne = [...new Set(regionsDuplicate)];

  const districtsByRegion = (senderRegion) => {
    const location = serviceCenter.filter(c => c.region === senderRegion);
    return location.map(d => d.district);
  };

  const handlePostIssue = (data) => {

    axiousS.post('/issues', data)
      .then(res => {
        if (res.data.insertedId && !subscription) {
          axiousS.patch(`/users/increment-issue-count/${user.email}`)
            .then(() => {
              refetch();
            })
        }

        Swal.fire({
          icon: "success",
          title: "Issue Reported Successfully!",
          text: "You will be redirected to My Issues page.",
          showConfirmButton: false,
          timer: 2000
        });

        // reset();
        navigate('');
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while posting the issue!",
          footer: `<p>${err.message}</p>`
        });
      })
  }

  const handlePostIssueLimit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Limit Reached",
      text: `As a Free User, you have reached the maximum limit of ${MAX_FREE_ISSUES} reported issues. Please subscribe to Premium to report unlimited issues.`,
      footer: '<Link to="/dashboard/profile">Go to Profile to Subscribe</Link>',
      confirmButtonText: 'Go to Profile'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/dashboard/profile');
      }
    });
  }

  if (statusLoading) {
    return <div className='flex justify-center items-center h-screen'><Bars
      height="40"
      width="40"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /></div>
  }


  return (
    <div className='pl-8'>
      <h2>Send Post of Issue</h2>

      {isFreeLimitReached && (
        <div className="alert alert-warning mb-6">
          <span className="font-bold">⚠️ Issue Limit Reached!</span>
          <p>You have posted {issueCount} out of {MAX_FREE_ISSUES} issues. Please <button onClick={() => navigate('/dashboard/profile')} className="btn btn-sm btn-link p-0">Subscribe to Premium</button> for unlimited posts.</p>
        </div>
      )}

      <form onSubmit={isFreeLimitReached ? handlePostIssueLimit : handleSubmit(handlePostIssue)}>
        <div className=''>
          <fieldset className="fieldset">
            <label className="fieldset-legend">Issue title</label>
            <input type="text" className="input w-full" placeholder="Issue title" {...register('title')} />
          </fieldset>
          <fieldset className="fieldset">
            <label className="fieldset-legend">Issue Image</label>
            <input type="text" className="input w-full" placeholder="Img Url" {...register('image')} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Select Categores
            </legend>
            <select {...register('category')} className="select">
              <option disabled selected>All Categores</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Utilities">Utilities</option>
              <option value="Traffic">Traffic</option>
              <option value="Noise Pollution">Noise Pollution</option>
            </select>
          </fieldset>
          <div>
            <fieldset className="fieldset">
              <label className="fieldset-legend"> Email </label>
              <input type="email" className="input w-full" placeholder={user?.email} defaultValue={user?.email} readOnly {...register('authorEmail')} />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Issue Region</legend>
              <select {...register('senderRegion')} className="select">
                <option disabled selected>Issue a Region</option>
                {regionsOne.map((c, i) => <option key={i}>{c}</option>)}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Issue District</legend>
              <select
                // key={senderRegion}   // FIX: prevents reset issues
                {...register('location')}
                className="select"
              >
                <option disabled selected>Issue a District</option>
                {districtsByRegion(senderRegion)?.map((c, i) =>
                  <option key={i}>{c}</option>
                )}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="fieldset-legend">Issue description</label>
              <textarea className="input w-full" placeholder="Issue description" {...register('description')} />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className={`btn ${isFreeLimitReached ? 'btn-warning' : 'btn-primary'} text-black`}
          value={isFreeLimitReached ? 'Subscribe to Post' : 'Post Issue'}
        // যদি limit পার হয়, তবে Post বাটনে ক্লিক করলে limit reached warning দেখাবে
        />
      </form>

    </div>
  );
}

export default PostIssue;
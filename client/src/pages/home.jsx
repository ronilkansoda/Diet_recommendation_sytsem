import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/card';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import pic1 from '../styles/pic1.png'

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentData } = useSelector((state) => state.personalisedData)

  const [data, setData] = useState([]);
  const [personalisedData, setPersonalisedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/input/getRandomData', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        console.log('Fetched Data:', result);
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setData([result]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPersonalisedData = async () => {
      try {
        const res = await fetch(`/api/input/getPersonalised/${currentData.user_input_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        console.log('Fetched Data:', result);
        if (Array.isArray(result)) {
          setPersonalisedData(result);
        } else {
          setPersonalisedData([result]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
    if(currentData){
      fetchPersonalisedData()
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className='flex w-full justify-center items-center bg-slate-600 text-white h-12'>Hey&nbsp;<span className='bg-yellow-400 text-black p-1 rounded-lg text-xl'> {currentUser ? " " + currentUser.username : 'Admin'}</span>&nbsp;,How you doin??<span><img src={pic1} className='h-11' /></span></h1>

      <div className="gyan_1 flex flex-col justify-center items-center m-6 w-full">
        <div className="innerGyan1 flex justify-center items-center flex-col w-3/5 bg-amber-500 rounded-2xl">
          <p className='font-sans'>This is Your</p>
          <div className='text-xl font-sans'>Personalised Diet suggestions</div>
        </div>
      </div>

      <div className="border border-black">
        <div className="personalisedCards flex flex-wrap">
          {personalisedData.length > 0 ? (
            personalisedData.slice(0, 3).map((foodItem) => (
              <Card key={foodItem.food_id} props={foodItem} />
            ))
          ) : (
            <div>Insufficient Personalised Data available</div>
          )}
        </div>

        <div className="personalisedBtn m-5 bg-slate-200 p-2" style={{ width: "100%", display: "flex", justifyContent: 'space-evenly' }}>
          <div className="personalisedTitle text-xl">{currentData && currentData ? "Update Data For Personalised Diet Plans : " : "Give Data For Personalised Diet Plans : "}
          </div>
          <Link to={"/details"}>
            <button className='bg-blue-400 p-1 rounded-lg text-lg'>{currentData && currentData ? "Update Data" : "Add Data"}</button>
          </Link>
        </div>

      </div>

      <div className="gyan_1 flex flex-col justify-center items-center m-6 w-full">
        <div className="innerGyan1 flex justify-center items-center flex-col w-3/5 bg-red-500 rounded-2xl">
          <p className='font-sans'>This is Your</p>
          <div className='text-xl font-sans'>Random Diet suggestions</div>
        </div>
      </div>

      <div className="dietPlans border border-black">
        {data.length > 0 ? (
          data.slice(0, 3).map((foodItem) => (
            <Card key={foodItem.food_id} props={foodItem} />
          ))
        ) : (
          <div>Insufficient data available</div>
        )}
      </div>

    </div>
  );
}

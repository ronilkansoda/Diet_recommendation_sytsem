import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { personalisedDataFetchFailure, personalisedDataFetchStart, personalisedDataFetchSuccess, resetData } from '../../redux/user/personalisedDataSlice';


export default function DetailsForm() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { currentData } = useSelector((state) => state.personalisedData)

    const [selectedGoal, setSelectedGoal] = useState(currentData && currentData.u_diet_goal ? currentData.u_diet_goal : '');
    const [selectedPlan, setSelectedPlan] = useState(currentData && currentData.u_diet_plan ? currentData.u_diet_plan : '');
    const [selectedvegN, setSelectedvegN] = useState(currentData && currentData.veg_non ? currentData.veg_non : '');


    // const [err, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.id]: e.target.value });
        const updatedFormData = { ...formData, user_input_id: currentUser.id, [e.target.id]: e.target.value };
        setFormData(updatedFormData);
        console.log(updatedFormData);
    };

    const handlePlanChange = (event) => {
        setSelectedGoal(event.target.value);
        handleChange(event);
    };

    const handleRadioChange = (plan) => {
        setSelectedPlan(plan);
        setFormData({ ...formData, u_Diet_plan: plan });
    };

    const handleVegChange = (plan) => {
        setSelectedvegN(plan);
        setFormData({ ...formData, veg_non: plan });
    };
    const handleDeleteData = () => {
        dispatch(resetData())
    }

    // const handleSubmit = async (e,id) => {
    //     // setFormData({ ...formData, user_input_id: currentUser.id });
    //     e.preventDefault();

    //     try {
    //         // setLoading(true);
    //         dispatch(personalisedDataFetchStart())
    //         const res = await fetch("/api/input/inputVal", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData)
    //         });

    //         if (!res.ok) {
    //             dispatch(personalisedDataFetchFailure());
    //             console.error("Error:", text);
    //         } else {
    //             try {
    //                 const data = await res.json();
    //                 dispatch(personalisedDataFetchSuccess(data));
    //                 console.log("Data submitted successfully!");
    //                 navigate('/');
    //             } catch (jsonError) {
    //                 console.error("JSON parse error:", jsonError);
    //                 dispatch(personalisedDataFetchFailure(jsonError.message));
    //             }
    //         }
    //     } catch (error) {
    //         dispatch(personalisedDataFetchFailure(error.message))
    //         console.error("Error:", error);
    //     }
    // };
    const handleSubmit = async (e, id) => {
        e.preventDefault();

        try {
            dispatch(personalisedDataFetchStart());
            // const { user_input_id, ...rest } = formData;

            if (currentData && currentData.user_input_id) {
                // If data exists, it means we should update
                const res = await fetch(`/api/input/updatePersonalised`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                if (!res.ok) {
                    dispatch(personalisedDataFetchFailure());
                    console.error("Error:", res.statusText);
                } else {
                    try {
                        const data = await res.json();
                        dispatch(personalisedDataFetchSuccess(data));
                        console.log("Data updated successfully!");
                        navigate('/');
                    } catch (jsonError) {
                        console.error("JSON parse error:", jsonError);
                        dispatch(personalisedDataFetchFailure(jsonError.message));
                    }
                }
            } else {
                // If no data exists, it means we should create
                const res = await fetch("/api/input/inputVal", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                if (!res.ok) {
                    dispatch(personalisedDataFetchFailure());
                    console.error("Error:", res.statusText);
                } else {
                    try {
                        const data = await res.json();
                        dispatch(personalisedDataFetchSuccess(data));
                        console.log("Data created successfully!");
                        navigate('/');
                    } catch (jsonError) {
                        console.error("JSON parse error:", jsonError);
                        dispatch(personalisedDataFetchFailure(jsonError.message));
                    }
                }
            }
        } catch (error) {
            dispatch(personalisedDataFetchFailure(error.message));
            console.error("Error:", error);
        }
    };


    // ---------------------------------------------------------------------------------




    console.log(formData)
    return (
        <div>
            <div className='p-4 max-w-2xl mx-auto'>
                <form className='bg-gray-600 p-8 text-white rounded-lg shadow-md w-full max-w-4xl' onSubmit={handleSubmit}>

                    <div className='flex space-x-4'>
                        <div className='flex flex-col mb-5 w-1/2'>
                            <label htmlFor="height" className='mb-2'>Height</label>
                            <input
                                id='u_Height'
                                type="number"
                                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                                placeholder={currentData && currentData.u_height ? currentData.u_height : "Height"}
                                min="0"
                                max="90"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col mb-5 w-1/2">
                            <label htmlFor="weight" className='mb-2'>Weight</label>
                            <input
                                id='u_Weight'
                                type="number"
                                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                                placeholder={currentData && currentData.u_weight ? currentData.u_weight : "Weight"}
                                min="0"
                                max="100"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col mb-5'>
                        <label htmlFor="allergies" className='mb-2'>Allergies</label>
                        <input
                            id="u_Disease"
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                            placeholder={currentData && currentData.u_disease ? currentData.u_disease : "Mention if any"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col mb-5">
                        <label className='mb-2'>Plan</label>
                        <div className="flex justify-around">
                            <label className="relative cursor-pointer p-2 h-full w-full text-center">
                                <input
                                    type="radio"
                                    id="u_Diet_goal"
                                    value="weight loss"
                                    checked={selectedGoal === 'weight loss'}
                                    onChange={handlePlanChange}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <div className={`w-full h-full flex justify-center items-center border-2 duration-300 cursor-pointer radio-square rounded-xl ${selectedGoal === 'weight loss' ? 'border-blue-400 bg-blue-400 text-white' : 'border-white'}`}>
                                    Weight Loss
                                </div>
                            </label>
                            <label className="relative cursor-pointer p-2 h-full w-full text-center">
                                <input
                                    type="radio"
                                    id="u_Diet_goal"
                                    value="weight gain"
                                    checked={selectedGoal === 'weight gain'}
                                    onChange={handlePlanChange}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <div className={`w-full h-full flex justify-center items-center border-2 duration-300 cursor-pointer radio-square rounded-xl ${selectedGoal === 'weight gain' ? 'border-blue-400 bg-blue-400 text-white' : 'border-white'}`}>
                                    Weight Gain
                                </div>
                            </label>
                            <label className="relative cursor-pointer p-2 h-full w-full text-center">
                                <input
                                    type="radio"
                                    id="u_Diet_goal"
                                    value="maintain body"
                                    checked={selectedGoal === 'maintain body'}
                                    onChange={handlePlanChange}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <div className={`w-full h-full flex justify-center items-center border-2 duration-300 cursor-pointer radio-square rounded-xl ${selectedGoal === 'maintain body' ? 'border-blue-400 bg-blue-400 text-white' : 'border-white'}`}>
                                    Maintain Body
                                </div>
                            </label>
                            <label className="relative cursor-pointer p-2 h-full w-full text-center">
                                <input
                                    type="radio"
                                    id="u_Diet_goal"
                                    value="cure disease"
                                    checked={selectedGoal === 'cure disease'}
                                    onChange={handlePlanChange}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <div className={`w-full h-full flex justify-center items-center border-2 duration-300 cursor-pointer radio-square rounded-xl ${selectedGoal === 'cure disease' ? 'border-blue-400 bg-blue-400 text-white' : 'border-white'}`}>
                                    Cure Disease
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-5">
                        <div
                            onClick={() => handleVegChange('Veg')}
                            className={`h-20 relative align-middle select-none border-2 flex justify-center items-center gap-2 p-10 rounded-xl hover:shadow cursor-pointer ${selectedvegN === 'Veg' ? 'border-green-400 bg-green-400 text-white' : 'border-white'}`}
                        >
                            <div className="text-xl font-bold text-center">Veg</div>
                            <input
                                type="radio"
                                id="u_Diet_veg"
                                value="Veg"
                                checked={selectedvegN === 'Veg'}
                                className="sr-only"
                            />
                        </div>
                        <div
                            onClick={() => handleVegChange('Non-Veg')}
                            className={`h-20 relative align-middle select-none border-2 flex justify-center items-center gap-2 p-4 rounded-xl hover:shadow cursor-pointer ${selectedvegN === 'Non-Veg' ? 'border-red-400 bg-red-400 text-white' : 'border-white'}`}
                        >
                            <div className="text-xl font-bold text-center">Non-Veg</div>
                            <input
                                type="radio"
                                id="u_Diet_non_veg"
                                value="Non-Veg"
                                checked={selectedvegN === 'Non-Veg'}
                                className="sr-only"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                        {['Vegan', 'Keto', 'Gluten-Free', 'Low carbs', 'Dairy-Free'].map((diet_plan) => (
                            <div
                                key={diet_plan}
                                onClick={() => handleRadioChange(diet_plan)}
                                className={`h-20 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-2 p-4 rounded-xl hover:shadow cursor-pointer ${selectedPlan === diet_plan ? 'border-blue-400 bg-blue-400 text-white' : 'border-white'}`}
                            >
                                <div className="text-xl font-bold text-center">{diet_plan}</div>
                                <input
                                    type="radio"
                                    id="u_Diet_plan"
                                    value={diet_plan}
                                    checked={selectedPlan === diet_plan}
                                    className="sr-only"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-evenly">
                        <button type="submit" className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                            {currentData && currentData ? "Update Data" : "Submit"}
                        </button>
                        <Link to={'/'}>
                            <button type='button' className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline" onClick={handleDeleteData}>
                                Delete Data
                            </button>
                        </Link>
                        <Link to={'/'}>
                            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                                Go Back
                            </button>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

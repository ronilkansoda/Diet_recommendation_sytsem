import React, { useState } from 'react';

export default function DetailsForm() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-auto p-10">
      <form className="bg-gray-800 p-8 text-white rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Personal Details</h2>

        <div className='flex space-x-4'>
          <div className='flex flex-col mb-5 w-1/2'>
            <label htmlFor="height" className='mb-2'>Height</label>
            <input
              name='height'
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
              placeholder="In ft"
            />
          </div>

          <div className="flex flex-col mb-5 w-1/2">
            <label htmlFor="weight" className='mb-2'>Weight</label>
            <input
              name='weight'
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
              placeholder="In Kgs"
            />
          </div>
        </div>

        <div className='flex flex-col mb-5'>
          <label htmlFor="allergies" className='mb-2'>Allergies</label>
          <input
            name="allergies"
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
            placeholder="Mention if any"
          />
        </div>

        <div className="flex flex-col mb-5">
          <label className='mb-2'>Plan</label>
          <div className="flex justify-around">
            <label className="relative cursor-pointer p-2 h-full w-full text-center">
              <input type="radio" name="option" value="Weight Loss" className="absolute opacity-0 w-0 h-0" />
              <div className="w-full h-full flex justify-center items-center border-2 border-white duration-300 cursor-pointer radio-square rounded-xl">
                Weight Loss
              </div>
            </label>
            <label className="relative cursor-pointer p-2 h-full w-full text-center">
              <input type="radio" name="option" value="Weight Gain" className="absolute opacity-0 w-0 h-0" />
              <div className="w-full h-full flex justify-center items-center border-2 border-white duration-300 cursor-pointer radio-square rounded-xl">
                Weight Gain
              </div>
            </label>
            <label className="relative cursor-pointer p-2 h-full w-full text-center">
              <input type="radio" name="option" value="Maintain Body" className="absolute opacity-0 w-0 h-0" />
              <div className="w-full h-full flex justify-center items-center border-2 border-white duration-300 cursor-pointer radio-square rounded-xl">
                Maintain Body
              </div>
            </label>
            <label className="relative cursor-pointer p-2 h-full w-full text-center">
              <input type="radio" name="option" value="Cure Disease" className="absolute opacity-0 w-0 h-0" />
              <div className="w-full h-full flex justify-center items-center border-2 border-white duration-300 cursor-pointer radio-square rounded-xl">
                Cure Disease
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <div className="h-24 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-3 p-5 rounded-xl hover:shadow">
            <div className="text-2xl font-bold text-center">Vegan</div>
            <div>
              <div className='w-10 relative'>
                <input
                  type="checkbox"
                  name="veganToggle"
                  id="veganToggle"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="veganToggle"
                  className="toggle-label block overflow-hidden h-5 w-full rounded-full bg-gray-400 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>

          <div className="h-24 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-3 p-5 rounded-xl hover:shadow">
            <div className="text-2xl font-bold text-center">Veg / Non-veg</div>
            <div>
              <div className='w-12 relative'>
                <input type="checkbox" name="vnvToggle" id="vnvToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-red-400 appearance-none cursor-pointer" />
                <label htmlFor="vnvToggle" className="toggle-label block overflow-hidden h-6 w-full rounded-full bg-red-400 cursor-pointer"></label>
              </div>
            </div>
          </div>

          <div className="h-24 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-3 p-5 rounded-xl hover:shadow">
            <div className="text-2xl font-bold text-center">Keto</div>
            <div>
              <div className='w-12 relative'>
                <input type="checkbox" name="ketoToggle" id="ketoToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-red-400 appearance-none cursor-pointer" />
                <label htmlFor="ketoToggle" className="toggle-label block overflow-hidden h-6 w-full rounded-full bg-red-400 cursor-pointer"></label>
              </div>
            </div>
          </div>

          <div className="h-24 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-3 p-5 rounded-xl hover:shadow">
            <div className="text-2xl font-bold text-center">Gluten-Free</div>
            <div>
              <div className='w-12 relative'>
                <input type="checkbox" name="glutenToggle" id="glutenToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-red-400 appearance-none cursor-pointer" />
                <label htmlFor="glutenToggle" className="toggle-label block overflow-hidden h-6 w-full rounded-full bg-red-400 cursor-pointer"></label>
              </div>
            </div>
          </div>

          <div className="h-24 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-3 p-5 rounded-xl hover:shadow">
            <div className="text-2xl font-bold text-center">Low carbs</div>
            <div>
              <div className='w-12 relative'>
                <input type="checkbox" name="carbsToggle" id="carbsToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-red-400 appearance-none cursor-pointer" />
                <label htmlFor="carbsToggle" className="toggle-label block overflow-hidden h-6 w-full rounded-full bg-red-400 cursor-pointer"></label>
              </div>
            </div>
          </div>

          <div className="h-24 relative align-middle select-none border-2 flex flex-col justify-center items-center gap-3 p-5 rounded-xl hover:shadow">
            <div className="text-2xl font-bold text-center">Dairy-Free</div>
            <div>
              <div className='w-12 relative'>
                <input type="checkbox" name="dairyToggle" id="dairyToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-red-400 appearance-none cursor-pointer" />
                <label htmlFor="dairyToggle" className="toggle-label block overflow-hidden h-6 w-full rounded-full bg-red-400 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggleChange}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-400"></div>
          </label>
        </div>

        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

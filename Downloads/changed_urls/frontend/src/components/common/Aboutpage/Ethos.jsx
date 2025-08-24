import React from 'react'
import ShopFront from '../../../assets/componets-bg/ShopFront.jpg'

const Ethos = () => {
  return (
    <section className='text-app-black bg-white px-12 py-16'>
      {/* Section Title */}
      <p
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontWeight: 400,
          fontSize: '30.01px',
          lineHeight: '100%',
          textTransform: 'capitalize', // Capitalize first letter of each word
        }}
      >
        Our Ethos
      </p>

      <div className='flex items-center justify-around gap-10 mt-16'>
        {/* Left side: Text */}
        <div className='flex flex-col gap-4 max-w-2xl h-[600px]'>
          {/* Heading */}
          <h1
            style={{ 
              fontFamily: "'Bebas Neue', cursive",
              textTransform: 'capitalize' // Capitalize each word
            }}
            className='text-7xl text-app-black whitespace-nowrap'
          >
            A Studio Built For The Obsessed
            <br />
            <span className='text-custom-red'>- By The Obsessed</span>
          </h1>

          {/* Paragraphs */}
          <p
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '22px',
              fontWeight: 100, // lighter text
              textTransform: 'capitalize', // Capitalize each word
            }}
          >
            Some See Swirl Marks. We See Missed Potential. <br />
            Some Settle For “Good Enough.” We Chase Just Right. <br />
            <span className="text-2xl block font-light">
              OCD Detail Studio Was Born Out Of One Simple Belief:
            </span>
            <br />
            <span className="text-2xl font-semibold">
              Your Machine Deserves More Than A Quick Shine — It Deserves<br /> Reverence.
            </span>
            <br /> We Don’t Believe In Volume. We Believe In Value.
            <br /> Each Vehicle We Work On — Whether It’s A Porsche, A Ducati, A Defender, Or A Ninja Is Treated Like A Personal Project.
          </p>

          {/* Final Line */}
          <p
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '22px',
              fontWeight: 100,
              textTransform: 'capitalize', // Capitalize each word
            }}
          >
            We’re Not Just A Detailing Studio.{' '}
            <span className='text-custom-red font-bold'>
              We’re A Perfectionist’s Garage
            </span>
          </p>
        </div>

        {/* Right side: Image */}
        <div className='w-[600px] h-[600px] -mt-40'>
          <img
            src={ShopFront}
            alt='Shop Front'
            className='w-full h-full object-cover rounded-md shadow-lg'
          />
        </div>
      </div>
    </section>
  )
}

export default Ethos


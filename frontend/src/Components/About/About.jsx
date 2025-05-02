/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import Founder1 from '../Images/Founder 1.jpg';
import Founder2 from '../Images/Founder 2.png';
import Founder3 from '../Images/Founder 3.png';
import Founder4 from '../Images/Founder 4.png';
export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://i.ibb.co/T1RNwPh/pngtree-start-up-team-working-flat-design-style-png-image-5870928-transparent-Craiyon.png"
                            alt="EduTrade Team"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            EduTrade <br />
                        </h2>
                        <h3 className="text-2xl text-gray-900 font-bold md:text-3xl">
                            Simplifying Educational Resource Exchange for Students
                        </h3>
                        <p className="mt-6 text-gray-600 text-base">
                            EduTrade is a platform dedicated to simplifying the exchange of educational resources. Whether you're looking to buy, rent, or sell textbooks, notes, or past question papers, EduTrade empowers students to access materials they need in an affordable and efficient way. Our goal is to foster a collaborative learning environment where resources are easily accessible for everyone.
                        </p>
                        <p className="mt-4 text-gray-600 text-base">
                            <span className="font-semibold text-lg">Why EduTrade?</span> Traditional methods of acquiring educational materials can be costly and time-consuming. EduTrade provides a solution by creating a marketplace where students can exchange resources directly. This saves both time and money, while also promoting a sustainable practice of reusing valuable educational materials.
                        </p>
                    </div>
                </div>

{/* Meet Our Founders Section */}
<div className="mt-16 text-center">
  <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Founders</h2>
  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10 justify-center">
    {/* Founder Card Component */}
    {[
      { name: "Leena Chaudhari", img: Founder1 },
      { name: "Sakshi Jain", img: Founder2 },
      { name: "Sonali Bachhav", img: Founder3 },
      { name: "Raksha Sancheti", img: Founder4 },
    ].map((founder, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={founder.img}
          alt={founder.name}
          className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 shadow-md hover:scale-105 transition-transform duration-300"
        />
        <h4 className="mt-4 text-xl font-semibold text-gray-900">{founder.name}</h4>
        <p className="text-gray-600">Co-Founder</p>
      </div>
    ))}
  </div>
</div>

            </div>
        </div>
    );
  }

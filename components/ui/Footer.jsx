"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/0xmetaschool/mock-interviewer-gpt');
        const data = await response.json();
        setStarCount(data.stargazers_count); // Get the star count
      } catch (error) {
        console.error('Error fetching star count:', error);
      }
    };

    fetchStarCount();
  }, []);

  return (
    <footer className="mt-188px w-full">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex justify-between items-start">
          {/* Left side */}
          <div>
          </div>


          {/* Right side */}
          <div className="flex flex-col items-end gap-4">
            {/* Made with love section */}
            <div className="flex items-center gap-2 ">
              <span className="text-gray-600 font-sans">Made by Jonas Duncan</span>
            </div>

            {/* Social links */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
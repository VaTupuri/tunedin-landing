import { db } from '../firebase-config.js'; // Adjust the path if necessary to correctly point to your firebase-config file
import React, { useState, FormEvent } from 'react';
import { doc, arrayUnion, updateDoc, addDoc, collection } from "@firebase/firestore"
import logo3 from '@/public/images/homepage.png';
import prefs from '@/public/images/preferences.png';
import friends from '@/public/images/friends.png';

import Link from 'next/link';
import Image from 'next/image';
export default function Instructions() {
  const scaledWidth = 379 * 0.75; // 50% of original width
  const scaledHeight = 658 * 0.75;
  return (
    <section>
      <style jsx>{`
        /* Common styles for both left and right containers */
        .logo-container {
          text-align: center;
          color: #fff;
        }

        .container-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: -200px;
        }

        .container-row-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Styles for left and right alignment with padding */
        .left-align {
          justify-content: flex-start;
          padding-left: 300px;
        }

        .right-align {
          justify-content: flex-end;
          padding-right: 300px;
        }

        .scaled-image {
          transform: scale(0.25);
        }

        .image-container {
          filter: drop-shadow(0 0 5px rgba(238, 232, 170, 0.5));
          margin-bottom: 20px; /* Add margin to separate images vertically */
        }

        .pref-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 250px;
          margin-top: 20px; /* Add margin to separate text and image vertically */
        }

        .media-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 250px;
          margin-bottom: 20px; /* Add margin to separate text and image vertically */
        }

        .friends-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 250px;
          margin-top: 200px; /* Add margin to separate text and image vertically */
        }

        .text-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 250px;
          margin-top: 20px; /* Add margin to separate text and image vertically */
        }

        @media (max-width: 768px) {
          /* Adjust styling for smaller screens */
          .container-row,
          .container-row-bottom {
            flex-direction: column;
            align-items: center;
          }

          .left-align,
          .right-align {
            padding-left: 0;
            padding-right: 0;
          }
        }
      `}</style>

      {/* First row - Left aligned */}
      <h2 className="h2 mb-4 text-center"  data-aos="fade-down" data-aos-delay="100">GET STARTED WITH 3 EASY STEPS</h2>
      <div className="container-row left-align"  data-aos="fade-right" data-aos-delay="100">
        <div className="pref-container mr-4"> {/* New container for vertical alignment */}
          <h2 className="h4 text-right">1. Set Your Preferences</h2>
          <p className="text-right text-med text-gray-400">Tell us what you are interested in by selecting from an everchanging list of custom topics</p>
        </div>
        <div className="logo-container image-container">
          <Link href="/" className="block" aria-label="Cruip">
            <Image
              src={prefs}
              alt="Logo"
              width={scaledWidth}
              height={scaledHeight}
              style={{ display: 'block' }}
            />
          </Link>
        </div>
      </div>

      {/* Second row - Right aligned */}
      <div className="container-row right-align"  data-aos="fade-left" data-aos-delay="100">
        <div className="logo-container image-container" >
          <Link href="/" className="block" aria-label="Cruip">
            <Image
              src={logo3}
              alt="Logo"
              width={scaledWidth}
              height={scaledHeight}
              style={{ display: 'block' }}
            />
          </Link>
        </div>
        <div className="media-container ml-4"> {/* New container for vertical alignment */}
          <h2 className="h4 text-left">2. Check out your media</h2>
          <p className="text-left text-med text-gray-400">Listen to your audio byte for the day and stay connected with the topics you love most!</p>
        </div>
      </div>

      {/* Third row - Left aligned */}
      <div className="container-row-bottom left-align"  data-aos="fade-right" data-aos-delay="100">
      <div className="friends-container ml-4"> {/* New container for vertical alignment */}
          <h2 className="h4 text-right">3. See What Your Friends Are Up To!</h2>
          <p className="text-right text-med text-gray-400">Check out what your friends are listening to and interesting clips from their audio bytes</p>
        </div>
        <div className="logo-container image-container">
          <Link href="/" className="block" aria-label="Cruip">
            <Image
              src={friends}
              alt="Logo"
              width={scaledWidth}
              height={scaledHeight}
              style={{ display: 'block' }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

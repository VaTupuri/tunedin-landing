import React, { useState } from 'react';
import './style.css';
import PreferencesTab from './Prefs.Client';
import MediaTab from './Media.Client';

import Image from 'next/image';
import toggleIcon from '@/public/images/toggle-icon.png'; // Path to your toggle icon
import toggleIcon2 from '@/public/images/toggle-icon2.png'; // Path to your toggle icon
import { auth } from '../firebase-config'; // Adjust the path if necessary to correctly point to your firebase-config file
import {signOut } from "firebase/auth";
import { useSearchParams, usePathname, useRouter} from 'next/navigation'

type ProfileTabProps = {
  userEmail: string;
};

const UserProfile: React.FC<ProfileTabProps> = ({ userEmail }) => {
  const [activeTab, setActiveTab] = useState('Preferences');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const router = useRouter()
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/")

        // Sign-out successful.
        // You can redirect the user or update the state as needed
    }).catch((error) => {
        // An error happened.
        console.error("Sign out error:", error);
    });
};

  return (
    <div className="flex profileMain" style={{backgroundColor:"white"}}>
     
      {/* Sidebar navigation */}
      
      <div className={`sidebar w-64 min-h-screen bg-purple-900 text-white ${sidebarVisible ? '' : 'hidden'}`} style={{ position: 'sticky', top: 0 }}>
        <div className="flex items-center justify-start mt-4">
          <div className="sidebar-toggle-icon px-6 py-2" onClick={toggleSidebar}>
            <Image src={toggleIcon} alt="Toggle Sidebar" className="h-6 w-6 ml-auto filter invert" />
          </div>
          <div className="text-2xl text-leftfont-bold">TunedIn (beta)</div>


          {/* <Image src={whitelogo} alt="TunedIn Icon" className="h-12 w-12 mr-2" /> */}

        </div>
        <div className="white-bar-divider"></div>
        <nav className="mt-2">
          <button className={`w-full text-left px-6 py-2 hover:bg-purple-600 ${activeTab === 'Preferences' ? 'bg-purple-700' : ''}`} onClick={() => setActiveTab('Preferences')}>
            Preferences
          </button>
          <button className={`w-full text-left px-6 py-2 hover:bg-purple-600 ${activeTab === 'Your Media' ? 'bg-purple-700' : ''}`} onClick={() => setActiveTab('Your Media')}>
            Your Media
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1" style={{ backgroundColor: 'white' }}>
        {/* Sign out button */}
        <div className="self-end p-4">
          <button onClick={handleSignOut}  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
            Sign Out
          </button>
        </div>
        {!sidebarVisible && (
          <div className="sidebar-toggle-icon-main-content" onClick={toggleSidebar}>
            <Image src={toggleIcon2} alt="Toggle Sidebar" className="h-6 w-6" />
          </div>
        )}
        <div className="flex-1 p-10" style={{ backgroundColor: 'white' }}>

          {activeTab === 'Preferences' && <PreferencesTab userEmail={userEmail} />}
          {activeTab === 'Your Media' && <MediaTab userEmail={userEmail} />}
        </div>
        </div>


        

        

    </div>
  );
};

export default UserProfile;

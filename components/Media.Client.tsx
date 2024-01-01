import React, { useEffect, useState } from 'react';
import { storage, db } from '../firebase-config2'; // Adjust the path if necessary to correctly point to your firebase-config file
import AudioPlayer from './audiotest_media'; // import the AudioPlayer component
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc } from "@firebase/firestore"
import { doc, arrayUnion, arrayRemove, updateDoc, collection, onSnapshot } from "@firebase/firestore";

type MediaTabProps = {
    userEmail: string;
};
const MediaTab: React.FC<MediaTabProps> = ({ userEmail }) => {

    const [audioUrls, setAudioUrls] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    function getFormattedDate(daysAgo: number = 0): string {
        const now = new Date();
        now.setDate(now.getDate() - daysAgo);
    
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed in JavaScript
        const date = now.getDate().toString().padStart(2, '0');
    
        return `${year}${month}${date}`;
    }
    const today = getFormattedDate(0)
    const yesterday = getFormattedDate(1)
    const twodaysago = getFormattedDate(2)

   
    const fetchAudioUrls = async () => {
        const storageRef = ref(storage);
        try {
            const result = await listAll(storageRef);

            const matchingItems = result.items.filter(itemRef => {
                // Construct the expected pattern for the filename
                if (itemRef.name.includes(userEmail) && (itemRef.name.includes(today) || itemRef.name.includes(yesterday) || itemRef.name.includes(twodaysago))) {
                    return itemRef
                }

            });


            // console.log(result)
            const urlPromises = matchingItems.map(itemRef => getDownloadURL(itemRef));
            const urls = await Promise.all(urlPromises);
            console.log(urls)
            const url2 = ['', '', ''];

            urls.forEach(url => {
                if (url.includes(today)) {
                    url2[0] = url;
                } else if (url.includes(yesterday)) {
                    url2[1] = url;
                } else if (url.includes(twodaysago)) {
                    url2[2] = url;
                }
            });
            
            setAudioUrls(url2);
        } catch (error) {
            console.error("Error fetching audio URLs:", error);
        }
    };

    useEffect(() => {
       
        fetchAudioUrls();
    }, [userEmail]);

    const handleFeedbackChange = (value: string) => {
        setFeedback(value);
    };

    const handleCloseSuccessMessage = () => {
        console.log("showing modal")
        setShowSuccessMessage(false);
      }
    const submitFeedback = async () => {
        try {
            // Create a reference to the user-specific collection
            const feedbackCollectionRef = collection(db, 'feedback', userEmail, 'entries');

            // Add a new document with the current timestamp as the key
            await addDoc(feedbackCollectionRef, {
                feedback: feedback,
                timestamp: new Date() // Use the current date/time as the document ID
            });
            console.log('Feedback submitted');
            setShowSuccessMessage(true); // Show success message on successful submission

        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };


    const generatePodcast = async () => {
        setIsGenerating(true); // Disable the button and change text

        try {
            console.log("generating podcast")

            const response = await fetch('https://version1-jhw4pnbl4a-ue.a.run.app/generate_podcast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userEmail })
            });
            if (!response.ok) {
                throw new Error('Rate limit hit'); // Example error message
            }
            const data = await response.json();
            
            console.log(data); // Print the response
            fetchAudioUrls();

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message); // Set the error message
            }
         

        }
        finally {
            setIsGenerating(false); // Re-enable the button after the process is complete
        }
    };

    const renderAudioPlayerOrMessage = (urlIndex: number, title: string) => {
        console.log(audioUrls[urlIndex], title)
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>

                {audioUrls[urlIndex] != '' && audioUrls[urlIndex] ? (
                    <AudioPlayer url={audioUrls[urlIndex]} title={title} />
                ) : (
                    <div style={{ color: "black" }}>No audio exists for {title}</div>
                )}


            </div>
        );
    };

    return (
        <section>
            <button 
                className='media-generate' 
                onClick={generatePodcast}
                disabled={isGenerating}
            >
                {isGenerating ? "Generating..." : "Start Podcast Generation"}
            </button>
            {errorMessage && (
                <span style={{ marginLeft: '10px', color: 'red' }}>{errorMessage}</span>
            )}
            <div style={{ display: 'flex', height: '100%' }}>
                {/* Left Section */}

                <div style={{ flex: 3, padding: '20px' }}> {/* Adjust padding as needed */}
                    {/* Existing content goes here */}

                    <h1 className="audio-title" style={{ marginBottom: '70px' }} >Listen To Your Latest Media!</h1>
                    <div>
                        {renderAudioPlayerOrMessage(0, "Today")}
                        {renderAudioPlayerOrMessage(1, "Yesterday")}
                        {renderAudioPlayerOrMessage(2, "Two Days Ago")}
                    </div>
                </div>

                {/* Right Section */}
                <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}> {/* Adjust padding and border as needed */}
                    <h2 className='feedback-title'>Feedback</h2>
                    <textarea
                        style={{ width: '100%', height: '100px', marginBottom: '10px', color: "black" }}
                        placeholder="Enter your feedback here"
                        onChange={(e) => handleFeedbackChange(e.target.value)}

                    />
                    <button className='preference-item' onClick={() => submitFeedback()}
                    >Submit Feedback</button>
                </div>
            </div>
            {showSuccessMessage && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl transition duration-500 ease-in-out transform scale-105">
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Success!</h3>
              <p className="text-sm text-gray-600 text-center mb-6">Your feedback has been successfully submitted. Thank you for the help!</p>
              <div className="flex justify-center">
                <button onClick={handleCloseSuccessMessage} className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-purple-800 focus:outline-none focus:border-purple-900 focus:ring focus:ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150">Close</button>
              </div>
            </div>
          </div>
        )}
        </section>

    );
};

export default MediaTab;

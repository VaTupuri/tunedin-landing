import React from 'react';
import Link from 'next/link';

export default function Privacy() {
  return (
    <section style={{ width: '60%', margin: '0 auto' }} >
         <Link href="/">
         <p className="mt-10 inline-block px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              Go Back
            </p>
          </Link>
        <div className='text-left mt-3'>
            <h1 className="h1 mb-4 text-purple-500 text-4xl">Privacy Policy For TunedIn</h1>
            <p>
        At TunedIn, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by TunedIn and how we use it.
      </p>

      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Log Files</h2>
      <p>
      TunedIn follows a standard procedure of using log files. These files log visitors when they use app. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the app, tracking users' movement on the app, and gathering demographic information.

      </p>

      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Our Advertising Partners
</h2>
      <p>
      Some of advertisers in our app may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
Google - 
https://policies.google.com/technologies/ads
      </p>

      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Privacy Policies
</h2>
      <p>
      You may consult this list to find the Privacy Policy for each of the advertising partners of TunedIn.
Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Beacons that are used in their respective advertisements and links that appear on TunedIn. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on this app or other apps or websites.
Note that TunedIn has no access to or control over these cookies that are used by third-party advertisers.

      </p>

      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Third Party Privacy Policies
</h2>
      <p>
      TunedIn's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.


      </p>

      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Children's Information

</h2>
      <p>
      Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
TunedIn does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our App, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.


      </p>


      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Online Privacy Policy Only

</h2>
      <p>
      This Privacy Policy applies only to our online activities and is valid for visitors to our App with regards to the information that they shared and/or collect in TunedIn. This policy is not applicable to any information collected offline or via channels other than this app. Our Privacy Policy was created with the help of the App Privacy Policy Generator from App-Privacy-Policy.com


      </p>


      <h2 className="h2 mb-4 text-purple-500 text-2xl mt-5">Consent
</h2>
      <p className='mb-10'>
By using our app, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.


      </p>


        </div>
    </section>
  );
}

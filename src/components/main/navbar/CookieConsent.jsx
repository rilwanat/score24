import React, { useState, useEffect } from 'react';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [cookies, setCookies] = useState({
    essential: true, // Essential cookies are always enabled
    analytical: false,
    functionality: false,
  });


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAccept = () => {
    // Handle the cookie acceptance logic here
    setIsVisible(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCookies((prevCookies) => ({
      ...prevCookies,
      [name]: checked,
    }));
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`px-4 lg:px-16 xl:px-24 2xl:px-80      fixed bottom-16 left-0 right-0 z-50 flex flex-col justify-center p-4 ${isMobile ? 'md:hidden' : 'md:flex'}`} 
      style={{ backgroundColor: '#333333' }}
    >
      {isMobile ? (
        <>
          <p className="text-xs text-white mb-4">
            We use cookies to deliver our services and analyze performance. 
            <span className="underline cursor-pointer ml-1">Learn more...</span>
          </p>
          <div className="flex ">
            <div 
              onClick={handleAccept} 
              style={{ backgroundColor: '#dddddd' }}
              className="bg-scBackground text-scDarkerBackground text-xs px-4 py-1 rounded mr-2 cursor-pointer"
            >
              Essentials Only
            </div>
            <div 
              onClick={handleAccept} 
              style={{ backgroundColor: '#dddddd' }}
              className="bg-scBackground text-scDarkerBackground text-xs px-4 py-1 rounded cursor-pointer"
            >
              Accept all
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-xs text-white mb-4">
            We use essential cookies to make our website work. Some of our features which allow you to customise the content of the website use additional Functionality cookies to store data on your device - for example, your selection of Bookmarked leagues or Favourite teams or matches. These features will work without the Functionality cookies, but all customisations will be removed at the end of the session. We would also like to set optional analytical cookies to help us improve our services. The analytical cookies will be sent to and processed by an analytical service based in the US. We will not store or send out any information without your consent. Using this tool will set a cookie to remember your preferences. For more information about our use of cookies, please see our Privacy and Cookie Notice.
          </p>
          <div className="flex mb-4 items-center ">
            <p className='text-xs text-white mr-2'>Please select cookies you wish to enable:</p>
            <label className="text-xs text-white flex items-center mr-2">
              <input 
                type="checkbox" 
                name="essential" 
                checked={cookies.essential}
                onChange={handleCheckboxChange}
                disabled
                className="mr-2"
              />
              Essential (always enabled)
            </label>
            <label className="text-xs text-white flex items-center mr-2">
              <input 
                type="checkbox" 
                name="analytical" 
                checked={cookies.analytical}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Analytical (optional)
            </label>
            <label className="text-xs text-white flex items-center mr-2">
              <input 
                type="checkbox" 
                name="functionality" 
                checked={cookies.functionality}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Functionality (optional)
            </label>
            <div 
              onClick={handleAccept} 
              style={{  }}
              className="hover:bg-scButtonHover bg-scButton text-scDarkerBackground text-xs px-4 py-1 rounded mr-2 cursor-pointer"
            >
              Save and close
            </div>
          </div>
          
          
          
        </div>
      )}
    </div>
  );
}

export default CookieConsent;

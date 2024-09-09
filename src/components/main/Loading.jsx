import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from 'react-spinners';

import logo from '../../assets/images/logo.png';



function Loading({  }) {

    const navigate = useNavigate();

    return (
      <>
      <div className="flex flex-col items-center justify-center mt-8 z-50">
      <div className="flex items-center justify-center ">
        <img
          className="block h-8 w-auto"
          src={logo}
          alt="Logo"
          onClick={() => { navigate('/'); }}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="flex justify-center my-2">
        <ClipLoader size={40} color={"#B3E94E"} loading={true} /> 
      </div>
      <div className="flex justify-center text-xs text-scGreen">loading ...</div>
    </div>
    <div className="flex flex-col items-center justify-center min-h-screen z-50">

    </div>
    </>
         
    );
}

export default Loading;

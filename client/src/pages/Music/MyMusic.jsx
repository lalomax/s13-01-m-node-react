import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getProfile } from "../../api/profile";
import { useUploadFromProfile } from "../../hooks/useUploadMultimedia.js";
import { ShowVideoMultimedia } from "../../components/VideosForm/ShowVideoMultimedia.jsx";
import "./MyMusic.css";
import {
  MULTIMEDIA_TYPE,
} from "../../utils/constants";

const MyMusic = () => {
   const [isMySelf, setIsMySelf] = useState(true);
   const { user: authUser } = useAuth();
   const params = useParams();
  
   const {handleFileChange, handleUpload } = useUploadFromProfile();
 
   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
   
   useEffect(() => {
     setIsMySelf(authUser?.user.id === params.id);
     onMountHook();
   }, [authUser, params.id]);
   
 
   const onMountHook = () => {
     getProfile(params.id).then((data) => {
       data.videos = data.videos.slice(0, 4);
       setUser(data);  
     });
   };
 
   const submitMultimediaDone = async (data) => {
     setUser({ ...user, videos: [data, ...user.videos] });
   };
  return (
   <div className="p-8 overflow-hidden max-w-[100%] m-auto"> 
         <div className="list-demos">
            <ShowVideoMultimedia
              title={"Demos"}
              type={MULTIMEDIA_TYPE.VIDEO}
              items={user?.videos}
              link={`/demos/${user?.id}`}
              onChange={handleFileChange}
            ></ShowVideoMultimedia>
          </div>

   <div className="flex justify-center items-center mt-10 pb-10 w-80 m-auto md:w-full">
     {isMySelf && (
       <button
         className="bg-secondary p-2 w-full md:w-1/3 rounded-lg text-slate-50"
         onClick={() => {
           handleUpload(submitMultimediaDone);
         }}
       >
         Guardar cambios
       </button>
     )}
   </div>
 </div>

  )
}

export default MyMusic

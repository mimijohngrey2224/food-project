// import React, { useEffect, useState, useContext } from "react";
// import { MenuContext } from "../../context/MenuContext";
// import avatar from '../../assets/avatar.png';

// function ProfileForm({ onClose }) {
//   const { userProfile, updateUserProfile, error, success, getUserProfile, url } = useContext(MenuContext);
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     address: '',
//     image: '' 
//   });
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Fetch the user profile on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       await getUserProfile();
//     };
//     fetchProfile();
//   }, [getUserProfile]);

//   // Update profile data state when userProfile changes
//   useEffect(() => {
//     if (userProfile) {
//       setProfileData({
//         firstName: userProfile.firstName || '',
//         lastName: userProfile.lastName || '',
//         phone: userProfile.phone || '',
//         address: userProfile.address || '',
//         image: userProfile.image || ''
//       });
//     }
//   }, [userProfile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);

//     // Create a URL for the selected image to preview it immediately
//     const imageUrl = URL.createObjectURL(file);
//     setProfileData(prevData => ({ ...prevData, image: imageUrl }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!profileData.firstName) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('firstName', profileData.firstName);
//     formData.append('lastName', profileData.lastName);
//     formData.append('phone', profileData.phone);
//     formData.append('address', profileData.address);

//     // Include selected image only if it exists
//     if (selectedImage) {
//       formData.append('image', selectedImage);
//     }

//     try {
//       await updateUserProfile(formData);
//       // console.log("kyubvnwivw", profileData);
      
//       // console.log("new firstName", localStorage.setItem("user", JSON.stringify(profileData.firstName)));
//       // console.log(localStorage.getItem("user", JSON.parse(profileData.firstName)))
      
//       await getUserProfile(); // Refetch the profile after updating
//       onClose(); // Close the profile form after updating
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//     }
//   };
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 relative">
//         <button 
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         </button>
//         <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">Profile updated successfully!</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <img 
//                 src={profileData.image ? profileData.image : `${url}/uploads/${profileData.image}`} 
//                 alt="Profile" 
//                 className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
//               />
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={handleImageChange}
//                 id="profileImage"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//               <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-blue-500 text-white py-1 px-3 rounded-full text-xs cursor-pointer">
//                 Change
//               </label>
//             </div>
//             <div>
//               <input 
//                 name="firstName"
//                 value={profileData.firstName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="First Name"
//                 className="border rounded-md p-2 w-full mb-2"
//                 required
//               />
//               <input 
//                 name="lastName"
//                 value={profileData.lastName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Last Name"
//                 className="border rounded-md p-2 w-full mb-2"
//               />
//               <input 
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleChange}
//                 type="tel"
//                 placeholder="Phone"
//                 className="border rounded-md p-2 w-full mb-2"
//               />
//               <input 
//                 name="address"
//                 value={profileData.address}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Address"
//                 className="border rounded-md p-2 w-full mb-4"
//               />
//             </div>
//           </div>
//           <button 
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;




// updated 30th oct

import React, { useEffect, useState, useContext } from "react";
import { MenuContext } from "../../context/MenuContext";
import avatar from '../../assets/avatar.png';

function ProfileForm({ onClose }) {
  const { userProfile, updateUserProfile, error, success, getUserProfile, url } = useContext(MenuContext);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    image: '' 
  });
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      await getUserProfile();
    };
    fetchProfile();
  }, [getUserProfile]);

  // Update profile data state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setProfileData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        image: userProfile.image || ''
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Create a URL for the selected image to preview it immediately
    const imageUrl = URL.createObjectURL(file);
    setProfileData(prevData => ({ ...prevData, image: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileData.firstName) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('phone', profileData.phone);
    formData.append('address', profileData.address);

    // Include selected image only if it exists
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await updateUserProfile(formData);
      await getUserProfile(); // Refetch the profile after updating
      onClose(); // Close the profile form after updating
    } catch (error) {
      console.error('Failed to update profile:', error);
    }

    // update from perplexity 24 november
    // try {
    //   await updateUserProfile(formData); // Update the user profile
    //   const updatedProfile = await getUserProfile(); // Refetch the profile after updating
    //   setUserProfile(updatedProfile); // Update state with the new profile data
    //   setUserName(updatedProfile.name); // Assuming 'name' is the field for username
    //   onClose(); // Close the profile form after updating
    // } catch (error) {
    //   console.error('Failed to update profile:', error);
    // }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Profile updated successfully!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={profileData.image ? profileData.image : `${url}/uploads/${profileData.image}`} 
                alt="Profile" 
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                id="profileImage"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-blue-500 text-white py-1 px-3 rounded-full text-xs cursor-pointer">
                Change
              </label>
            </div>
            <div>
              <input 
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                className="border rounded-md p-2 w-full mb-2"
                required
              />
              <input 
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                className="border rounded-md p-2 w-full mb-2"
              />
              <input 
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone"
                className="border rounded-md p-2 w-full mb-2"
              />
              <input 
                name="address"
                value={profileData.address}
                onChange={handleChange}
                type="text"
                placeholder="Address"
                className="border rounded-md p-2 w-full mb-4"
              />
            </div>
          </div>
          <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;


// trying new code 15th novermber
// import React, { useEffect, useState, useContext } from "react";
// import { MenuContext } from "../../context/MenuContext";
// import avatar from '../../assets/avatar.png';


// function ProfileForm({ onClose }) {
//   const { userProfile, updateUserProfile, error, success, getUserProfile, url } = useContext(MenuContext);

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     address: "",
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   // Fetch the user profile on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       await getUserProfile();
//     };
//     fetchProfile();
//   }, [getUserProfile]);

//   // Update profile data state when userProfile changes
//   useEffect(() => {
//     if (userProfile) {
//       setProfileData({
//         firstName: userProfile.firstName || "",
//         lastName: userProfile.lastName || "",
//         phone: userProfile.phone || "",
//         address: userProfile.address || "",
//       });
//       if (userProfile.image) {
//         setPreviewImage(`${url}/uploads/${userProfile.image}`);
//       }
//     }
//   }, [userProfile, url]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!profileData.firstName) {
//       alert("First Name is required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("firstName", profileData.firstName);
//     formData.append("lastName", profileData.lastName);
//     formData.append("phone", profileData.phone);
//     formData.append("address", profileData.address);

//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }

//     try {
//       await updateUserProfile(formData);
//       await getUserProfile(); // Refetch the profile after updating
//       onClose(); // Close the profile form
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         </button>
//         <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">Profile updated successfully!</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <img
//                 src={previewImage || avatar} // Default avatar if no image
//                 alt="Profile"
//                 className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 id="profileImage"
//                 className="hidden"
//               />
//               <label
//                 htmlFor="profileImage"
//                 className="absolute bottom-0 right-0 bg-blue-500 text-white py-1 px-3 rounded-full text-xs cursor-pointer"
//               >
//                 Change
//               </label>
//             </div>
//             <div>
//               <input
//                 name="firstName"
//                 value={profileData.firstName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="First Name"
//                 className="border rounded-md p-2 w-full mb-2"
//                 required
//               />
//               <input
//                 name="lastName"
//                 value={profileData.lastName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Last Name"
//                 className="border rounded-md p-2 w-full mb-2"
//               />
//               <input
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleChange}
//                 type="tel"
//                 placeholder="Phone"
//                 className="border rounded-md p-2 w-full mb-2"
//               />
//               <input
//                 name="address"
//                 value={profileData.address}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Address"
//                 className="border rounded-md p-2 w-full mb-4"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;



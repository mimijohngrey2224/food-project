

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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        await getUserProfile();
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Update profile data state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setProfileData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        image: userProfile.image ? `${url}/uploads/${userProfile.image}` : ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedImage(file);

    // Create a URL for the selected image to preview it immediately
    const imageUrl = URL.createObjectURL(file);
    setProfileData(prevData => ({ ...prevData, image: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileData.firstName) {
      alert("First name is required");
      return;
    }

    const formData = new FormData();
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName || '');
    formData.append('phone', profileData.phone || '');
    formData.append('address', profileData.address || '');

    // Include selected image only if it exists
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await updateUserProfile(formData);
      await getUserProfile(); // Refetch the profile after updating
      // onClose(); // Only close if you want the form to disappear after submit
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="p-6 bg-white rounded-lg shadow-md">
          Loading profile...
        </div>
      </div>
    );
  }

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
                src={profileData.image || avatar} 
                alt="Profile" 
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                onError={(e) => {
                  e.target.src = avatar;
                }}
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
            <div className="flex-1">
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


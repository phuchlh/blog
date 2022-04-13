import React, { useState } from "react";

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>

            {selectedImage && (
                <div>
                   
                    <img  className="rounded-full w-72 h-72 mb-6" alt="not fount"  src={ !localStorage.getItem(`user-token`) ? localStorage.getItem(`user-avatar`) : URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}
            <br />

            <br />
            <input
                className="h-8 w-32 bg-red-500 mt-4 rounded-2xl text-white "
                type="file"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;
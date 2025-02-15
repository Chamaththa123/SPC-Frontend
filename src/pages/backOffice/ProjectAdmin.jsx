import React, { useState } from "react";
import { db, auth } from "./config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { ProcessingIcon } from "../../utils/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProjectAdmin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [image, setImage] = useState(null);
  const [projectType, setProjectType] = useState("web");
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddTechnology = () => {
    if (technology.trim() !== "" && !technologies.includes(technology)) {
      setTechnologies([...technologies, technology]);
      setTechnology("");
    }
  };

  const handleRemoveTechnology = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const validate = (data) => {
    const error = {};

    if (!data.title) {
      error.title = "Title is required";
    }

    if (!data.description) {
      error.description = "Description is required";
    }

    if (!data.videoLink) {
      error.videoLink = "Video Link is required";
    }

    if (!data.image) {
      error.image = "Image is required";
    }

    if (!data.projectType) {
      error.projectType = "Type is required";
    }

    // if (data.technologies.length === 0) {
    //     error.technology = "At least one technology is required";
    // }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate({
      title,
      description,
      videoLink,
      image,
      projectType,
      technology,
    });

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setUploading(true);

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "my_unsigned_preset");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dk7wsmllq/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
        return;
      }
    }

    const projectData = {
      title,
      description,
      videoLink,
      projectType,
      technologies,
      imageUrl,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "projects"), projectData);
      toast.success("Project added successfully!");
      setTitle("");
      setDescription("");
      setVideoLink("");
      setImage("");
      setTechnologies([]);
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error adding project");
    }

    setUploading(false);
  };

  // const handleSignOut = async () => {
  //     try {
  //         await signOut(auth);
  //         document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //         navigate("/");
  //     } catch (error) {
  //         console.error("Error signing out: ", error);
  //     }
  // };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error.title && (
          <p className="mb-3 mt-[-10px] font-inter text-xs font-medium text-red-500">
            {error.title}
          </p>
        )}

        <label className="block mb-2 font-medium">Description</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="mb-[70px] h-64"
        />
        {error.description && (
          <p className="mb-3 mt-[-10px] font-inter text-xs font-medium text-red-500">
            {error.description}
          </p>
        )}
        <label className="block mb-2 font-medium">Video Link</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        {error.videoLink && (
          <p className="mb-3 mt-[-10px] font-inter text-xs font-medium text-red-500">
            {error.videoLink}
          </p>
        )}
        {/* Project Type Selection */}
        <label className="block mb-2 font-medium">Project Type</label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="web"
              checked={projectType === "web"}
              onChange={(e) => setProjectType(e.target.value)}
              className="mr-2"
            />
            Web
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="mobile"
              checked={projectType === "mobile"}
              onChange={(e) => setProjectType(e.target.value)}
              className="mr-2"
            />
            Mobile
          </label>
        </div>
        {error.projectType && (
          <p className="mb-3 mt-[-10px] font-inter text-xs font-medium text-red-500">
            {error.projectType}
          </p>
        )}
        {/* Technology List Section */}
        <label className="block mb-2 font-medium">Technologies</label>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter technology (e.g., React)"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          />
          <button
            type="button"
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddTechnology}
          >
            Add
          </button>
        </div>

        {/* Display Added Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-200 px-3 py-1 rounded"
            >
              {tech}
              <FaTrash
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => handleRemoveTechnology(tech)}
              />
            </span>
          ))}
        </div>

        <label className="block mb-2 font-medium">Project Image</label>
        <input
          type="file"
          className="w-full mb-4"
          onChange={handleImageChange}
        />
        {error.image && (
          <p className="mb-3 mt-[-10px] font-inter text-xs font-medium text-red-500">
            {error.image}
          </p>
        )}
        <div className="md:flex md:justify-end">
          <button
            type="submit"
            className="md:w-[150px] w-[full] bg-blue-500 text-white p-2 rounded mt-5"
            disabled={uploading}
          >
            {uploading ? <ProcessingIcon /> : "Add Project"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

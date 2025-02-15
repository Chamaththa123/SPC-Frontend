import React, { useEffect, useState } from 'react';
import { db } from "../backOffice/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [projectType, setProjectType] = useState("web");
  const [technologies, setTechnologies] = useState([]);
  const [newTechnology, setNewTechnology] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const projectData = docSnap.data();
          setTitle(projectData.title);
          setDescription(projectData.description);
          setVideoLink(projectData.videoLink);
          setProjectType(projectData.projectType);
          setTechnologies(projectData.technologies || []);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "") {
      setTechnologies([...technologies, newTechnology.trim()]);
      setNewTechnology("");
    }
  };

  const handleRemoveTechnology = (index) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const projectRef = doc(db, "projects", id);
      await updateDoc(projectRef, {
        title,
        description,
        videoLink,
        projectType,
        technologies,
      });
      Swal.fire("Success!", "Project updated successfully", "success");
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      Swal.fire("Error!", "There was an issue updating the project", "error");
    }
  };

  return (
    <div className='text-[14px]' >
      <h2 className="text-md font-semibold mb-4">Edit Project</h2>

      <form onSubmit={handleUpdate}>
        <label className="block mb-2 font-medium  ">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mb-2 font-medium">Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="w-full mb-4"
        />

        <label className="block mb-2 font-medium">Video Link</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

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

        {/* Technologies List */}
        <label className="block mb-2 font-medium">Technologies</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center bg-gray-200 px-2 py-1 rounded">
              <span>{tech}</span>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleRemoveTechnology(index)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        {/* Add Technology Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter a new technology"
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
          />
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleAddTechnology}
          >
            Add
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;

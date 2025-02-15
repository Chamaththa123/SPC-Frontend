import React, { useEffect, useState } from "react";
import { db } from "../backOffice/config/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import ContentLoader from "../../components/layouts/ContentLoader";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeout(() => {
          setProjects(projectData);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  const deleteProject = async (projectId) => {
    try {
      // Show confirmation popup
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the project!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteDoc(doc(db, "projects", projectId));

        setProjects(projects.filter((project) => project.id !== projectId));

        Swal.fire("Deleted!", "Your project has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      Swal.fire("Error!", "There was an issue deleting the project.", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center my-10">
        <ContentLoader />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">All Projects</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-5">
                Title
              </th>
              <th scope="col" className="px-6 py-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="odd:bg-white text-xs odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{project.title}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/edit-project/${project.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="ml-4 text-red-600 dark:text-red-500 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProjects;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { Input } from "./ui/input";
import { BackgroundBeams } from "./ui/background-beams";
// import { Button } from "./ui/moving-border";
import { Cover } from "./ui/cover";
import { FileUpload } from "./ui/file-upload";
import { FollowerPointerCard } from "./ui/following-pointer";
import Footer from "./Footer";
import { ConfettiFireworks } from "./ui/confettiFireworks";
// import { Boxes } from "./ui/background-boxes";
// import {cn} from "../lib/utils"
const FrontPageGenerator = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();
  const [preview, setPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const logo = watch("logo"); // Watch the logo field

  const onSubmit = (data) => {
    if (logo && logo.length > 0) {
      setPreview(data);
      setLogoFile(logo[0]); // Store the first file (assuming single file upload)
    }
  };

  const handleRemoveFile = () => {
    setValue("logo", null); // Reset the file input value
    setLogoFile(null); // Clear the stored file
    setPreview((prev) => ({ ...prev, logo: null })); // Clear the logo preview
  };

  const handleDownload = () => {
    if (logoFile) {
      const url = URL.createObjectURL(logoFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = logoFile.name;
      link.click();
      URL.revokeObjectURL(url); // Clean up the object URL
    }
  };

  return (
    <div>
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-8 bg-black  min-h-screen">
      {/* <Boxes /> */}
      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-transparent p-8 shadow-md rounded-lg border border-gray-200 z-10   ">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-200">
          Front Page Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          {[
            { label: "College Name", name: "collegeName", type: "text" },
            { label: "Subject Name", name: "subjectName", type: "text" },
            { label: "Subject Code", name: "subjectCode", type: "text" },
            {
              label: "Upload Logo",
              name: "logo",
              type: "file",
              required: true
            },

            { label: "Professor Name", name: "professorName", type: "text" },

            { label: "Student Name", name: "studentName", type: "text" },
            { label: "Semester", name: "semester", type: "text" },
            { label: "Enrollment No.", name: "enrollmentNo", type: "text" }
          ].map(({ label, name, type, required }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-neutral-200 mb-2">
                {label}
              </label>
              <Input
                {...register(name, {
                  required: required ? "This field is required" : false
                })}
                type={type}
                className={`p-3 border border-gray-300 rounded-md shadow-sm bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-200 ${
                  type === "file"
                    ? "file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-gray-50"
                    : ""
                }`}
              />

              {errors[name] && (
                <span className="text-red-600 text-sm mt-1">
                  {errors[name].message}
                </span>
              )}
              {type === "file" && logoFile && (
                <button
                  type="button"
                  className="mt-2 flex items-center text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-200"
                  onClick={handleRemoveFile}
                >
                  <FaTrash className="mr-2" /> Remove
                </button>
              )}
            </div>
          ))}
          <FileUpload onSubmit={handleSubmit(onSubmit)} />
          <button
            type="submit"
            className="  group/btn w-full text-white rounded-md h-10 font-medium "
          >
            <Cover>
              <span className="text-neutral-700   dark:text-neutral-300 text-sm">
             preview
              </span>
              <BottomGradient />
            </Cover>
          </button>
        </form>
      </div>

      {/* Preview Section */}
      
      <div className="w-full lg:w-1/2 bg-transparent p-8 shadow-md rounded-lg border border-gray-200 z-20">
      <FollowerPointerCard >
        <h2 className="text-2xl font-semibold mb-6 text-neutral-300">
        Preview
        </h2>
        {preview ? (
          <div>
            
            <div className="mb-6">
              {logoFile && (
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Logo"
                  className="max-w-full h-32 object-contain mb-4 border border-gray-200 rounded-md shadow-sm"
                />
              )}

            </div>
          
            <div className="space-y-2">
              {[
                { label: "College Name", value: preview.collegeName },
                { label: "Subject Name", value: preview.subjectName },
                { label: "Subject Code", value: preview.subjectCode },
                { label: "Submitted To", value: preview.submittedTo },
                { label: "Professor Name", value: preview.professorName },
                { label: "Submitted By", value: preview.submittedBy },
                { label: "Student Name", value: preview.studentName },
                { label: "Semester", value: preview.semester },
                { label: "Enrollment No.", value: preview.enrollmentNo }
              ].map(({ label, value }) => (
                <p key={label} className="text-neutral-300 text-lg">
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-200 cursor-none"
                onClick={handleDownload} // Trigger download when clicked
              >
                  <ConfettiFireworks/>
              </button>
              <button
                type="button"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-200 cursor-none"
                onClick={handleRemoveFile}
              >
                <FaTrash className="inline-block mr-2" /> Remove File
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            No preview available. Fill out the form and click Preview. Hello
          </p>
        )}
        </FollowerPointerCard>
      </div>
        
      <BackgroundBeams />
      
      
     

    </div>
    <Footer />

    </div>
  );
};

export default FrontPageGenerator;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

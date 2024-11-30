import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const axiosSecure = useAxiosSecure();
  axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;

  const { register, handleSubmit, reset } = useForm();
  const [itemData, setItemData] = useState(null); // State to store the fetched data

  // Function to fetch data
  const fetchItemData = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Add token if required
      const res = await axiosSecure.get(`/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // If token is required
        },
      });
      setItemData(res.data);
    } catch (error) {
      console.error("Error fetching item:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load item data. Please log in again.",
      });
    }
  };

  // Fetch the item data when the component is rendered
  if (!itemData) {
    fetchItemData();
    return <p>Loading...</p>; // Loading state
  }

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Upload image if necessary
      const imageFile = { image: data.image[0] };
      const res = await axiosSecure.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const updatedItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url,
        };

        // Update the menu item on the server
        const updateRes = await axiosSecure.patch(`/menu/${id}`, updatedItem);
        if (updateRes.data.modifiedCount > 0) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} has been updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <SectionTitle heading="Update an Item" subHeading="Refresh Info"></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Recipe Name */}
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              type="text"
              defaultValue={itemData.name} // Use fetched data
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>

          <div className="flex gap-6">
            {/* Category */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                defaultValue={itemData.category} // Use fetched data
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>

            {/* Price */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                type="number"
                defaultValue={itemData.price} // Use fetched data
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Recipe Details */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              defaultValue={itemData.recipe} // Use fetched data
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </label>

          {/* Image */}
          <div className="my-6 form-control w-full">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn btn-primary">Update Menu Item</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;

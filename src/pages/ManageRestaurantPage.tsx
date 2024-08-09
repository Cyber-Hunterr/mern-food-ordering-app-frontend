import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
  const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateMyRestaurant();
  const {restaurant} = useGetMyRestaurant();
  
  const isEditing = !!restaurant;
  
  return <ManageRestaurantForm 
    onSave={isEditing ? updateRestaurant: createRestaurant} 
    isLoading={isCreateLoading || isUpdateLoading} 
    restaurant={restaurant}
  />;
};

export default ManageRestaurantPage;
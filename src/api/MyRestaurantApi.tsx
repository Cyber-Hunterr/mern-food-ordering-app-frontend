import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  
  const getMyRestaurantRequest = async () : Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if(!response.ok){
      throw new Error("Failed to get restaurant");
    }
    
    return response.json();
  };
  
  const {data: restaurant, isLoading} = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
  
  return {restaurant, isLoading};
};

export const useCreateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  
  const createMyRestaurantRequest = async (restaurantFormData: FormData) : Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    
    if(!response.ok){
      throw new Error("Failed to create a new Restaurant");
    }
    
    return response.json();
  };
  
  const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createMyRestaurantRequest);
  
  if(isSuccess){
    toast.success("Restaurant created!");
  }
  
  if(error){
    toast.error("Unable to update restaurant");
  }
  
  return {createRestaurant, isLoading};
};

export const useUpdateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  
  const updateMyRestaurantRequest = async (restaurantFormData: FormData) : Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    
    if(!response.ok){
      throw new Error("Failed to update the Restaurant");
    }
    
    return response.json();
  };
  
  const {mutate: updateRestaurant, isLoading, isSuccess, error} = useMutation(updateMyRestaurantRequest);
  
  if(isSuccess){
    toast.success("Restaurant updated!");
  }
  
  if(error){
    toast.error("Unable to update restaurant");
  }
  
  return {updateRestaurant, isLoading};
};

export const useGetMyRestaurantOrders = () => {
  const {getAccessTokenSilently} = useAuth0();
  
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if(!response.ok){
      throw new Error("Failed to get restaurant orders");
    }
    
    return response.json();
  };
  
  const {data: orders, isLoading} = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest);
  
  return {orders, isLoading};
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const {getAccessTokenSilently} = useAuth0();
  
  const updateMyRestaurantOrderRequest = async (updateStatusOrderRequest : UpdateOrderStatusRequest) : Promise<Order> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders/${updateStatusOrderRequest.orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({status: updateStatusOrderRequest.status}),
    });
    
    if(!response.ok){
      throw new Error("Failed to update order status");
    }
    
    return response.json();
  };
  
  const {mutate: updateOrderStatus, isLoading, isSuccess, isError, reset} = useMutation(updateMyRestaurantOrderRequest);
  
  if(isSuccess){
    toast.success("Order status updated!");
  }
  
  if(isError){
    toast.error("Unable to update order status");
    reset();
  }
  
  return {updateOrderStatus, isLoading};
};
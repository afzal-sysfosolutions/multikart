// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useCartService = () => {
    const { get, post, loading } = useApiHelper();

    const AddToCartApi = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/AddToCart`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    const FetchCartApi = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/FetchCart`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const DeleteCartApi = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/DeleteItemFromCart`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const PlaceOrderApi = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/PlaceEPINOrder`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    


    return {
        DeleteCartApi,
        AddToCartApi,
        FetchCartApi,
        PlaceOrderApi,
        loading,
    };
};
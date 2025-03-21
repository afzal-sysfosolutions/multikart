// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useProductDetails = () => {
    const { get, post, loading } = useApiHelper();

    const productDtailsApiCalling = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/FetchProductDetails`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        productDtailsApiCalling,
        loading,
    };
};
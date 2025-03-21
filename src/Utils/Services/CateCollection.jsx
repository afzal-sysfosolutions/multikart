// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useCateCollection = () => {
    const { get, post, loading } = useApiHelper();

    const ApiCateCalling = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/FetchProductsPagination`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        ApiCateCalling,
        loading,
    };
};
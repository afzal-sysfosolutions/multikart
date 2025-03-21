// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useFatchCollection = () => {
    const { get, post, loading } = useApiHelper();

    const CollectionApiCalling = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        CollectionApiCalling,
        loading,
    };
};
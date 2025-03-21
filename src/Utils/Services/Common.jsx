// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useCommonService = () => {
    const { get, post, loading } = useApiHelper();

    const ApiCalling = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        ApiCalling,
        loading,
    };
};
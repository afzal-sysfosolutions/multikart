// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useTypeProduct = () => {
    const { get, post, loading } = useApiHelper();

    const ApiProductTypeCalling = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/FetchProductsByType`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        ApiProductTypeCalling,
        loading,
    };
};
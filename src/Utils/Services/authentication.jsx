// service.js
import { useApiHelper } from '@/Utils/AxiosUtils/ApiHelper';

export const useUserService = () => {
    const { get, post, loading } = useApiHelper();

    const userLogin = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const userRegister = async (payload) => {
        try {
            return await post(`${process.env.NEXT_PUBLIC_USER_REG}/Register`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const ChceckPinCode = async (payload) => {
        try {
            return await get(`${process.env.NEXT_PUBLIC_PINCODECHECK}/${payload}`);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        userLogin,
        userRegister,
        ChceckPinCode,
        loading,
    };
};
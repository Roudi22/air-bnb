// custom hook to get the user info from the server
import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
export const useGetUser = () => {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(['token']);
    useEffect(() => {
        const getUser = async () => {
        try {
            const token = cookies.token;
            if (!token) {
            setUser(null);
            
            return;
            }
            const res = await axios.get('/profile', {
            headers: {
                Authorization: token,
            },
            });
            setUser(res.data.user);
            
        } catch (error) {
            console.log(error);
            setUser(null);
        }
        };
        getUser();
    }, []);
    return {user};
}
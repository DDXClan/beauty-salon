'use client'
import apiAxios from "@/axios/axios";
import { useEffect, useState } from "react";

interface User {
    id: number
    username: string
    phone_number: string
    image: string
    role: string
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = apiAxios({
                method: 'GET',
                url: '/users/all'
            })
        }
    } )
    return ( <>
    
    </> );
}
 
export default Users;
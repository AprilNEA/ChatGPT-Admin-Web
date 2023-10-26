"use client"

import { useState } from 'react';
import swr from 'swr';

interface UserInfo {
    name: string;
    email: string;
    username: string;
    phone: string;
}

const useUserInfo = (): [UserInfo | null, (info: UserInfo) => void] => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const saveUserInfo = (info: UserInfo) => {
        setUserInfo(info);
    };

    return [userInfo, saveUserInfo];
};

export default useUserInfo;

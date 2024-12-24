import { useCallback, useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import {
    lookingForUserLoged,
    fetchwhoAmI,
    saveToken,
} from "@/services/userApi";
import useGetUser from "@/hooks/useGetUser";
import { modalSaved } from "@/utils/modal";
import useGetModal from "@/hooks/useGetModal";
import useLocalData from "@/hooks/useLocalData";
import { verifyUserAction } from "@/stores/actions/users";

function useLogedUser() {
    const searchParams = useSearchParams();
    const { handleAddUser } = useGetUser();
    const { handleOpenModal } = useGetModal({ modalType: "userOrders" });
    const router = useRouter();
    const { getLocalData } = useLocalData();
    const params = useParams();

    const tokenUser = searchParams.get("tokenUser");

    const gerUserLoged = useCallback(async () => {
        let user;
        try {
            // if (tokenUser) {
            //     user = await saveToken(tokenUser);
            // } else {
            //     const token = getLocalData("user");
            //     if (!token) {
            //         return false;
            //     }
            //     // user = await lookingForUserLoged(token);
            //     user = await fetchwhoAmI(token);
            // }
            // handleAddUser(user);
            const modal = modalSaved();
            if (modal) handleOpenModal(modal);
            // if (tokenUser) {
            //     router.push(`/${params.company}`);
            // }
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    }, []);

    return { gerUserLoged };
}

export default useLogedUser;

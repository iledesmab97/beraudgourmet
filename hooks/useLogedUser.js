import { useCallback, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { lookingForUserLoged, saveToken } from "@/services/userApi";
import useGetUser from "@/hooks/useGetUser";
import { modalSaved } from "@/utils/modal";
import useGetModal from "@/hooks/useGetModal";
import useLocalData from "@/hooks/useLocalData";

function useLogedUser() {
    const searchParams = useSearchParams();
    const { handleAddUser } = useGetUser();
    const { handleOpenModal } = useGetModal({ modalType: "userOrders" });
    const router = useRouter();
    const { getLocalData } = useLocalData();

    const tokenUser = searchParams.get("tokenUser");

    const gerUserLoged = useCallback(async () => {
        let user;
        if (tokenUser) {
            user = await saveToken(tokenUser);
        } else {
            const token = getLocalData("user");
            if (!token) {
                return false;
            }
            user = await lookingForUserLoged(token);
        }
        if (user.message) {
            alert(user.message);
            return false;
        }
        handleAddUser(user);
        const modal = modalSaved();
        if (modal) handleOpenModal(modal);
        if (tokenUser) {
            router.push("/menu");
        }
        return true;
    }, []);

    return { gerUserLoged };
}

export default useLogedUser;

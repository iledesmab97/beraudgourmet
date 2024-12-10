"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { verifyUserAction } from "@/stores/actions/users";

const possiblePaths = [
    "admin",
    "pizzas",
    "success",
    "not-found",
    "user-change-password",
    "user-verify",
];

const pathByRoles = {
    "client": [
        "/not-found",
        "/menu",
        "/",
        "/success",
        "/user-change-password",
        "/user-verify",
    ],
    pedestrians: [
        "/not-found",
        "/menu",
        "/user-change-password",
        "/user-verify",
        "/",
    ],
};

async function validateUser({ currentPath, user }) {
    const { path } = destructurePath(currentPath);
    let userLoged = user
    if (!userLoged) {
        userLoged = { RoleId: { name: "pedestrians" }};
    } 
    if (pathByRoles[userLoged.RoleId.name].includes(path)) return { allow: true };
    return { allow: false, path: pathByRoles[userLoged.RoleId.name][0] };
}

function destructurePath(path) {
    const arrayPartsPath = path.split("/");
    let correctPath = "";
    let extraPath = "";
    arrayPartsPath.forEach((partPath) => {
        if (possiblePaths.includes(partPath)) {
            correctPath = partPath;
        } else {
            extraPath = partPath;
        }
    });
    return { path: "/" + correctPath, token: extraPath };
}

function ProtectedRoute({ children }) {
    const [allowedPath, setAllowedPath] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useSelector(state => state.user)
    const firstTime = useRef(true)
    const dispatch = useDispatch()

    // Load user in Redux
    useEffect(() => {
        dispatch(verifyUserAction())
    }, [pathname])

    // Redirect the user
    useEffect(() => {
        if (!firstTime.current) return
        validateUser({ currentPath: pathname, user })
            .then((data) => {
                if (!data.allow) {
                    setAllowedPath(false);
                    router.push(data.path);
                } else {
                    setAllowedPath(true);
                }
            })
            .catch((error) => alert(error.message));
        firstTime.current = false
    }, [user])

    return allowedPath ? children : null;
}

export default ProtectedRoute;

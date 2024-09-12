"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { fetchwhoAmI } from "@/services/userApi";

const possiblePaths = [
    "admin",
    "pizzas",
    "success",
    "not-found",
    "user-change-password",
    "user-verify",
];

const pathByRoles = {
    3: [
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

async function validateUser(currentPath) {
    const { path } = destructurePath(currentPath);
    const userTokenString = localStorage.getItem("user");
    const userToken = userTokenString ? JSON.parse(userTokenString) : null;
    let user;
    if (userToken) {
        user = await fetchwhoAmI(userToken);
    } else {
        user = { RoleId: "pedestrians" };
    }
    if (pathByRoles[user.RoleId].includes(path)) return { allow: true };
    return { allow: false, path: pathByRoles[user.RoleId][0] };
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

    useEffect(() => {
        validateUser(pathname)
            .then((data) => {
                if (!data.allow) {
                    setAllowedPath(false);
                    router.push(data.path);
                } else {
                    setAllowedPath(true);
                }
            })
            .catch((error) => alert(error.message));
    }, [pathname]);

    return allowedPath ? children : null;
}

export default ProtectedRoute;

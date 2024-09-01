import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { fetchwhoAmI, whatHappen } from "@/services/userApi";
import { notFound } from "next/navigation";

export async function middleware(request) {
    return NextResponse.next();
}

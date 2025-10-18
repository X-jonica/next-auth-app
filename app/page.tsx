"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { SiAegisauthenticator } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuArrowRightLeft } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";

export default function Home() {
    const { data: session } = useSession();

    const handleSigninGithub = () => signIn("github");

    const handleSigninGoogle = () => signIn("google");

    const handleLogout = () => {
        const confirmation = window.confirm("Are you sure to logout ?");
        if (confirmation) {
            signOut();
        }
    };

    if (session) {
        console.log(session);
    }

    return (
        <>
            <div className="w-full h-screen">
                <header className="w-full flex flex-col">
                    <nav className="w-full flex flex-row justify-between items-center py-2 border-b-3 border-black/10">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-black/80">
                            <SiAegisauthenticator />
                            <span>NextAuth</span>
                        </h3>
                        {!session ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSigninGithub}
                                    className="flex items-center gap-2 bg-black/50 text-center text-sm text-white font-bole px-4 py-2 rounded-md hover:bg-black/60 cursor-pointer"
                                >
                                    <FaGithub size={20} />
                                    <span className="hidden md:block">
                                        Sign in with github
                                    </span>
                                </button>
                                <button
                                    onClick={handleSigninGoogle}
                                    className="flex items-center gap-2 border-3 border-blue-500/50 text-center text-sm text-black/80 font-bole px-4 py-2 rounded-md hover:border-blue-500/60 cursor-pointer"
                                >
                                    <FcGoogle size={20} />
                                    <span className="hidden md:block">
                                        Sign in with google
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 px-2">
                                <FaGithub size={30} />
                                <LuArrowRightLeft size={20} />
                                <FcGoogle size={30} />
                            </div>
                        )}
                    </nav>
                </header>
                <main>
                    {!session ? (
                        <div className="w-full h-screen my-8 mx-auto text-center">
                            <p className="text-3xl text-red-300">
                                You are not connected !
                            </p>
                            <p className="text-black/50 font-bold text-lg">
                                You can try to connect with you github or google
                                account
                            </p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-6 my-4">
                            <p className="text-xl lg:text-3xl font-bold text-green-500">
                                You are now connected
                            </p>
                            <div className="w-full flex flex-col items-center md:flex-row gap-4 md:items-center">
                                <img
                                    src={session.user?.image as string}
                                    alt="profile github"
                                    className="w-[90px] rounded-full mx-auto"
                                />
                                <div className="w-full overflow-x-scroll flex flex-col gap-1">
                                    <p className="flex gap-2 items-center text-black/50">
                                        <span className="underline w-20 sm:w-25 sm:text-lg">
                                            Username:{" "}
                                        </span>
                                        <span className="font-bold text-lg">
                                            {session.user?.name}
                                        </span>
                                    </p>
                                    <p className="flex gap-2 items-center text-black/50">
                                        <span className="underline w-20 sm:w-25 sm:text-lg">
                                            Email:{" "}
                                        </span>
                                        <span className="font-bold text-lg">
                                            {session.user?.email}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <p className="opacity-80">
                                Your token:{" "}
                                <span className="font-bold">
                                    {session.expires}
                                </span>
                            </p>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-400 text-white font-bold text-sm rounded-md cursor-pointer hover:bg-red-500"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

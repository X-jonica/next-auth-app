"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { SiAegisauthenticator } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export default function Home() {
    const { data: session } = useSession();

    const handleSignin = () => {
        signIn("github");
    };

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
                            <button
                                onClick={handleSignin}
                                className="flex items-center gap-2 bg-black/50 text-center text-sm text-white font-bole px-4 py-2 rounded-md hover:bg-black/60 cursor-pointer"
                            >
                                <FaGithub size={20} />
                                <span>Singin with github</span>
                            </button>
                        ) : (
                            <FaGithub size={30} />
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
                                You can try to connect with you github account
                            </p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-4 my-4">
                            <p className="text-xl lg:text-3xl font-bold text-green-500">
                                You are now connected
                            </p>
                            <div className="w-full flex flex-col md:flex-row gap-4 md:items-center">
                                <img
                                    src={session.user?.image as string}
                                    alt="profile github"
                                    className="w-[80px] rounded-full"
                                />
                                <div className="w-full flex flex-col gap-1">
                                    <p className="text-sm text-black/50">
                                        <span className="font-bold underline">
                                            Username:{" "}
                                        </span>
                                        {session.user?.name}
                                    </p>
                                    <p className="text-sm text-black/50">
                                        <span className="font-bold underline">
                                            Email:{" "}
                                        </span>
                                        {session.user?.email}
                                    </p>
                                </div>
                            </div>
                            <p className="opacity-80">
                                token expire:{" "}
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

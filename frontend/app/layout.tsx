"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="h-full">
            <body className="bg-bg bg-cover h-full">
                <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
                <div className="relative z-20">
                    <ApolloProvider client={client}>
                        <Navbar />
                        {children}
                    </ApolloProvider>
                </div>
            </body>
        </html>
    );
}

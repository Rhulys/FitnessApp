"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 h-14">
            <ul className="flex gap-4 font-bold">
                <li>
                    <Link href="/">
                        <motion.p whileHover={{ scale: 1.2, color: "#00bfff" }}>
                            Inicio
                        </motion.p>
                    </Link>
                </li>
                <li>
                    <Link href="/activities">
                        <motion.p whileHover={{ scale: 1.2, color: "#00bfff" }}>
                            Atividades
                        </motion.p>
                    </Link>
                </li>
                <li>
                    <Link href="/goals">
                        <motion.p whileHover={{ scale: 1.2, color: "#00bfff" }}>
                            Metas
                        </motion.p>
                    </Link>
                </li>
                <li>
                    <Link href="/users">
                        <motion.p whileHover={{ scale: 1.2, color: "#00bfff" }}>
                            Usuários
                        </motion.p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

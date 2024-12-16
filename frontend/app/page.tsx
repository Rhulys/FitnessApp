"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-56px)]">
            <motion.h1
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                className="text-3xl font-bold mb-4"
            >
                Bem vindo ao Fitness App!
            </motion.h1>
            <p className="mb-6">Escolha uma das opções para começar:</p>
            <div className="flex gap-4">
                <Link href="/activities">
                    <motion.p
                        whileHover={{ scale: 1.1 }}
                        className="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600"
                    >
                        Gerenciar Atividades
                    </motion.p>
                </Link>
                <Link href="/goals">
                    <motion.p
                        whileHover={{ scale: 1.1 }}
                        className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600"
                    >
                        Gerenciar Metas
                    </motion.p>
                </Link>
                <Link href="/users">
                    <motion.p
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-500 text-white p-4 rounded shadow hover:bg-red-600"
                    >
                        Gerenciar Usuários
                    </motion.p>
                </Link>
            </div>
            <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                }}
                className="w-1/2 mt-4 font-bold text-center"
            >
                Transforme sua jornada de saúde e bem-estar com nosso
                aplicativo. Registre suas atividades físicas, visualize gráficos
                de progresso e estabeleça metas para conquistar resultados
                incríveis. Cuide do seu corpo e alcance seus objetivos de forma
                simples e eficaz!
            </motion.p>
        </div>
    );
}

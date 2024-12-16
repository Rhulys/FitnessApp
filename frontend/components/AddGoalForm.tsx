"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_GOAL = gql`
    mutation AddGoal($userId: ID!, $target: String!, $progress: Int!) {
        addGoal(userId: $userId, target: $target, progress: $progress) {
            id
            name
            goals {
                target
                progress
            }
        }
    }
`;

export default function AddGoalForm({ userId }: { userId: string }) {
    const [target, setTarget] = useState<string>("");
    const [progress, setProgress] = useState<number | "">("");
    const [error, setError] = useState<boolean>();
    const [sent, setSent] = useState<boolean>();
    const [addGoal] = useMutation(ADD_GOAL);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!target || progress === "") {
            setError(true)
        }
        try {
            await addGoal({
                variables: { userId, target, progress: Number(progress) },
            });
            setError(false)
            setTarget("");
            setProgress("");
        } catch (error) {
            setError(true)
        }
        setSent(true);
        
        setTimeout(() => {
            setSent(false)
        }, 2000)
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
            <input
                type="text"
                placeholder="Meta (ex: Correr 10 km)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="border p-2 rounded text-black"
            />
            <input
                type="number"
                placeholder="Progresso inicial (ex: 2 km)"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="border p-2 rounded text-black"
            />
            <p>Todos os campos são Obrigatórios*</p>

            {sent ? (
                <div className="flex flex-col items-center w-full">
                    {error == true ? (
                        <p className="bg-red-500 p-2 w-1/3 rounded-md font-bold text-center">
                            Erro ao registrar meta
                        </p>
                    ) : (
                        <p className="bg-green-500 p-2 w-1/3 rounded-md font-bold text-center">
                            Meta registrada com sucesso!
                        </p>
                    )}
                </div>
            ) : (
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded font-bold"
                >
                    Registrar Meta
                </button>
            )}
        </form>
    );
}

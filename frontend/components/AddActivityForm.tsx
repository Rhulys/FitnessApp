"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_ACTIVITY = gql`
    mutation AddActivity(
        $userId: ID!
        $date: String!
        $type: String!
        $duration: Int!
    ) {
        addActivity(
            userId: $userId
            date: $date
            type: $type
            duration: $duration
        ) {
            id
            name
            activities {
                date
                type
                duration
            }
        }
    }
`;

export default function AddActivityForm({ userId }: { userId: string }) {
    const [date, setDate] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [error, setError] = useState<boolean>();
    const [sent, setSent] = useState<boolean>();
    const [duration, setDuration] = useState<number | "">("");
    const [addActivity] = useMutation(ADD_ACTIVITY);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !type || !duration) {
            setError(true)
        }
        try {
            await addActivity({
                variables: { userId, date, type, duration: Number(duration) },
            });
            setError(false);
            setDate("");
            setType("");
            setDuration("");
        } catch (error) {
            setError(true);
        }

        setSent(true);
        
        setTimeout(() => {
            setSent(false)
        }, 2000)
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 rounded text-black"
                placeholder="Data"
            />
            <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 rounded text-black"
                placeholder="Tipo de Atividade (ex: Corrida)"
            />
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="border p-2 rounded text-black"
                placeholder="Duração (minutos)"
            />
            <p>Todos os campos são Obrigatórios*</p>

            {sent ? (
                <div className="flex flex-col items-center w-full">
                    {error == true ? (
                        <p className="bg-red-500 p-2 w-1/3 rounded-md font-bold text-center">
                            Erro ao registrar atividade
                        </p>
                    ) : (
                        <p className="bg-green-500 p-2 w-1/3 rounded-md font-bold text-center">
                            Atividade registrada com sucesso!
                        </p>
                    )}
                </div>
            ) : (
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded font-bold"
                >
                    Registrar Atividade
                </button>
            )}
        </form>
    );
}

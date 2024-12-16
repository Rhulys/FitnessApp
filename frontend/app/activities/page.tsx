"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import AddActivityForm from "@/components/AddActivityForm";
import ActivityChart from "@/components/ActivityChart";
import { useState } from "react";
import { motion } from "framer-motion";

const GET_USERS = gql`
    query {
        users {
            id
            name
            activities {
                id
                date
                type
                duration
            }
        }
    }
`;

const UPDATE_ACTIVITY = gql`
    mutation UpdateActivity(
        $userId: ID!
        $activityId: ID!
        $date: String
        $type: String
        $duration: Int
    ) {
        updateActivity(
            userId: $userId
            activityId: $activityId
            date: $date
            type: $type
            duration: $duration
        ) {
            id
            date
            type
            duration
        }
    }
`;

const DELETE_ACTIVITY = gql`
    mutation DeleteActivity($userId: ID!, $activityId: ID!) {
        deleteActivity(userId: $userId, activityId: $activityId) {
            id
        }
    }
`;

export default function ActivitiesPage() {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [updateActivity] = useMutation(UPDATE_ACTIVITY);
    const [deleteActivity] = useMutation(DELETE_ACTIVITY);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [editActivity, setEditActivity] = useState<any | null>(null);
    const [errUpdate, setErrUpdate] = useState(false);
    const [sentEdit, setSentEdit] = useState(false);
    const [errDelete, setErrDelete] = useState(false);
    const [sentDelete, setSentDelete] = useState(false);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Error ao carregar atividades: {error.message}</p>;

    const users = data.users;

    const selectedUser = users.find((user: any) => user.id === selectedUserId);

    const handleEdit = async () => {
        if (!editActivity) return;
        try {
            await updateActivity({
                variables: {
                    userId: selectedUserId,
                    activityId: editActivity.id,
                    date: editActivity.date,
                    type: editActivity.type,
                    duration: editActivity.duration,
                },
            });
            setErrUpdate(false);

            setTimeout(() => {
                setEditActivity(null);
                setSentEdit(false);
            }, 2000);

            refetch();
        } catch (err) {
            setErrUpdate(true);
        }

        setSentEdit(true);
    };

    const handleDelete = async (activityId: string) => {
        try {
            await deleteActivity({
                variables: { userId: selectedUserId, activityId },
            });
            setErrDelete(false);

            setTimeout(() => {
                setSentDelete(false);
            }, 2000);

            refetch();
        } catch (err) {
            setErrDelete(true);
        }

        setSentDelete(true);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Atividades</h1>

            <select
                value={selectedUserId || ""}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="border p-2 rounded mb-4 text-black"
            >
                <option value="">Selecione um usuário</option>
                {users.map((user: any) => (
                    <option value={user.id} key={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {selectedUser ? (
                <motion.div initial={{ scale: 1 }}
                animate={{ scale: [0, 1] }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}>
                    {editActivity ? (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold">
                                Editar Atividade
                            </h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEdit();
                                }}
                                className="flex flex-col gap-2 mt-4"
                            >
                                <input
                                    type="date"
                                    value={editActivity.date}
                                    onChange={(e) =>
                                        setEditActivity({
                                            ...editActivity,
                                            date: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded text-black"
                                />
                                <input
                                    type="text"
                                    value={editActivity.type}
                                    onChange={(e) =>
                                        setEditActivity({
                                            ...editActivity,
                                            type: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded text-black"
                                />
                                <input
                                    type="number"
                                    value={editActivity.duration}
                                    onChange={(e) =>
                                        setEditActivity({
                                            ...editActivity,
                                            duration: Number(e.target.value),
                                        })
                                    }
                                    className="border p-2 rounded text-black"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={() => setEditActivity(null)}
                                    className="bg-gray-500 text-white p-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </form>
                            {sentEdit && (
                                <div className="flex flex-col items-center w-full my-4">
                                    {errUpdate ? (
                                        <p className="bg-red-500 p-3 rounded-lg font-bold">
                                            Erro ao atualizar atividade
                                        </p>
                                    ) : (
                                        <p className="bg-green-500 p-3 rounded-lg font-bold">
                                            Atividade atualizada com sucesso!
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <AddActivityForm userId={selectedUser.id} />
                    )}
                    <ul className="mt-6">
                        {sentDelete && (
                            <div className="flex flex-col items-center w-full my-4">
                                {errDelete ? (
                                    <p className="bg-red-500 p-3 rounded-lg font-bold">
                                        Erro ao Deletar atividade
                                    </p>
                                ) : (
                                    <p className="bg-green-500 p-3 rounded-lg font-bold">
                                        Atividade Deletada com sucesso!
                                    </p>
                                )}
                            </div>
                        )}
                        {selectedUser.activities.map(
                            (activity: any, index: number) => (
                                <li
                                    key={index}
                                    className="border p-2 rounded mb-2 flex justify-between items-center bg-gray-100 text-black font-bold"
                                >
                                    <div>
                                        {new Date(
                                            Number(activity.date)
                                        ).toLocaleDateString("pt-BR", {
                                            timeZone: "UTC",
                                        })}{" "}
                                        - {activity.type} ({activity.duration}{" "}
                                        min)
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setEditActivity(activity)
                                            }
                                            className="bg-yellow-500 text-white p-2 rounded"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(activity.id)
                                            }
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                    <ActivityChart activities={selectedUser.activities} />
                </motion.div>
            ) : (
                <p>Por favor, selecione um usuário para ver as atividades.</p>
            )}
        </div>
    );
}

"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import AddGoalForm from "@/components/AddGoalForm";
import GoalChart from "@/components/GoalChart";
import { motion } from "framer-motion";

const GET_USERS = gql`
    query {
        users {
            id
            name
            goals {
                id
                target
                progress
            }
        }
    }
`;

const UPDATE_GOAL = gql`
    mutation UpdateGoal(
        $userId: ID!
        $goalId: ID!
        $target: String
        $progress: Int
    ) {
        updateGoal(
            userId: $userId
            goalId: $goalId
            target: $target
            progress: $progress
        ) {
            id
            target
            progress
        }
    }
`;

const DELETE_GOAL = gql`
    mutation DeleteGoal($userId: ID!, $goalId: ID!) {
        deleteGoal(userId: $userId, goalId: $goalId) {
            id
        }
    }
`;

export default function GoalsPage() {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [updateGoal] = useMutation(UPDATE_GOAL);
    const [deleteGoal] = useMutation(DELETE_GOAL);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [editGoal, setEditGoal] = useState<any | null>(null);
    const [errUpdate, setErrUpdate] = useState(false);
    const [sentEdit, setSentEdit] = useState(false);
    const [errDelete, setErrDelete] = useState(false);
    const [sentDelete, setSentDelete] = useState(false);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar metas: {error.message}</p>;

    const users = data.users;
    const selectedUser = users.find((user: any) => user.id === selectedUserId);

    const handleEdit = async () => {
        if (!editGoal) return;
        try {
            await updateGoal({
                variables: {
                    userId: selectedUserId,
                    goalId: editGoal.id,
                    target: editGoal.target,
                    progress: editGoal.progress,
                },
            });
            setErrUpdate(false);

            setTimeout(() => {
                setEditGoal(null);
                setSentEdit(false);
            }, 2000);

            refetch();
        } catch (err) {
            setErrUpdate(true);
        }

        setSentEdit(true);
    };

    const handleDelete = async (goalId: string) => {
        try {
            await deleteGoal({
                variables: { userId: selectedUserId, goalId },
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
            <h1 className="text-3xl font-bold mb-4">Metas</h1>

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
                    {editGoal ? (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold">Editar Meta</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEdit();
                                }}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="text"
                                    value={editGoal.target}
                                    onChange={(e) =>
                                        setEditGoal({
                                            ...editGoal,
                                            target: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded text-black"
                                />
                                <input
                                    type="number"
                                    value={editGoal.progress}
                                    onChange={(e) =>
                                        setEditGoal({
                                            ...editGoal,
                                            progress: Number(e.target.value),
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
                                    onClick={() => setEditGoal(null)}
                                    className="bg-gray-500 text-white p-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </form>
                            {sentEdit && (
                                <div className="flex flex-col items-center w-full my-4">
                                    {errUpdate ? (
                                        <p className="bg-red-500 p-3 rounded-lg font-bold">
                                            Erro ao atualizar meta
                                        </p>
                                    ) : (
                                        <p className="bg-green-500 p-3 rounded-lg font-bold">
                                            Meta atualizada com sucesso!
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <AddGoalForm userId={selectedUser.id} />
                    )}
                    <ul className="mt-6">
                        {sentDelete && (
                            <div className="flex flex-col items-center w-full my-4">
                                {errDelete ? (
                                    <p className="bg-red-500 p-3 rounded-lg font-bold">
                                        Erro ao Deletar meta
                                    </p>
                                ) : (
                                    <p className="bg-green-500 p-3 rounded-lg font-bold">
                                        Meta Deletada com sucesso!
                                    </p>
                                )}
                            </div>
                        )}
                        {selectedUser.goals.map((goal: any, index: number) => (
                            <li
                                key={goal.id}
                                className="border p-4 rounded mb-4 flex justify-between items-center bg-gray-100 text-black font-bold"
                            >
                                <div>
                                    {goal.target} ({goal.progress})
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditGoal(goal)}
                                        className="bg-yellow-500 text-white p-2 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(goal.id)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <GoalChart goals={selectedUser.goals} />
                </motion.div>
            ) : (
                <p>Por favor, selecione um usuário para ver as metas.</p>
            )}
        </div>
    );
}

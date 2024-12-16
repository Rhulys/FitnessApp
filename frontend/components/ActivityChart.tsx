"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Activity = {
    date: string | number;
    type: string;
    duration: number;
};

export default function ActivityChart({
    activities,
}: {
    activities: Activity[];
}) {
    const data = activities.map((activity) => ({
        date: new Date(Number(activity.date)).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        }),
        duration: activity.duration,
    }));

    if (data.length === 0) {
        return (
            <p className="mt-4 text-gray-500">
                Nenhuma atividade registrada ainda.
            </p>
        );
    }

    return (
        <div className="mt-4 bg-gray-100 text-center">
            <h2 className="text-xl font-bold text-black uppercase py-5">Progresso das Atividades</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#006400" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

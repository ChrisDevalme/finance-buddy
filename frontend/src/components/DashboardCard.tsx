interface DashboardCardProps {
    label: string;
    value: number;
}

export default function DashboardCard({ label, value }: DashboardCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">{label}</p>
            <h2 className="text-2xl font-bold">
                ${value.toLocaleString()}
            </h2>
        </div>
    );
}
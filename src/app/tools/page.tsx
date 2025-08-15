import Link from 'next/link';

export default function ToolsPage() {
    return (
        <main className="max-w-7xl mx-auto h-screen py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Finance Tools</h1>
            <ul className="space-y-4">
                <li className="border rounded p-4 hover:shadow transition">
                    <Link href="/tools/budget-calculator" className="text-xl font-semibold text-blue-800 hover:underline">
                        Budget Calculator (50/30/20 Rule)
                    </Link>
                    <p className="text-gray-600 mt-2">
                        Easily plan your budget using the popular 50/30/20 rule to manage needs, wants, and savings.
                    </p>
                </li>
            </ul>
        </main>
    );
}
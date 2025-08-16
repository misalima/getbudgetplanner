import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ToolsPage() {
    return (
        <main className="max-w-7xl mx-auto min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Finance Tools</h1>
            <div className="grid gap-6 w-full">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>
                            <Link href="/tools/budget-calculator" className="text-xl font-semibold text-blue-800 dark:text-blue-300 hover:underline">
                                Budget Calculator (50/30/20 Rule)
                            </Link>
                        </CardTitle>
                        <CardDescription>
                            Easily plan your budget using the popular 50/30/20 rule to manage needs, wants, and savings.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </main>
    );
}
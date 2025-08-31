import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session } = authClient.useSession();

    if (!session) {
        redirect("/login")
    }

    return (
        <div>
            <div>
                <div>
                    <h2>Logo</h2>
                </div>
                <div>
                    <h2>{session.user.name}</h2>
                </div>
            </div>
            {children}
        </div>
    )
}
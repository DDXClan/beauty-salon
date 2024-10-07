import * as React from "react"
 
import { Progress } from "@/components/ui/progress"
export function Loading() {
    const [loading, setLoading] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(80), 500)
        return () => clearTimeout(timer)
    }, [])

    return <Progress value={loading} className="w-[60%]" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
}
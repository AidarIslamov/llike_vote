import { useIdeas } from "@/api/useIdeas"

export function Ideas() {
    const {data} = useIdeas();
    console.log({data})
    return 'test'
}
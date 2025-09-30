import { useIdeas } from "@/api/useIdeas"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Idea } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function Ideas() {
    const {data: ideas, isLoading} = useIdeas({include: ['votesCount']});
    console.log(ideas)
    return (
        <Card className="min-w-[500px]">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead className="w-[100px]">Votes</TableHead>
                            <TableHead className="w-[100px] text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            [...Array(3)].map((_, key) => (
                                <TableRow key={key}>
                                    <TableCell className="font-medium"><Skeleton className="bg-zinc-100 h-7" /></TableCell>
                                    <TableCell><Skeleton className="bg-zinc-100 h-7" /></TableCell>
                                    <TableCell><Skeleton className="bg-zinc-100 h-7" /></TableCell>
                                    <TableCell><Skeleton className="bg-zinc-100 h-7" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            ideas?.map((idea: Idea) => (
                                <TableRow key={idea.id}>
                                    <TableCell className="font-medium">{idea.id}</TableCell>
                                    <TableCell>{idea.title}</TableCell>
                                    <TableCell>WIP!!!</TableCell>
                                    <TableCell className="text-right">WIP!!!</TableCell>
                                </TableRow>
                            ))
                        )}
 
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
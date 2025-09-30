import { useIdeas } from "@/api/useIdeas"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Idea } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

export function Ideas() {
    const {data: ideas} = useIdeas({include: ['votes']});
    console.log(ideas)
    return (
        <Card className="min-w-[500px]">
            <CardContent>
                <Table>
                    <TableCaption>A list of ideas.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead className="w-[100px]">Votes</TableHead>
                            <TableHead className="w-[100px] text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ideas?.map((idea: Idea) => (
                            <TableRow>
                                <TableCell className="font-medium">{idea.id}</TableCell>
                                <TableCell>{idea.title}</TableCell>
                                <TableCell>WIP!!!</TableCell>
                                <TableCell className="text-right">WIP!!!</TableCell>
                            </TableRow>
                        ))}       
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
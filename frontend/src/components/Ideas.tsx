import { useIdeas } from "@/api/useIdeas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Idea, VoteError } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export function Ideas() {
  const { data, isLoading } = useIdeas();
  const {data: ideas, limitExceeded} = data || {};
  const [canVote, setCanVote] = useState<boolean>(false); 

  async function handleClick(ideaId: number) {
    try {
      await api.post(`vote/${ideaId}`);
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    } catch (error) {
      const errorData = error as VoteError;
        if (errorData.canVote === false) {
          setCanVote(false);
        }
    }
  }

  useEffect(() => {
    if (limitExceeded !== undefined) {
      setCanVote(!limitExceeded)
    }
  }, [limitExceeded])

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
            {isLoading
              ? [...Array(3)].map((_, key) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      <Skeleton className="bg-zinc-100 h-7" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="bg-zinc-100 h-7" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="bg-zinc-100 h-7" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="bg-zinc-100 h-7" />
                    </TableCell>
                  </TableRow>
                ))
              : ideas?.map((idea: Idea) => (
                  <TableRow key={idea.id}>
                    <TableCell className="font-medium">{idea.id}</TableCell>
                    <TableCell>{idea.title}</TableCell>
                    <TableCell>{idea.votesCount ?? 0}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="success"
                        onClick={() => handleClick(idea.id)}
                        disabled={!canVote || !idea.enableVote}
                      >
                        Vote
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

"use client"


import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../../ui/button";
import { HistoryIcon } from "lucide-react";
import { useGetLogs } from "@/hooks/useGetLogs";
import { Table, TableBody, TableCaption } from "../../ui/table";
import { Log } from "./log";
import { usePrivy } from "@privy-io/react-auth";




export function Logs() {

   const { user } = usePrivy();
   console.log(user);
   const address = user?.wallet?.address as `0x${string}`;
   console.log(address);
   
   const { logs } = useGetLogs(address);
   console.log(logs)


    return (
        <>
        <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="max-w-fit h-12 rounded-2xl">
                        <HistoryIcon className="text-yellow-600" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full">
                <div className="mx-auto w-full max-w-sm pb-6">
                    <DrawerHeader>
                        <DrawerTitle>
                            History
                        </DrawerTitle>
                        <DrawerDescription className="max-md:text-[0.9rem]">View your fleet order history.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 p-4 pb-0">
                        <div className="flex w-full ml-2 text-sm font-bold">
                            <span className="w-1/4">Fleet</span>
                            <span className="w-1/4">No.</span>
                            <span className="w-1/4">Txn</span>
                            <span className="w-1/4">Date</span>
                        </div>
                        <Table>
                            <TableCaption className="mt-12">A list of your recent fleet orders.</TableCaption>
                            <TableBody>
                                <div className="h-64">
                                    {
                                        logs?.map((log) => (
                                            <Log key={log.transactionHash} log={log} />
                                        ))
                                    }
                                </div>        
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <DrawerFooter></DrawerFooter>
                </DrawerContent>
        </Drawer>
        </>
    );
}
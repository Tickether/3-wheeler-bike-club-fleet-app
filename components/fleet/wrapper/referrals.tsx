import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Gift, UserX } from "lucide-react";
import { Invitation } from "./invitation";

export function Referrals() {
    return (
        <div className="flex flex-col h-full w-full gap-6">
            <div className="flex w-full justify-center">
                <Alert className="w-full max-w-[66rem]">
                    <Gift className="h-4 w-4" />
                    <AlertTitle className="font-bold"> Manage Invites!</AlertTitle>
                    <AlertDescription className="text-xs italic">
                        <p className="max-md:text-[11px]">Refer your friends & earn rewards</p>
                        
                    </AlertDescription>
                </Alert>
            </div>

            <div className="flex w-full items-center justify-center">
                <div className="flex w-full max-w-[66rem] gap-4">
                    <div className="flex w-full gap-2 justify-between">
                        <div/>
                        <div className="flex gap-2">
                            <Invitation />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-center">
                {true && (
                    <div className="flex w-full h-full max-w-[66rem] gap-4">
                        <div className="flex flex-col w-full h-full items-center pt-36 max-md:pt-18 gap-4">
                            <UserX className="h-40 w-40 max-md:h-30 max-md:w-30 text-yellow-500" />
                            <p className="text-2xl max-md:text-xl text-center font-bold">No referrals yet.</p>
                            <p className="text-sm max-md:text-xs text-center text-muted-foreground">Send invites to your friends to start earning rewards.</p>
                        </div>
                    </div>
                    )
                }
            </div>
            
        </div>
    )
}
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

function UnauthorizedDialog({
  showDialog,
  setIsDialogOpen,
}: {
  showDialog: boolean;
  setIsDialogOpen: () => void;
}) {
  return (
    <Dialog open={showDialog} onOpenChange={setIsDialogOpen} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log in to continue</DialogTitle>
          <DialogDescription>
            Please log in or create an account to access all features.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href="/register">
            <Button variant="link">Create an account</Button>
          </Link>
          <Link href="/login">
            <Button>Log in</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UnauthorizedDialog;

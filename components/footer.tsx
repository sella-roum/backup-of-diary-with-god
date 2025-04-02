import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        {/* <div className="flex items-center justify-center gap-1 mb-2">
          <span className="text-sm text-muted-foreground">Made with</span>
          <Heart className="h-4 w-4 text-destructive fill-destructive" />
          <span className="text-sm text-muted-foreground">and prayer</span>
        </div> */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DIARY WITH GOD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

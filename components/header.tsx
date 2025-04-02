"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, BookOpen } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b py-4 sticky top-0 z-10 backdrop-blur-md bg-background/95">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl font-medium flex items-center gap-2 text-primary"
        >
          <BookOpen className="h-6 w-6" />
          <span>DIARY WITH GOD</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="テーマ切り替え"
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {/* <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  このブログについて
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </header>
  );
}

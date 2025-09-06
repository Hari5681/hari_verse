
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Menu, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/music', label: 'Music' },
    { href: '/movies', label: 'Movies' },
    { href: '/ai-tools', label: 'AI Tools' },
    { href: '/about-me', label: 'About Me' },
    { href: '/contact', label: 'Contact' },
];

const Header = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="flex items-center gap-2">
                     <Sparkles className="w-6 h-6 text-primary" />
                     <span className="text-xl font-bold font-headline text-primary-foreground">HariVerse</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => (
                        <Button key={item.href} asChild variant="ghost">
                             <Link href={item.href} className={cn(
                                 "font-headline",
                                 pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                             )}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-xs bg-background/80 backdrop-blur-xl">
                            <SheetHeader className="p-4 border-b border-border/50">
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                                    <Sparkles className="w-6 h-6 text-primary" />
                                    <span className="text-xl font-bold font-headline text-primary-foreground">HariVerse</span>
                                </Link>
                            </SheetHeader>
                            <div className="flex flex-col items-start gap-4 p-4">
                                {navItems.map((item) => (
                                    <Button key={item.href} asChild variant="link" className="w-full justify-start text-lg">
                                        <Link href={item.href} onClick={closeMobileMenu} className={cn(
                                            "font-headline",
                                            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                                        )}>
                                            {item.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default Header;

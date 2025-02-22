'use client';
import {
  CircleDollarSign,
  LayoutDashboard,
  PanelRight,
  PiggyBank,
  ReceiptText,
  Shield,
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Link from 'next/link';

// Menu items.
const items = [
  {
    id: 1,
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: 'Budgets',
    url: '/dashboard/budgets',
    icon: PiggyBank,
  },
  {
    id: 3,
    title: 'Incomes',
    url: '/dashboard/incomes',
    icon: CircleDollarSign,
  },
  {
    id: 4,
    title: 'Expenses',
    url: '/dashboard/expenses',
    icon: ReceiptText,
  },
  // {
  //   id: 5,
  //   title: 'Upgrade',
  //   url: '/dashboard/upgrade',
  //   icon: Shield,
  // },
];

export function SideNav() {
  const path = usePathname();
  const user = useUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className='fixed right-4 sm:right-10 top-6 z-50 cursor-pointer'
          aria-label='Open navigation menu'
        >
          <PanelRight size={25} />
        </div>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle className='p-4 flex items-center gap-x-3'>
            {user.isLoaded && user.user ? (
              <>
                <UserButton />
                <span className='hidden sm:block text-2xl font-bold text-left line-clamp-1'>
                  {user.user.fullName}
                </span>
                <span className='sm:hidden text-2xl font-bold text-left line-clamp-1'>
                  {user.user.firstName}
                </span>
              </>
            ) : (
              <span className='text-2xl font-bold text-left'>FinWise</span>
            )}
          </SheetTitle>
        </SheetHeader>
        <div>
          {items.map((item) => (
            <SheetClose asChild key={item.id}>
              <Link
                href={item.url}
                className={`flex cursor-pointer items-center space-x-4 rounded-full p-4 transition-all duration-300 hover:font-bold hover:bg-slate-200 dark:hover:bg-slate-800 ${
                  path === item.url
                    ? 'font-bold bg-slate-400 dark:bg-slate-900'
                    : ''
                }`}
                aria-label={`Navigate to ${item.title}`}
              >
                <span className='flex w-6 items-center justify-center'>
                  <item.icon />
                </span>
                <span>{item.title}</span>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { type LucideProps, Newspaper, UserCircle2 } from "lucide-react";

interface IPageNav {
  id: number;
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const navList: IPageNav[] = [
  {
    id: 2,
    title: "Профиль",
    href: "/profile",
    icon: UserCircle2,
  },
  {
    id: 1,
    title: "Лента",
    href: "/feat",
    icon: Newspaper,
  },
];

import { format } from "date-fns";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = ({ selected }: { selected: number }) => {
  const LOGO_PATH = "/assets/logo.png";

  switch (selected) {
    case 1:
      return (
        <div className="bg-black text-white flex justify-between items-center p-3">
          <div className="flex flex-row gap-8 items-center">
            <Link href={"/"}>
              <Image
                src={LOGO_PATH ?? ""}
                alt="web_logo"
                width={54}
                height={54}
                className="w-14"
              />
            </Link>
            <div className="space-x-4 text-sm">
              {categories.map((menu, idx) => (
                <Link
                  key={idx}
                  href={`/category/${menu.slug}`}
                  className="font-semibold hover:border-b-2 border-red-700 pb-1"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex border border-gray-500 rounded-full px-4 py-1 gap-2 items-center">
            <input type="search" />
            <Search size={18} />
          </div>
        </div>
      );

    case 2:
      return (
        <div>
          <div className="flex flex-row justify-between py-4 px-8 items-center">
            <p className="text-sm">{format(new Date(), "dd MMM yyyy")}</p>
            <Link href={"/"}>
              <Image
                src={LOGO_PATH ?? ""}
                alt="web_logo"
                width={54}
                height={54}
                className="w-14"
              />
            </Link>
            <div className="flex border border-gray-500 rounded-full px-4 py-1 gap-2 items-center">
              <input type="search" />
              <Search size={18} />
            </div>
          </div>
          <div className="border-y">
            <div className="place-self-center flex space-x-4 py-1">
              {categories.map((menu, idx) => (
                <Link
                  key={idx}
                  href={`/category/${menu.slug}`}
                  className="font-semibold border-b-2 border-transparent hover:border-red-700 pb-1"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="bg-white text-black flex justify-between items-center p-3">
          <div className="flex flex-row gap-10 items-center">
            <Link href={"/"}>
              <Image
                src={LOGO_PATH ?? ""}
                alt="web_logo"
                width={54}
                height={54}
                className="w-14"
              />
            </Link>
            <div className="space-x-4 text-sm">
              {categories.map((menu, idx) => (
                <Link
                  key={idx}
                  href={`/category/${menu.slug}`}
                  className="font-semibold hover:border-b-2 border-red-700 pb-1"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex border border-gray-500 rounded-full px-4 py-1 gap-2 items-center">
            <input type="search" />
            <Search size={18} />
          </div>
        </div>
      );

    case 4:
      return (
        <div className="bg-black text-white flex justify-between items-center p-3">
          <Link href={"/"}>
            <Image
              src={LOGO_PATH ?? ""}
              alt="web_logo"
              width={54}
              height={54}
              className="w-14"
            />
          </Link>
          <div className="space-x-4 text-sm">
            {categories.map((menu, idx) => (
              <Link
                key={idx}
                href={`/category/${menu.slug}`}
                className="font-semibold hover:border-b-2 border-red-700 pb-1"
              >
                {menu.name}
              </Link>
            ))}
          </div>
          <div className="flex border border-gray-500 rounded-full px-4 py-1 gap-2 items-center">
            <input type="search" />
            <Search size={18} />
          </div>
        </div>
      );
  }
};

const categories = [
  { name: "World News", slug: "world-news" },
  { name: "Technology", slug: "technology" },
  { name: "Health", slug: "health" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
];

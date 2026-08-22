import "./globals.css";
import Link from "next/link";
export const metadata={title:"LUMA Store",description:"A colorful mini e-commerce storefront"};
export default function Layout({children}:{children:React.ReactNode}){return <><header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur"><div className="container-page flex min-h-16 items-center justify-between"><Link href="/shop" className="text-2xl font-black">LUMA<span className="text-[#ff6b6b]">.</span></Link><nav className="flex gap-2 text-sm font-bold"><Link href="/shop" className="rounded-lg px-3 py-2 hover:bg-[#f4f1fb]">Shop</Link><Link href="/shop/checkout" className="rounded-lg px-3 py-2 hover:bg-[#f4f1fb]">Checkout</Link></nav></div></header>{children}</>}

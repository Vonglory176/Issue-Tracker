import { BugIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
            <Link href="/"><BugIcon className='w-6 h-6' /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => (
                    <li key={link.href}><Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href={link.href}>{link.label}</Link></li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar

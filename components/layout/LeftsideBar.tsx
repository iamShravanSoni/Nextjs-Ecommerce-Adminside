"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { navLinks} from '@/lib/constants';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function LeftsideBar() {

  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBhUIBxAWFRUXGRcXExgYGRUaFRgfIB4YHxsZFhgaHiggHRsmIB0YIjEhJTUrLy4vGB84ODMwNyotLisBCgoKDg0OGxAQGjAfICMxLzAuKy03NS4tLysrNzctKzgtLy01LS8rMCsrOCsrLSstLy0vLS03KzguLS0rLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAEAQAAIBAwIDBAcFBQYHAAAAAAABAgMEEQUSBiExE0FRYRQiMnGBkaEHUmKxwSNC0eHwM1RyotPiCBUWJzRksv/EABkBAQEBAQEBAAAAAAAAAAAAAAADAgQBBf/EACMRAQACAgICAgIDAAAAAAAAAAABAgMREiEEMSJhQVETgaH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeZzVODnN4SWWB6PM5KEd02kvF9CGutd/dtY/F/oiIr3E7iW6tJv8AL4LoStliPTcUlO3Wtwp+rQW5/KPzNvT7tXlv2i69JLwf8Cpm7pFaVK9Sp888pLy8fh1MVyzvt7NY0n9Tv4abZSuq/RdF3t9yXmyu6ZxtTq+pqMHB/ejmUfiuq+pA8Wa1/wA1vezoP9lDlH8T75fovL3kEc2Xy7Rf4eoXpgjj8nYra5hdUu1tpqUfFNNGU49a3VSzq9razlB+KePn4ryZaNM42nTxDUobl96OFL4x6P4YK4/MrPVuk7YJj12vIMFjdwv7WN1avMZdH9H9cmc7InaAAAAAAAAAAAAAAAAAAAAAAAAARfEVx2OmuK6yaj/H6J/MlCrcUXHaXioL91c/e/5Y+ZjJOqtVjco2hLMcPuMpqU5bZZNs5IVDU1m+9Cs/R6T/AGlRes++MPD3y/L3ma5uY2lF1qvRdF4vuX9d2SrV60ris61Z5lJ5b/ruJZcnGNR7Ux03O5eAAcboDFcVOzp5XXuMpH3VTfUwui5CB0P7Mb7tdNqWMnzpy3R/wy/3KT+JdDkfAl/6DxHBSfq1M038fZ/zJL4nXD6/i35Y9fpxZ66uAA6EQAAAAAAAAAAAAAAAAAAAAAKNdKVxdyq1OWW3h9V5fDoXki9W0z0hdtQ9vvX3v5kstZtHTVZ0rNO23zUFzbeEbuo2qs7nso9MRx8uf1TNvQbbfdurNex+f9ZM3ElL1oVV5p/mv1JRT4bb33pXO3djqCvakO0gotYWMwzj1lnr0xnwZC3N/CtcSqxt6aTbfWpn44ml8kWMjNQ0jt/2tkvW74fe/wAHn+Hv7vB8uSltdL0tH5RfpUP7vT+db/UHpUP7vT+db/UNXo8MHLylbTf0ugtR1mnQ2JKUlmMd2MLnLq2+iZparpKsb+drLKcW0vNdU/isMsfANt2usuu+kIP5vCX03G79oOn4cNRgvwT+ri/zXyLxi3h5/f8AifPWTioKt50ZqrRfNNOL701zTO22dZ3FpCtKLi5RjJxfJrKTw/NFU4T4Z2Yv9Sjz604Pu8JSXj4Lu9/S4nZ4mO1YmZ/KGe8WnUAAOtAAAAAAAAAAAAAAAAAAAAAAAAB5jFRbcV15vzNHXKfaae391p/p+TZIHivT7WjKm+9NHkxuNPY9qYll4RPaXpGzFa6XPuj4e/zM+maYrRdpU5z+i938SRJUx67lq1v0rfEvDEdRzdWeI1e/7s/f4S8/n5c/rUpUKrpVouMlyafVHZCI1/QaesUcy9WovZmvyl4oj5HjRb5V9qYs3HqfSL+z622adO5f78sL3RX8XItFWlGrHbVSaynhrKynlP4NJmnoNi9O0mna1MZS9bHTLbbx8Wb5fFTjSIlO9t2mQAFWAAAAAAAAAAAAAAAAAAAAAAAAETxJxFbcNWHpmqz2pvbFJNzm/CMV1f0I7hzjm01+/en041aNbG5Uq8Nk5LxjzafjjOccyG+02hUttYsOIOxlWo21Sbrxit0oqWzFTb+Ha3nxSNzReLbbifiSEdJspVVCLcrucFFUuT9WLlHdl5xhY9p9ybKcY47Y33pO6VxDR1TWLnS7dTU7ZwVVySUXu3Y2NN59l9cGpxNxna8OXELS5VSrWmswo0Yb6rXPnjKSXJ9Xzw8dGU7QuIbXQPtF1OGq1HB1qlCNLEKktzSnlZhF49qPXHUz6xerhH7S6uu6zSm7evRjCFaMXJUmtmYSx0ztz55WM88e8I3/AEculu4d4tteIrWpV09z3Uv7WlOO2tB8+Tj54a5Z5pohYfadbTuvRFZX/aY3OHo73pcvWcN2VHmufQ0eCXLXeP7rimzpTp20qSowc4uPbSzT/aJd+FBrP4l35S2LJf8Aequ//SX/AN0xxiJk3OoWeXENGPFC4dan2rpdunhbNuXHrnOcp8sHmw4koX+rXWmUYz32uztcpbXuTa2PPPo+uClcRafU1L7YIW9rcVLd+hJ9pTxu5VKnq81jD/QcA2s7Li/WLevVnVlGNunUnjdP1ary8cu/HwHCNb+jlO1mhx1aT4P/AOqVGr2GduNse09vs/Z3Y6+fQy3fGdpbaPbast86dzOFOlsSbUpKXKabWMbWn4NHMqKa/wCHfGHnevf/AOSjHxTpFbh68tdPt03Z1rmhc0er7KoltqU89ye7cvd5SZr+Ou9fcvJvMOq8UcXWvDOyF85yqVP7OlTjvqy9y5L5tZHC/F9rxM50rFzhUp47SlVjsqx82stfJvHeVPi6o+HftEhxJf05u3lbOgqsIb+wnlvc13LD+O+XgPs7vLzVeJ6l36RUuLRUtvbVLejQdSo3HGzbBSlFRTzl+GV0M8I47e8p3p0sAEmwAAAAAAAAAAAAAAAAAAAAAHQADC7mCuPR2/W64w+nPn7uT5+7xR8p3cKtXsot559zw8PDw2sPDPboxddVmvWScV7m03+SMdKzhSrdrHP72Fl4W55lheb/AJHvTzsV7T7J1FLlGKm+T9l7sP8Ayvl5GShWjXhvp+LXNNPKeGmmYY6fTjTnT54nHa+b5R9b1V4L1n8zLb28bal2VFYWW0u5Zbbx5ZfQdEb/AC+U7mFStKlDLceUuTwnhPGcYzhrl5niN7CVv26zjO32ZZznGEsZfPkeoWsY3TuVnc1jm3yXLkvkvr4sO1i6PZc8Zcurynu3ZT946edvMr6nGgqrbw217Ms5WcrbjPLD+R79Jg6saaeXJblhPGPHPRGKrp1Ktbej1o7o5beW+bect/N+7ljoZJW0ZXEa7zuiml7n1yOj5M4APGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
        alt="logo"
        width={90}
        height={30}
      />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center text-body-medium">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
}

export default LeftsideBar
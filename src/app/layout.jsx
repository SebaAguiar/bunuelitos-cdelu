import SideBar from '@/components/SideBar';
import './globals.css'
import ContextProvider from '@/context/AppContext';

export const metadata = {
  title: 'Buñuelitos CdelU',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-row w-screen h-screen overflow-hidden'>
        <ContextProvider>
          <section className='h-full w-1/6'>
            <SideBar />
          </section>
          <section className='h-full w-5/6'>
            {children}
          </section>
        </ContextProvider>
      </body>
    </html>
  )
}


import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Narativa - Digital Invitations & Creative Design',
  description: 'Undangan digital modern & elegan.',
   icons: {
    icon: '/assets/images/lg1.png', // favicon utama
    shortcut: '/assets/images/lg1.png', // fallback
    apple: '/assets/images/lg1.png', // untuk perangkat Apple
   },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        <Header />
        {children}
        <a href="https://wa.me/628174982969?text=Halo%20Narativa,%20saya%20tertarik%20dengan%20layanan%20undangan%20digital." className="wa-floating-button" target="_blank" aria-label="Contact us on WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
        <Footer />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}

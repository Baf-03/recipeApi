// src/app/layout.tsx
import "./globals.css"; // Use a relative path from layout.tsx
import ReduxProvider from "./providers/ReduxProvider";

export const metadata = {
  title: "Spoonacular Products",
  description: "Search Spoonacular Products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <ReduxProvider>
          <main className="container mx-auto p-6">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

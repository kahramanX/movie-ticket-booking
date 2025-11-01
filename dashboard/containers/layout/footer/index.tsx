"use client";

export const Footer = () => {
  return (
    <footer className="border-t bg-background shadow-sm mt-auto">
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Movie Ticket System X - {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

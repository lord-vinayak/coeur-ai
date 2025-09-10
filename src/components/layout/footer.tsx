import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Go to homepage">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <img
                  src="/co-log.png"
                  className="h-10 w-10 object-contain"
                  alt="Coeur AI Logo"
                />
              </div>
              <span className="text-xl font-bold">Coeur AI</span>
            </Link>
            <p className="text-muted-foreground">
              The future of proactive cardiac care.
            </p>
            <div className="flex gap-2">
              <p className="mt-1 text-muted-foreground">A product of</p>
              <span className="mt-1">LogicBoots</span>
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <img
                  src="/logo-s.jpg"
                  className="h-7 w-7 object-contain"
                  alt="LogicBoots Logo"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://logicboots.com"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LogicBoots Private Limited. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://www.linkedin.com/showcase/coeurai"
              aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

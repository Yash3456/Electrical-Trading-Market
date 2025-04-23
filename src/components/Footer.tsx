
import React from "react";
import { Zap, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-energy-green" />
              <span className="font-bold text-lg">EnergyChain</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A blockchain-based decentralized energy trading platform enabling 
              peer-to-peer transactions for a sustainable future.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EnergyChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

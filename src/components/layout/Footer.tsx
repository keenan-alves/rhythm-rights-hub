
import { Heart, Music } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container flex flex-col md:flex-row items-center justify-between py-8 gap-4">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <span className="font-display font-medium text-lg">RhythmRights</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/search" className="hover:text-primary transition-colors">Search Database</Link>
          <Link to="/login" className="hover:text-primary transition-colors">Contributor Portal</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <span>Made with</span>
          <Heart className="h-3 w-3 text-destructive fill-destructive" />
          <span>for Music Creators</span>
        </div>
      </div>
    </footer>
  );
};

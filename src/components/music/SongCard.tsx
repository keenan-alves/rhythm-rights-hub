
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Song } from "@/types/music";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  return (
    <Link to={`/songs/${song.id}`} className="block">
      <div className="music-card group hover:border-primary">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="song-title truncate">{song.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                {song.writers && song.writers.slice(0, 2).map((writer) => (
                  <Badge key={writer.id} variant="outline" className="tag-pill">
                    {writer.name}
                  </Badge>
                ))}
                {song.writers && song.writers.length > 2 && (
                  <Badge variant="outline" className="tag-pill">
                    +{song.writers.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
            <Button
              size="icon" 
              variant="ghost" 
              className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            <div className="code-text">
              ISWC: {song.iswc || "Pending"}
            </div>
            {song.publishers && song.publishers[0] && (
              <div className="truncate max-w-[150px]">
                {song.publishers[0].name}
              </div>
            )}
          </div>
        </div>
        
        {/* Visualization element */}
        <div className="h-1.5 bg-muted w-full">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${(song.splits?.length || 1) * 10}%`, maxWidth: '100%' }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

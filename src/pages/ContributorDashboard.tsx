
import { useState, useEffect } from "react";
import { Music, Bell, ExternalLink, AlertCircle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SongCard } from "@/components/music/SongCard";
import { DashboardSummary, Alert, Song } from "@/types/music";

// Mock data for demonstration
const MOCK_DASHBOARD: DashboardSummary = {
  total_songs: 12,
  recent_songs: [
    {
      id: "2",
      title: "Bohemian Rhapsody",
      iswc: "T-987654321-0",
      writers: [
        { id: "w2", name: "Freddie Mercury", type: "writer" }
      ],
      publishers: [
        { id: "p2", name: "Queen Music Ltd", type: "publisher" }
      ],
      splits: [
        { 
          id: "s3", 
          song_id: "2", 
          contributor: { id: "w2", name: "Freddie Mercury", type: "writer" }, 
          percentage: 70 
        },
        { 
          id: "s4", 
          song_id: "2", 
          contributor: { id: "p2", name: "Queen Music Ltd", type: "publisher" }, 
          percentage: 30 
        }
      ],
      audio_preview: "https://example.com/audio/bohemian_rhapsody.mp3"
    },
    {
      id: "3",
      title: "Yesterday",
      iswc: "T-456789123-0",
      writers: [
        { id: "w3", name: "Paul McCartney", type: "writer" },
        { id: "w4", name: "John Lennon", type: "writer" }
      ],
      publishers: [
        { id: "p3", name: "Sony/ATV Music Publishing", type: "publisher" }
      ],
      splits: [
        { 
          id: "s5", 
          song_id: "3", 
          contributor: { id: "w3", name: "Paul McCartney", type: "writer" }, 
          percentage: 50 
        },
        { 
          id: "s6", 
          song_id: "3", 
          contributor: { id: "w4", name: "John Lennon", type: "writer" }, 
          percentage: 20 
        },
        { 
          id: "s7", 
          song_id: "3", 
          contributor: { id: "p3", name: "Sony/ATV Music Publishing", type: "publisher" }, 
          percentage: 30 
        }
      ],
      audio_preview: "https://example.com/audio/yesterday.mp3"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "warning",
      message: "ISWC pending for 'New Song Title'",
      date: "2023-05-01",
      is_read: false,
      action_url: "/songs/5"
    },
    {
      id: "a2",
      type: "info",
      message: "Registration complete for 'Yesterday'",
      date: "2023-04-28",
      is_read: true,
      action_url: "/songs/3"
    }
  ]
};

// More mock data for all songs
const MOCK_ALL_SONGS: Song[] = [
  ...MOCK_DASHBOARD.recent_songs,
  {
    id: "4",
    title: "Shape of You",
    iswc: "T-135792468-0",
    writers: [
      { id: "w5", name: "Ed Sheeran", type: "writer" }
    ],
    publishers: [
      { id: "p4", name: "Warner Chappell Music", type: "publisher" }
    ],
    splits: [
      { 
        id: "s8", 
        song_id: "4", 
        contributor: { id: "w5", name: "Ed Sheeran", type: "writer" }, 
        percentage: 70 
      },
      { 
        id: "s10", 
        song_id: "4", 
        contributor: { id: "p4", name: "Warner Chappell Music", type: "publisher" }, 
        percentage: 30 
      }
    ]
  },
  {
    id: "5",
    title: "New Song Title",
    iswc: "Pending",
    writers: [
      { id: "w2", name: "Freddie Mercury", type: "writer" }
    ],
    publishers: [
      { id: "p2", name: "Queen Music Ltd", type: "publisher" }
    ],
    splits: [
      { 
        id: "s11", 
        song_id: "5", 
        contributor: { id: "w2", name: "Freddie Mercury", type: "writer" }, 
        percentage: 80 
      },
      { 
        id: "s12", 
        song_id: "5", 
        contributor: { id: "p2", name: "Queen Music Ltd", type: "publisher" }, 
        percentage: 20 
      }
    ]
  }
];

const ContributorDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Load dashboard data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      setDashboard(MOCK_DASHBOARD);
      setAllSongs(MOCK_ALL_SONGS);
      setIsLoading(false);
    }, 600);
  }, []);
  
  // Mark alert as read
  const handleMarkAsRead = (alertId: string) => {
    if (dashboard && dashboard.alerts) {
      const updatedAlerts = dashboard.alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      );
      
      setDashboard({
        ...dashboard,
        alerts: updatedAlerts
      });
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-40">
          <div className="flex items-end gap-1">
            <div className="w-1 h-5 bg-primary rounded-full animate-pulse"></div>
            <div className="w-1 h-8 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!dashboard) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <AlertCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-display text-2xl font-semibold mb-2">Dashboard Unavailable</h2>
          <p className="text-muted-foreground mb-6">
            We're having trouble loading your contributor dashboard.
          </p>
        </div>
      </MainLayout>
    );
  }
  
  const unreadAlertsCount = dashboard.alerts?.filter(alert => !alert.is_read).length || 0;
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Contributor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your music portfolio.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="songs">My Songs</TabsTrigger>
            <TabsTrigger value="alerts" className="relative">
              Alerts
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {unreadAlertsCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 py-4">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Songs</CardTitle>
                  <CardDescription>Your registered songs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboard.total_songs}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Alerts</CardTitle>
                  <CardDescription>Important notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboard.alerts?.length || 0}</div>
                  {unreadAlertsCount > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {unreadAlertsCount} unread
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Music className="h-4 w-4 mr-2" />
                    View Catalog
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Songs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold">Recent Songs</h2>
                <Button 
                  variant="link" 
                  className="text-primary" 
                  onClick={() => setActiveTab("songs")}
                >
                  View All Songs
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboard.recent_songs.map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
            
            {/* Latest Alerts */}
            {dashboard.alerts && dashboard.alerts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">Latest Alerts</h2>
                  <Button 
                    variant="link" 
                    className="text-primary" 
                    onClick={() => setActiveTab("alerts")}
                  >
                    View All Alerts
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {dashboard.alerts.slice(0, 3).map(alert => (
                    <div 
                      key={alert.id}
                      className={`bg-card border rounded-lg p-4 flex items-start justify-between gap-4 ${
                        !alert.is_read ? "border-primary/20 bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-full ${
                          alert.type === "warning" 
                            ? "bg-amber-100" 
                            : alert.type === "info"
                            ? "bg-blue-100"
                            : "bg-green-100"
                        }`}>
                          <AlertCircle className={`h-4 w-4 ${
                            alert.type === "warning"
                              ? "text-amber-600"
                              : alert.type === "info"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{alert.message}</p>
                            {!alert.is_read && (
                              <Badge variant="secondary" className="h-5 px-1">New</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(alert.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {alert.action_url && (
                          <a 
                            href={alert.action_url}
                            className="text-primary flex items-center gap-1 text-sm hover:underline"
                          >
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        
                        {!alert.is_read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="songs" className="space-y-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-semibold">All Songs</h2>
              <p className="text-sm text-muted-foreground">
                Total: {allSongs.length}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-semibold">All Alerts</h2>
              {unreadAlertsCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    if (dashboard && dashboard.alerts) {
                      const updatedAlerts = dashboard.alerts.map(alert => ({
                        ...alert,
                        is_read: true
                      }));
                      
                      setDashboard({
                        ...dashboard,
                        alerts: updatedAlerts
                      });
                    }
                  }}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            
            {dashboard.alerts && dashboard.alerts.length > 0 ? (
              <div className="space-y-3">
                {dashboard.alerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`bg-card border rounded-lg p-4 flex items-start justify-between gap-4 ${
                      !alert.is_read ? "border-primary/20 bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full ${
                        alert.type === "warning" 
                          ? "bg-amber-100" 
                          : alert.type === "info"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}>
                        <AlertCircle className={`h-4 w-4 ${
                          alert.type === "warning"
                            ? "text-amber-600"
                            : alert.type === "info"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{alert.message}</p>
                          {!alert.is_read && (
                            <Badge variant="secondary" className="h-5 px-1">New</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {alert.action_url && (
                        <a 
                          href={alert.action_url}
                          className="text-primary flex items-center gap-1 text-sm hover:underline"
                        >
                          <span>View</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      
                      {!alert.is_read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkAsRead(alert.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="font-medium text-lg">No alerts</h3>
                <p className="text-muted-foreground">
                  You don't have any alerts at the moment.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ContributorDashboard;

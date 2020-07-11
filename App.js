import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import { SearchBar, VideoList, VideoDetail } from "./components";

import youtube from "./api/youtube";


//<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
export default () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
   
    <Grid style={{ justifyContent: "left" }} container spacing={10}>
      <Grid item xs={12}>
        <Grid container spacing={10}>  
              
          <Grid item xs={6}>                
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
      
          <Grid item xs={8}>                 
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>             
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        
        </Grid>
      </Grid>
    </Grid>
    
  );

  async function handleSubmit(searchTerm) {
    
    const { data: { items: videos } } = await youtube.get("search", {
    
      params: {
      
        part: "snippet",
        maxResults: 5,
        key :  'AIzaSyDHwX_SUmYLH4lPinKJcA-xKu0VmSy7yA0',
        //process.env.REACT_APP_API_KEY,
        //'AIzaSyD_MegOkCmANsEe5VNqUFuS_Br-r2vrIc0',
        
        q: searchTerm,
        
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  
  }
}

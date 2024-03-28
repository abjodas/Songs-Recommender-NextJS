"use client"
import React, {useState, useEffect} from 'react'
import axios from "axios";
import qs from "qs";
const searchURL = "https://api.spotify.com/v1/recommendations?";

const SearchBar = ({ setMusicData }) => {
    const [input, setInput] = useState([]);
    const clientId = "98565778e8ff4598a267ac7625519753";
    const clientSecret = "51d31b0cb30246b198be97cb46277992";
    const [accessToken, setAccessToken] = useState([]);
    const [suggestionData, setSuggestionData] = useState([]);
    const [suggestionsShow, setSuggestionsShow] = useState(false);
  
    const searchUrl = "https://api.spotify.com/v1/search";
  
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}
        `,
      },
    };
  
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };
    const data = {
      grant_type: "client_credentials",
    };
  
    useEffect(() => {
      async function fetchData() {
        if (accessToken.length == 0) {
          axios
            .post(
              "https://accounts.spotify.com/api/token",
              qs.stringify(data),
              headers
            )
            .then((res) => {
              console.log(res.data.access_token);
              setAccessToken(res.data.access_token);
              setToken(res.data.access_token);
            })
            .catch((err) => console.log(err));
        }
  
        /*  axios
          .get(
            "https://api.spotify.com/v1/recommendations?limit=10&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK",
            config
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err)); */
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      function searchData() {
        const inputCleaned = input?.replace(/\s/g, "+");
        console.log(inputCleaned);
        axios
          .get(`${searchUrl}?q=${inputCleaned}&type=track&market=US&limit=5`, config)
          .then((res) => setSuggestionData(res.data.tracks.items))
          .catch((err) => console.log(err));
      }
      if (input.length != 0) {
        searchData();
      }
    }, [input]);

    const searchTrack = async (result) => {
        setSuggestionsShow(false);
        console.log(result.artists[0].id);
        setInput(`${result.name} - ${result.artists[0].name}`)
          axios
            .get(`${searchURL}limit=100&market=US&seed_tracks=${result.id}`, config)
            .then((res) => {
              setMusicData(res.data.tracks);
            })
            .catch((err) => console.log(err));
        
      };


  return (
    <form className="mt-8 w-[500px] relative" onSubmit={e => { e.preventDefault(); }}>
        <div className="relative">
            <input type="search" placeholder="search" 
            className="w-full p-4 rounded-full text-white bg-slate-800"
            value={input}
            onKeyDown={(e) => { 
                if (e.key === "Enter") { 
                    searchTrack(suggestionData[0])
                
                } 
            }} 
            onChange={(e) => {
                if (e.target.value.length > 0) {
                    setSuggestionsShow(true);
                  } else {
                    setSuggestionsShow(false);
                  }
              setInput(e.target.value);
            }}
             />
        </div>
        {suggestionData.length !==0 && suggestionsShow && 
        <div className="bg-slate-800 text-white rounded-md w-full p-8 mt-1 mb-5 flex-col flex">
            {suggestionData.map(suggestion => (
                <span className='hover:cursor-pointer' onClick={() => {searchTrack(suggestion)}} key={suggestion.id}>{suggestion.name} - {suggestion.artists[0].name}</span>
            ))}
        </div> 
        }
        
    </form>
  )
}

export default SearchBar